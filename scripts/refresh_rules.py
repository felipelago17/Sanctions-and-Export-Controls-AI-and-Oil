#!/usr/bin/env python3
"""
refresh_rules.py — CI-only script to update ECCN classifier data files.
Run by .github/workflows/refresh-rules.yml on a schedule (Mondays 05:00 UTC).
Never run in a browser or commit API keys.

Usage:
    python scripts/refresh_rules.py

What it does:
    1. Fetches the latest Title 15 issue date from eCFR GET /titles.json
    2. Fetches Part 774 (CCL) full XML via GET /full/{date}/title-15.xml?part=774
       (parsed with lxml — the versioner API serves XML, not JSON, for full text)
    3. Fetches citation structure via GET /structure/{date}/title-15.json
    4. Updates ecfr_snapshot.json with fresh section summaries
    5. Updates data_current_as_of in all data files (using issue date, not script run date)
    6. Runs regwatch check for Federal Register notices on model-weight replacement rule
       (4E091 was rescinded 13 May 2025; watch for replacement framework)

Security:
    - No API keys or credentials required or used — all APIs are public
    - No secrets committed
    - No network calls from the browser (this script runs server-side in CI only)

Limitations:
    - Numerical thresholds in eccn_rules.json (3A090, 4A090) are populated from the
      Oct 2022 BIS rulemaking and are stable. Any CCL amendments require manual review.
    - The 4E091 ECCN was rescinded 13 May 2025 and is marked as a rescission marker.
      A replacement AI model control framework may be issued — regwatch covers this.
    - entity_screening.json synthetic MEU/SDN entries are NOT updated automatically.
      Entity List / SDN List updates require licensed data provider or BIS bulk download.
"""

import json
import logging
import sys
import re
from datetime import date, datetime, timedelta
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: 'requests' not installed. Run: pip install requests lxml", file=sys.stderr)
    sys.exit(1)

try:
    import lxml.etree as ET
except ImportError:
    print("ERROR: 'lxml' not installed. Run: pip install requests lxml", file=sys.stderr)
    sys.exit(1)

# ─────────────────────────────────────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
log = logging.getLogger(__name__)

REPO_ROOT = Path(__file__).parent.parent.resolve()
DATA_DIR = REPO_ROOT / 'docs' / 'tools' / 'eccn-classifier' / 'data'

# eCFR versioner API base — XML for full text, JSON for structure
ECFR_BASE = 'https://www.ecfr.gov/api/versioner/v1'

# Federal Register API — public, no key required
FR_API_BASE = 'https://www.federalregister.gov/api/v1'

# CFR sections to summarise in ecfr_snapshot.json
SECTIONS_TO_FETCH = [
    {'section': '15 CFR § 730',    'title_num': 15, 'part': '730', 'section_num': None},
    {'section': '15 CFR § 734',    'title_num': 15, 'part': '734', 'section_num': None},
    {'section': '15 CFR § 734.13', 'title_num': 15, 'part': '734', 'section_num': '734.13'},
    {'section': '15 CFR § 744.21', 'title_num': 15, 'part': '744', 'section_num': '744.21'},
    {'section': '15 CFR § 744.22', 'title_num': 15, 'part': '744', 'section_num': '744.22'},
    {'section': '15 CFR § 744.23', 'title_num': 15, 'part': '744', 'section_num': '744.23'},
    {'section': '15 CFR § 746',    'title_num': 15, 'part': '746', 'section_num': None},
    {'section': '15 CFR § 740.17', 'title_num': 15, 'part': '740', 'section_num': '740.17'},
    {'section': '15 CFR § 774',    'title_num': 15, 'part': '774', 'section_num': None},
]

SECTION_TITLES = {
    '15 CFR § 730':    'General Information — Scope of the EAR',
    '15 CFR § 734':    'Scope of the EAR — Subject to EAR; De Minimis; FDPR; Deemed Export',
    '15 CFR § 734.13': 'Deemed Export — Release of Technology to Foreign Nationals',
    '15 CFR § 744.21': 'Restrictions on Certain Military End-Uses and End-Users',
    '15 CFR § 744.22': 'Restrictions Related to Certain Emerging and Foundational Technologies',
    '15 CFR § 744.23': 'Restrictions on Certain Military-Intelligence End-Uses and End-Users',
    '15 CFR § 746':    'Embargoes and Other Special Controls',
    '15 CFR § 740.17': 'Licence Exception ENC — Encryption Items',
    '15 CFR § 774':    'Commerce Control List (CCL) — Part 774 Supplement No. 1',
}

