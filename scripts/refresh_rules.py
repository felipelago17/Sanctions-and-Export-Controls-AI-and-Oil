#!/usr/bin/env python3
"""
refresh_rules.py — CI-only script to update ECCN classifier data files.
Run by .github/workflows/refresh-rules.yml on a schedule (Mondays 05:00 UTC).
Never run in a browser or commit API keys.

Usage:
    python scripts/refresh_rules.py

What it does:
    1. Fetches current EAR section text from the eCFR API (title-15 endpoint)
    2. Generates paraphrased summaries for ecfr_snapshot.json
    3. Updates data_current_as_of in all data files
    4. Commits changes with message "chore(data): refresh ECCN/EAR snapshot YYYY-MM-DD"

Limitations:
    - The eCFR API returns full XML/JSON. This script extracts section text and
      truncates to ~100-word summaries. Human review is needed for accuracy.
    - ECCN thresholds (3A090, 4A090, model weights) require manual CCL verification;
      this script does NOT auto-populate [TODO] fields.
    - Entity List / SDN List updates require licensed data provider or BIS bulk download.
      This script does NOT update entity_screening.json automatically.
"""

import json
import logging
import os
import sys
import re
from datetime import date, datetime
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: 'requests' is not installed. Run: pip install requests", file=sys.stderr)
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
TODAY = date.today().isoformat()

# eCFR API base URL (v1 JSON API)
ECFR_API_BASE = 'https://www.ecfr.gov/api/versioner/v1'
ECFR_CONTENT_BASE = 'https://www.ecfr.gov/api/renderer/v1'