# ─────────────────────────────────────────────────────────────────────────────
# eCFR API helpers
# ─────────────────────────────────────────────────────────────────────────────

def get_title15_issue_date() -> str:
    """
    Fetch the latest issue date for Title 15 from GET /titles.json.
    Returns an ISO date string (YYYY-MM-DD), or today's date as fallback.
    Citation: https://www.ecfr.gov/api/versioner/v1/titles.json
    """
    url = f"{ECFR_BASE}/titles.json"
    log.info(f"Fetching title metadata: {url}")
    try:
        resp = requests.get(url, timeout=20)
        resp.raise_for_status()
        data = resp.json()
        for title in data.get('titles', []):
            if title.get('number') == 15:
                issue_date = title.get('latest_issue_date') or title.get('up_to_date_as_of')
                if issue_date:
                    log.info(f"Title 15 latest issue date: {issue_date}")
                    return issue_date
    except Exception as e:
        log.warning(f"Could not fetch title metadata: {e}")
    fallback = date.today().isoformat()
    log.warning(f"Using today as fallback date: {fallback}")
    return fallback


def fetch_part_xml(issue_date: str, title: int, part: str) -> ET._Element | None:
    """
    Fetch full part XML via GET /full/{date}/title-{title}.xml?part={part}.
    The eCFR versioner API serves XML (not JSON) for full part text.
    Parses with lxml and asserts a non-None root tag before returning.
    """
    url = f"{ECFR_BASE}/full/{issue_date}/title-{title}.xml"
    params = {'part': part}
    log.info(f"Fetching XML: {url} part={part}")
    try:
        resp = requests.get(url, params=params, timeout=60)
        resp.raise_for_status()
        root = ET.fromstring(resp.content)
        assert root.tag is not None, f"Unexpected null XML root tag for part {part}"
        log.info(f"  Parsed XML root: {root.tag}, children: {len(list(root))}")
        return root
    except requests.HTTPError as e:
        log.warning(f"HTTP error fetching part {part} XML: {e}")
    except requests.RequestException as e:
        log.warning(f"Network error fetching part {part} XML: {e}")
    except ET.XMLSyntaxError as e:
        log.warning(f"XML parse error for part {part}: {e}")
    except AssertionError as e:
        log.warning(str(e))
    return None


def fetch_structure(issue_date: str, title: int) -> dict:
    """
    Fetch title structure JSON via GET /structure/{date}/title-{title}.json.
    Returns the parsed JSON dict, or {} on failure.
    Useful for extracting section citations and anchors.
    """
    url = f"{ECFR_BASE}/structure/{issue_date}/title-{title}.json"
    log.info(f"Fetching structure: {url}")
    try:
        resp = requests.get(url, timeout=30)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        log.warning(f"Could not fetch structure for title {title}: {e}")
        return {}


def extract_text_from_xml(root: ET._Element, section_num: str | None, max_words: int = 100) -> str | None:
    """
    Extract text from a parsed eCFR XML tree.
    If section_num is given (e.g. '734.13'), attempts to find that section element.
    Strips XML tags and truncates to max_words.
    """
    if root is None:
        return None

    target = root

    if section_num:
        # eCFR XML uses identifiers like "section-734-13" or numeric refs
        # Try common patterns
        dot_free = section_num.replace('.', '-')
        patterns = [
            f'section-{dot_free}',
            f'sec-{dot_free}',
            section_num,
        ]
        for pat in patterns:
            found = root.find(f'.//*[@identifier="{pat}"]')
            if found is None:
                # XPath with numeric section identifier attribute
                found = root.find(f'.//*[@N="{section_num}"]')
            if found is not None:
                target = found
                break

    # Collect all text nodes, stripping tags
    texts = []
    for elem in target.iter():
        if elem.text and elem.text.strip():
            texts.append(elem.text.strip())
        if elem.tail and elem.tail.strip():
            texts.append(elem.tail.strip())

    raw = ' '.join(texts)
    raw = re.sub(r'\s+', ' ', raw).strip()

    if not raw:
        return None

    words = raw.split()
    if len(words) > max_words:
        raw = ' '.join(words[:max_words]) + ' [...]'

    return raw