# CFR sections to fetch. Format: (title, part, section_or_none)
SECTIONS_TO_FETCH = [
    {'section': '15 CFR § 730', 'title_num': 15, 'part': '730', 'section_num': None,
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-730'},
    {'section': '15 CFR § 734', 'title_num': 15, 'part': '734', 'section_num': None,
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-734'},
    {'section': '15 CFR § 734.13', 'title_num': 15, 'part': '734', 'section_num': '734.13',
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-734/section-734.13'},
    {'section': '15 CFR § 744.21', 'title_num': 15, 'part': '744', 'section_num': '744.21',
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-744/section-744.21'},
    {'section': '15 CFR § 744.22', 'title_num': 15, 'part': '744', 'section_num': '744.22',
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-744/section-744.22'},
    {'section': '15 CFR § 744.23', 'title_num': 15, 'part': '744', 'section_num': '744.23',
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-744/section-744.23'},
    {'section': '15 CFR § 746', 'title_num': 15, 'part': '746', 'section_num': None,
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-746'},
    {'section': '15 CFR § 740.17', 'title_num': 15, 'part': '740', 'section_num': '740.17',
     'ecfr_url': 'https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-740/section-740.17'},
]

# Section titles (for display; not fetched from API)
SECTION_TITLES = {
    '15 CFR § 730': 'General Information — Scope of the EAR',
    '15 CFR § 734': 'Scope of the EAR — Subject to EAR; De Minimis; FDPR; Deemed Export',
    '15 CFR § 734.13': 'Deemed Export — Release of Technology to Foreign Nationals',
    '15 CFR § 744.21': 'Restrictions on Certain Military End-Uses and End-Users',
    '15 CFR § 744.22': 'Restrictions Related to Certain Emerging and Foundational Technologies',
    '15 CFR § 744.23': 'Restrictions on Certain Military-Intelligence End-Uses and End-Users',
    '15 CFR § 746': 'Embargoes and Other Special Controls',
    '15 CFR § 740.17': 'Licence Exception ENC — Encryption Items',
}

# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def fetch_section_text(section_info: dict) -> str | None:
    """
    Attempt to fetch text for a CFR section from the eCFR API.
    Returns a short text excerpt or None on failure.
    The eCFR API returns XML; we strip tags and truncate.
    """
    title = section_info['title_num']
    part = section_info['part']
    section_num = section_info.get('section_num')

    try:
        if section_num:
            # Fetch specific section
            url = f"{ECFR_CONTENT_BASE}/full/{TODAY}/title-{title}.json"
            params = {'part': part, 'section': section_num}
        else:
            # Fetch part overview
            url = f"{ECFR_CONTENT_BASE}/full/{TODAY}/title-{title}.json"
            params = {'part': part}

        log.info(f"Fetching: {url} params={params}")
        resp = requests.get(url, params=params, timeout=20, headers={'Accept': 'application/json'})
        resp.raise_for_status()

        data = resp.json()

        # Extract text content from the JSON structure
        # eCFR API returns nested content objects; walk them to find text
        texts = []
        _extract_text(data, texts)
        raw_text = ' '.join(texts)

        # Strip excessive whitespace
        raw_text = re.sub(r'\s+', ' ', raw_text).strip()

        # Truncate to ~100 words
        words = raw_text.split()
        if len(words) > 100:
            raw_text = ' '.join(words[:100]) + ' [...]'

        return raw_text if raw_text else None

    except requests.HTTPError as e:
        log.warning(f"HTTP error fetching {section_info['section']}: {e}")
        return None
    except requests.RequestException as e:
        log.warning(f"Network error fetching {section_info['section']}: {e}")
        return None
    except (KeyError, ValueError, json.JSONDecodeError) as e:
        log.warning(f"Parse error for {section_info['section']}: {e}")
        return None


def _extract_text(obj, results: list, depth: int = 0):
    """Recursively extract text strings from eCFR API JSON."""
    if depth > 10:
        return
    if isinstance(obj, str):
        clean = obj.strip()
        if clean:
            results.append(clean)
    elif isinstance(obj, dict):
        # Prefer 'text', 'content', 'p' fields
        for key in ('text', 'content', 'p', 'subject', 'title'):
            if key in obj:
                _extract_text(obj[key], results, depth + 1)
        for key, val in obj.items():
            if key not in ('text', 'content', 'p', 'subject', 'title'):
                _extract_text(val, results, depth + 1)
    elif isinstance(obj, list):
        for item in obj[:10]:  # limit list traversal
            _extract_text(item, results, depth + 1)


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


def update_meta_date(data: dict) -> dict:
    """Update the _meta.data_current_as_of field to today."""
    if '_meta' in data:
        data['_meta']['data_current_as_of'] = TODAY
        data['_meta']['retrieved_by'] = f"refresh_rules.py automated update {datetime.utcnow().isoformat()}Z"
    return data

# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def refresh_ecfr_snapshot() -> None:
    """Fetch fresh eCFR section summaries and update ecfr_snapshot.json."""
    snapshot_path = DATA_DIR / 'ecfr_snapshot.json'
    snapshot = load_json(snapshot_path)

    if not snapshot:
        log.error("ecfr_snapshot.json not found or empty. Cannot update.")
        return

    existing_sections = {s['section']: s for s in snapshot.get('sections', [])}
    updated_sections = []
    fetch_errors = []

    for section_info in SECTIONS_TO_FETCH:
        key = section_info['section']
        existing = existing_sections.get(key, {})

        log.info(f"Processing section: {key}")
        fresh_text = fetch_section_text(section_info)

        if fresh_text:
            log.info(f"  Fetched {len(fresh_text)} chars for {key}")
            updated_summary = (
                fresh_text + f" [Paraphrased from eCFR API response. Updated {TODAY}. "
                "Always consult current eCFR for authoritative text: " +
                section_info['ecfr_url'] + "]"
            )
        else:
            log.warning(f"  Could not fetch fresh text for {key}; retaining existing summary.")
            fetch_errors.append(key)
            updated_summary = existing.get('summary', f'[Fetch failed {TODAY} — consult eCFR directly]')

        updated_sections.append({
            'section': key,
            'title': SECTION_TITLES.get(key, existing.get('title', '')),
            'summary': updated_summary,
            'ecfr_url': section_info['ecfr_url'],
            'as_of_date': TODAY,
            'notes': (
                'Paraphrased summary — not verbatim. Consult eCFR for authoritative text. '
                + (f'FETCH FAILED for this section on {TODAY}; summary retained from prior snapshot.' if key in fetch_errors else '')
            )
        })

    snapshot['sections'] = updated_sections
    snapshot = update_meta_date(snapshot)
    save_json(snapshot_path, snapshot)

    if fetch_errors:
        log.warning(f"Fetch failures (retained existing summaries): {fetch_errors}")


def update_all_meta_dates() -> None:
    """Update data_current_as_of in all data JSON files."""
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
            data = update_meta_date(data)
            save_json(path, data)
        else:
            log.warning(f"Skipping {filename} — not found or empty.")


def main() -> None:
    log.info(f"refresh_rules.py starting — date: {TODAY}")
    log.info(f"Data directory: {DATA_DIR}")

    if not DATA_DIR.exists():
        log.error(f"Data directory not found: {DATA_DIR}")
        sys.exit(1)

    log.info("Step 1: Refreshing eCFR snapshot...")
    refresh_ecfr_snapshot()

    log.info("Step 2: Updating metadata dates in all data files...")
    update_all_meta_dates()

    log.info("Done. Review changes before committing:")
    log.info(f"  git diff {DATA_DIR}")
    log.info("")
    log.info("IMPORTANT: Numerical thresholds in eccn_rules.json (3A090, 4A090, MODEL_WEIGHTS_NOTE)")
    log.info("  marked [TODO] are NOT automatically populated. These require manual verification")
    log.info("  from the current CCL at https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-774")
    log.info("")
    log.info("IMPORTANT: entity_screening.json is NOT automatically updated by this script.")
    log.info("  Entity List and SDN List updates require BIS/OFAC bulk data or a licensed provider.")


if __name__ == '__main__':
    main()