# ─────────────────────────────────────────────────────────────────────────────
# Regwatch — Federal Register monitor for model-weight replacement rule
# ─────────────────────────────────────────────────────────────────────────────

REGWATCH_TERMS = [
    '4E091',
    'model weight export control',
    'AI model weight',
    'artificial intelligence diffusion',
    'AI diffusion rule',
]

REGWATCH_AGENCIES = ['bureau-of-industry-and-security']

REGWATCH_DOC_TYPES = ['Rule', 'Proposed Rule', 'Notice']


def check_regwatch(lookback_days: int = 90) -> list[dict]:
    """
    Search the Federal Register API for recent BIS notices mentioning
    AI model weight / 4E091 replacement framework terms.
    Returns a list of matching document summaries.
    No API key required — Federal Register API is public.
    """
    since = (date.today() - timedelta(days=lookback_days)).isoformat()
    hits = []

    for term in REGWATCH_TERMS:
        url = f"{FR_API_BASE}/documents.json"
        params = {
            'conditions[term]': term,
            'conditions[agencies][]': REGWATCH_AGENCIES[0],
            'conditions[publication_date][gte]': since,
            'conditions[type][]': REGWATCH_DOC_TYPES,
            'fields[]': ['title', 'document_number', 'publication_date', 'html_url', 'abstract', 'type'],
            'per_page': 5,
            'order': 'newest',
        }
        log.info(f"Regwatch: searching FR API for '{term}' since {since}")
        try:
            resp = requests.get(url, params=params, timeout=20)
            resp.raise_for_status()
            data = resp.json()
            results = data.get('results', [])
            for doc in results:
                entry = {
                    'term_matched': term,
                    'title': doc.get('title', ''),
                    'document_number': doc.get('document_number', ''),
                    'type': doc.get('type', ''),
                    'publication_date': doc.get('publication_date', ''),
                    'html_url': doc.get('html_url', ''),
                    'abstract': (doc.get('abstract') or '')[:300],
                }
                # Deduplicate by document number
                if not any(h['document_number'] == entry['document_number'] for h in hits):
                    hits.append(entry)
                    log.info(f"  Regwatch hit: [{doc.get('publication_date')}] {doc.get('title', '')}")
        except requests.HTTPError as e:
            log.warning(f"FR API HTTP error for term '{term}': {e}")
        except Exception as e:
            log.warning(f"FR API error for term '{term}': {e}")

    if not hits:
        log.info("Regwatch: no new Federal Register notices found for model-weight replacement terms.")

    return hits


# ─────────────────────────────────────────────────────────────────────────────
# File I/O
# ─────────────────────────────────────────────────────────────────────────────

def load_json(path: Path) -> dict:
    """Load a JSON file, returning {} on error."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        log.warning(f"Could not load {path}: {e}")
        return {}


def save_json(path: Path, data: dict) -> None:
    """Save a dict to a JSON file with 2-space indent."""
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')
    log.info(f"Saved: {path}")


def update_meta_date(data: dict, issue_date: str) -> dict:
    """Update the _meta.data_current_as_of field to the eCFR issue date."""
    if '_meta' in data:
        data['_meta']['data_current_as_of'] = issue_date
        data['_meta']['retrieved_by'] = (
            f"refresh_rules.py automated update {datetime.utcnow().isoformat()}Z "
            f"(eCFR Title 15 issue date: {issue_date})"
        )
    return data


# ─────────────────────────────────────────────────────────────────────────────
# Main refresh routines
# ─────────────────────────────────────────────────────────────────────────────

def refresh_ecfr_snapshot(issue_date: str) -> None:
    """
    Fetch fresh eCFR section summaries from Part XML and update ecfr_snapshot.json.
    Uses GET /full/{date}/title-15.xml?part=NNN (lxml parsing).
    """
    snapshot_path = DATA_DIR / 'ecfr_snapshot.json'
    snapshot = load_json(snapshot_path)

    if not snapshot:
        log.warning("ecfr_snapshot.json not found or empty — creating skeleton.")
        snapshot = {
            '_meta': {
                'source': 'eCFR versioner API v1',
                'citation': 'https://www.ecfr.gov/api/versioner/v1',
                'data_current_as_of': issue_date,
                'notes': 'Auto-generated by refresh_rules.py'
            },
            'sections': []
        }

    existing_sections = {s['section']: s for s in snapshot.get('sections', [])}

    # Pre-fetch XML for the parts we need (avoid re-fetching same part)
    parts_needed = {str(s['part']) for s in SECTIONS_TO_FETCH}
    xml_cache: dict[str, ET._Element | None] = {}
    for part in parts_needed:
        xml_cache[part] = fetch_part_xml(issue_date, 15, part)

    updated_sections = []
    fetch_errors = []

    for section_info in SECTIONS_TO_FETCH:
        key = section_info['section']
        existing = existing_sections.get(key, {})
        part = str(section_info['part'])
        section_num = section_info.get('section_num')

        xml_root = xml_cache.get(part)
        fresh_text = extract_text_from_xml(xml_root, section_num) if xml_root is not None else None

        if fresh_text:
            log.info(f"  {key}: extracted {len(fresh_text)} chars from XML")
            ecfr_url = f"https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-{part}"
            if section_num:
                ecfr_url += f"/section-{section_num.replace('.', '-')}"
            updated_summary = (
                fresh_text +
                f" [Extracted from eCFR XML (title-15, part-{part}). Updated {issue_date}. "
                f"Authoritative text: {ecfr_url}]"
            )
        else:
            log.warning(f"  {key}: XML extraction failed; retaining existing summary.")
            fetch_errors.append(key)
            updated_summary = existing.get(
                'summary',
                f'[XML extraction failed {issue_date} — consult eCFR directly: '
                f'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-{part}]'
            )

        ecfr_url = f"https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-{part}"
        if section_num:
            ecfr_url += f"/section-{section_num.replace('.', '-')}"

        updated_sections.append({
            'section': key,
            'title': SECTION_TITLES.get(key, existing.get('title', '')),
            'summary': updated_summary,
            'ecfr_url': ecfr_url,
            'as_of_date': issue_date,
            'notes': (
                'Extracted from eCFR versioner API XML (lxml). Not verbatim — '
                'consult eCFR for authoritative text. '
                + (f'XML EXTRACTION FAILED for this section on {issue_date}; '
                   'summary retained from prior snapshot.' if key in fetch_errors else '')
            )
        })

    snapshot['sections'] = updated_sections
    snapshot = update_meta_date(snapshot, issue_date)
    save_json(snapshot_path, snapshot)

    if fetch_errors:
        log.warning(f"Sections with extraction failures (retained prior): {fetch_errors}")


def refresh_structure_citations(issue_date: str) -> None:
    """
    Fetch Title 15 structure JSON and log available part/section citations.
    This is informational — used to verify structure and update anchor references.
    """
    log.info("Fetching Title 15 structure for citation verification...")
    structure = fetch_structure(issue_date, 15)
    if structure:
        children = structure.get('children', [])
        log.info(f"Title 15 structure: {len(children)} top-level children")
        # Log subtitle C (EAR) parts for reference
        for child in children:
            if 'C' in (child.get('identifier') or ''):
                log.info(f"  Subtitle C: {child.get('label', child.get('identifier', ''))}")
    else:
        log.warning("Structure fetch failed — citations not verified.")


def update_all_meta_dates(issue_date: str) -> None:
    """Update data_current_as_of in all data JSON files using the eCFR issue date."""
    data_files = [
        'eccn_rules.json',
        'country_controls.json',
        'entity_screening.json',
        'policy_frameworks.json',
    ]
    for filename in data_files:
        path = DATA_DIR / filename
        data = load_json(path)
        if data:
            data = update_meta_date(data, issue_date)
            save_json(path, data)
        else:
            log.warning(f"Skipping {filename} — not found or empty.")


def run_regwatch(snapshot: dict, issue_date: str) -> dict:
    """
    Run Federal Register regwatch for model-weight replacement rule.
    Writes results into the snapshot under 'regwatch'.
    """
    log.info("Running regwatch for model-weight control replacement rule...")
    hits = check_regwatch(lookback_days=90)

    snapshot['regwatch'] = {
        'as_of_date': issue_date,
        'watch_terms': REGWATCH_TERMS,
        'watch_rationale': (
            '4E091 (AI Diffusion Rule IFR, 90 FR 4544) was rescinded 13 May 2025 before '
            'its compliance date. A replacement AI model export control framework may be issued. '
            'This regwatch monitors BIS Federal Register notices for replacement-rule activity.'
        ),
        'hit_count': len(hits),
        'hits': hits,
        'note': (
            'No hits means no matching BIS notices in the lookback window — '
            'not a guarantee that no replacement rule exists. '
            'Monitor https://www.federalregister.gov/agencies/industry-and-security-bureau for BIS rulemaking.'
        )
    }

    if hits:
        log.warning(
            f"REGWATCH: {len(hits)} Federal Register notice(s) found matching model-weight "
            "replacement terms. Review regwatch.hits in ecfr_snapshot.json and update "
            "eccn_rules.json 4E091 entry if a replacement rule has been issued."
        )
    else:
        log.info("Regwatch: no hits — no replacement rule notices found in lookback window.")

    return snapshot


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main() -> None:
    log.info("refresh_rules.py starting")
    log.info(f"Data directory: {DATA_DIR}")

    if not DATA_DIR.exists():
        log.error(f"Data directory not found: {DATA_DIR}")
        sys.exit(1)

    # Step 1: Get eCFR Title 15 latest issue date (drives data_current_as_of)
    log.info("Step 1: Fetching eCFR Title 15 latest issue date...")
    issue_date = get_title15_issue_date()
    log.info(f"Using issue date: {issue_date}")

    # Step 2: Refresh ecfr_snapshot.json from XML
    log.info("Step 2: Refreshing eCFR snapshot from Part XML (lxml)...")
    refresh_ecfr_snapshot(issue_date)

    # Step 3: Verify structure citations
    log.info("Step 3: Verifying Title 15 structure citations...")
    refresh_structure_citations(issue_date)

    # Step 4: Update metadata dates in all data files
    log.info("Step 4: Updating metadata dates in all data files...")
    update_all_meta_dates(issue_date)

    # Step 5: Regwatch — check Federal Register for model-weight replacement rule
    log.info("Step 5: Running regwatch for model-weight replacement rule...")
    snapshot_path = DATA_DIR / 'ecfr_snapshot.json'
    snapshot = load_json(snapshot_path)
    if snapshot:
        snapshot = run_regwatch(snapshot, issue_date)
        save_json(snapshot_path, snapshot)
    else:
        log.warning("ecfr_snapshot.json not available for regwatch update.")

    log.info("Done.")
    log.info("")
    log.info("Review changes before committing:")
    log.info(f"  git diff {DATA_DIR}")
    log.info("")
    log.info("IMPORTANT: 3A090/4A090 thresholds in eccn_rules.json are populated from the Oct 2022")
    log.info("  BIS rulemaking. Any subsequent CCL amendments require manual review and update.")
    log.info("")
    log.info("IMPORTANT: 4E091 is marked rescinded (13 May 2025). If regwatch hit a replacement")
    log.info("  rule notice, review ecfr_snapshot.json regwatch.hits and update 4E091 entry")
    log.info("  in eccn_rules.json accordingly. Seek export counsel before updating thresholds.")
    log.info("")
    log.info("IMPORTANT: entity_screening.json synthetic MEU/SDN entries are NOT updated")
    log.info("  automatically. Entity List / SDN List updates require BIS/OFAC bulk data")
    log.info("  or a licensed screening provider.")


if __name__ == '__main__':
    main()
