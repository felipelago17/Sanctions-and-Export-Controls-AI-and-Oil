#!/usr/bin/env python3
"""
regwatch.py — Monthly enforcement case scanner for BIS, DOJ-NSD, SEC, and allied sources.

Scans for new enforcement actions, extracts penalties and VSD credit patterns,
updates docs/enforcements/enforcement-tracking.json, and writes a monthly digest.

Usage:
    python scripts/regwatch.py

Dependencies: pip install requests beautifulsoup4 lxml feedparser
"""

import datetime
import json
import os
import re
import sys

import feedparser
import requests
from bs4 import BeautifulSoup

TODAY = datetime.date.today()
MONTH_LABEL = TODAY.strftime("%Y-%m")
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; enforcement-scanner/1.0; "
        "+https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil)"
    )
}

# ── Keyword lists ───────────────────────────────────────────────────────────

ENFORCEMENT_KEYWORDS = [
    "high probability awareness",
    "knowledge standard",
    "de minimis",
    "substantial transformation",
    "entity-shifting",
    "entity shifting",
    "catch-all provision",
    "general prohibition 10",
    "inchoate provisions",
    "charging letter",
    "voluntary self-disclosure",
    " vsd ",
    "civil penalty",
    "denial order",
    "temporary denial order",
    " tdo ",
    "export violation",
    "unlicensed export",
    "willful violation",
    "willfully",
    "aiding and abetting",
    "evasion",
    "transshipment",
    "shell company",
    "end-user certificate",
    "false statement",
    "settlement agreement",
    "deferred prosecution",
    "plea agreement",
    "is informed",
    "knew or should have known",
    "reason to know",
    "red flag",
    "15 cfr",
    "50 u.s.c.",
    "ecra",
    "ear violation",
    "ofac enforcement",
    "bis enforcement",
]

ENERGY_AI_INTEREST = [
    "semiconductor",
    "ccus",
    " ai ",
    "artificial intelligence",
    "compute",
    "data center",
    " gpu",
    " chip",
    " lng",
    "nuclear",
    "rare earth",
    "gallium",
    "germanium",
    "graphite",
    "model weight",
    "accelerator",
    "h100",
    "a100",
    "h800",
    "nvidia",
    "huawei",
    " smic",
    "advanced computing",
    "wafer fabrication",
    "eda software",
    "lithography",
    "asml",
    "3a090",
    "4a090",
    "entity list",
    "military end user",
    "meu list",
]


def relevant(text):
    t = text.lower()
    return (
        any(kw in t for kw in ENFORCEMENT_KEYWORDS)
        or any(kw in t for kw in ENERGY_AI_INTEREST)
    )


# ── Penalty and VSD extraction ──────────────────────────────────────────────

_PENALTY_RE = re.compile(
    r"\$\s*([\d,]+(?:\.\d+)?)\s*(million|billion|thousand)?",
    re.IGNORECASE,
)
_VSD_RE = re.compile(r"voluntary\s+self.?disclosur", re.IGNORECASE)
_RESPONDENT_RE = re.compile(
    r"(?:against|charges?|penalizes?|settles? with|pleads? guilty)\s+([A-Z][^,\.]{3,60})",
    re.IGNORECASE,
)


def extract_penalty(text):
    best = 0
    for m in _PENALTY_RE.finditer(text):
        amount = float(m.group(1).replace(",", ""))
        mult = (m.group(2) or "").lower()
        if mult == "billion":
            amount *= 1_000_000_000
        elif mult == "million":
            amount *= 1_000_000
        elif mult == "thousand":
            amount *= 1_000
        best = max(best, int(amount))
    return best if best > 0 else None


def has_vsd(text):
    return bool(_VSD_RE.search(text))


def infer_category(title, url, source):
    t = (title + " " + url).lower()
    if "charging" in t or "charge" in t:
        return "charging-letter"
    if "settlement" in t or "civil penalty" in t or "settles" in t:
        return "settlement"
    if source in ("DOJ-NSD",) or "indictment" in t or "plea" in t or "convicted" in t:
        return "criminal-enforcement"
    if source == "SEC":
        return "sec-litigation"
    if source in ("Senate PSI", "Senate Commerce"):
        return "legislative"
    return "commentary"


# ── HTTP helper ─────────────────────────────────────────────────────────────

def safe_get(url, timeout=20):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"  WARNING: {url} → {e}", file=sys.stderr)
        return ""


# ── Source scrapers ─────────────────────────────────────────────────────────

def scrape_bis_enforcement():
    items = []
    for path, cat in [
        ("/enforcement/charging-letters", "charging-letter"),
        ("/enforcement/settlements", "settlement"),
        ("/enforcement/denial-orders", "denial-order"),
    ]:
        html = safe_get(f"https://www.bis.gov{path}")
        if not html:
            continue
        soup = BeautifulSoup(html, "lxml")
        for a in soup.find_all("a", href=True):
            title = a.get_text(strip=True)
            href = a["href"]
            if title and len(title) > 12 and relevant(title):
                url = href if href.startswith("http") else f"https://www.bis.gov{href}"
                items.append({
                    "title": title, "url": url,
                    "source": "BIS", "category": cat,
                    "penalty_usd": extract_penalty(title),
                    "vsd": has_vsd(title),
                })
    return items


def scrape_doj_enforcement():
    items = []
    html = safe_get("https://www.justice.gov/nsd/export-control-and-sanctions")
    if html:
        soup = BeautifulSoup(html, "lxml")
        for a in soup.find_all("a", href=True):
            href = a["href"]
            title = a.get_text(strip=True)
            if len(title) > 15 and ("press-release" in href or "news" in href):
                if relevant(title):
                    url = href if href.startswith("http") else f"https://www.justice.gov{href}"
                    items.append({
                        "title": title, "url": url,
                        "source": "DOJ-NSD",
                        "category": infer_category(title, url, "DOJ-NSD"),
                        "penalty_usd": extract_penalty(title),
                        "vsd": has_vsd(title),
                    })
    return items[:25]


def scrape_sec_enforcement():
    """SEC litigation releases — proxy for knowledge/scienter doctrine evolution."""
    items = []
    feed = feedparser.parse("https://www.sec.gov/rss/litigation/litreleases.xml")
    cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=35)
    for entry in feed.entries[:40]:
        title = entry.get("title", "").strip()
        url = entry.get("link", "").strip()
        summary = entry.get("summary", "") or ""
        pub = entry.get("published_parsed") or entry.get("updated_parsed")
        if pub:
            try:
                if datetime.datetime(*pub[:6]) < cutoff:
                    continue
            except Exception:
                pass
        if title and url and relevant(title + " " + summary):
            items.append({
                "title": title, "url": url,
                "source": "SEC", "category": "sec-litigation",
                "penalty_usd": extract_penalty(summary),
                "vsd": has_vsd(summary),
                "notes": "Monitor for knowledge/scienter standard — analogous to BIS high-probability standard",
            })
    return items[:10]


def scrape_rss_sources():
    RSS_SOURCES = [
        ("WorldECR",            "https://www.worldecr.com/feed/"),
        ("Trade Compliance Corner", "https://tradecompliancecorner.com/feed/"),
        ("Steptoe Int'l",       "https://www.steptoeinternationallawblog.com/feed/"),
        ("Gibson Dunn",         "https://www.gibsondunn.com/feed/"),
        ("White & Case",        "https://www.whitecase.com/insights/rss/trade"),
        ("Paul Hastings",       "https://www.paulhastings.com/insights/client-alerts/rss"),
        ("Cleary Gottlieb",     "https://www.clearygottlieb.com/rss/"),
        ("WilmerHale",          "https://www.wilmerhale.com/en/insights/rss"),
        ("Covington",           "https://www.cov.com/en/news-and-insights/rss"),
        ("Baker McKenzie",      "https://sanctionsnews.bakermckenzie.com/feed/"),
        ("Akin Gump",           "https://www.akingump.com/en/insights/rss"),
    ]
    items = []
    cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=35)
    for label, feed_url in RSS_SOURCES:
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:30]:
                title = entry.get("title", "").strip()
                url = entry.get("link", "").strip()
                summary = entry.get("summary", "") or ""
                pub = entry.get("published_parsed") or entry.get("updated_parsed")
                if pub:
                    try:
                        if datetime.datetime(*pub[:6]) < cutoff:
                            continue
                    except Exception:
                        pass
                if title and url and relevant(title + " " + summary):
                    items.append({
                        "title": title, "url": url,
                        "source": label, "category": "commentary",
                        "penalty_usd": extract_penalty(summary),
                        "vsd": has_vsd(summary),
                    })
        except Exception as e:
            print(f"  RSS error [{label}]: {e}", file=sys.stderr)
    return items


def scrape_congressional():
    """PSI reports and Commerce Committee — flags board-level legislative risk."""
    items = []
    sources = [
        ("Senate PSI",      "https://www.hsgac.senate.gov/subcommittees/investigations/"),
        ("Senate Commerce", "https://www.commerce.senate.gov/news"),
    ]
    for label, url in sources:
        html = safe_get(url)
        if not html:
            continue
        soup = BeautifulSoup(html, "lxml")
        for a in soup.find_all("a", href=True):
            title = a.get_text(strip=True)
            href = a["href"]
            if title and len(title) > 20 and relevant(title):
                full = href if href.startswith("http") else f"https://www.senate.gov{href}"
                items.append({
                    "title": title, "url": full,
                    "source": label, "category": "legislative",
                    "penalty_usd": None, "vsd": False,
                    "notes": "Board-level reporting trigger: PSI scrutiny or Commerce Committee action",
                })
    return items[:15]


# ── enforcement-tracking.json update ───────────────────────────────────────

def update_tracking_json(new_items, tracking_path):
    try:
        with open(tracking_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = {"_meta": {}, "_schema": {}, "cases": []}

    existing_urls = {c.get("url", "") for c in data.get("cases", [])}
    added = 0
    for item in new_items:
        url = item.get("url", "")
        if not url or url in existing_urls:
            continue
        data["cases"].append({
            "case_id": f"auto-{TODAY.isoformat()}-{added:04d}",
            "date_ingested": TODAY.isoformat(),
            "source": item.get("source"),
            "category": item.get("category"),
            "title": item.get("title"),
            "url": url,
            "penalty_usd": item.get("penalty_usd"),
            "vsd": item.get("vsd", False),
            # Fields for manual completion after review:
            "regulator": item.get("source") if item.get("source") in ("BIS", "DOJ-NSD", "OFAC") else None,
            "respondent": None,
            "controlled_items": None,
            "destination": None,
            "charges": [],
            "knowledge_standard": None,
            "resolution": item.get("category") if item.get("category") in (
                "charging-letter", "settlement", "criminal-enforcement", "denial-order"
            ) else None,
            "notes": item.get("notes", "Auto-ingested — requires manual review and categorisation"),
        })
        existing_urls.add(url)
        added += 1

    data["_meta"]["last_updated"] = TODAY.isoformat()
    data["_meta"]["total_ingested"] = len(data["cases"])
    data["_meta"]["auto_ingested"] = sum(
        1 for c in data["cases"] if "Auto-ingested" in (c.get("notes") or "")
    )

    with open(tracking_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return added


# ── Monthly digest ──────────────────────────────────────────────────────────

def write_monthly_digest(all_items, out_path):
    by_cat = {}
    for item in all_items:
        by_cat.setdefault(item.get("category", "other"), []).append(item)

    vsd_count = sum(1 for i in all_items if i.get("vsd"))
    penalty_vals = [i["penalty_usd"] for i in all_items if i.get("penalty_usd")]
    max_penalty = max(penalty_vals, default=0)
    total_penalties = sum(penalty_vals)

    lines = [
        f"# Enforcement Digest — {TODAY.strftime('%B %Y')}\n",
        f"*Auto-generated by `regwatch.py` on {TODAY.isoformat()}. Requires manual review before reliance.*\n",
        "---\n",
        "## Summary Statistics\n",
        f"| Metric | Value |",
        f"|---|---|",
        f"| Items collected | {len(all_items)} |",
        f"| Items mentioning VSD | {vsd_count} |",
        f"| Highest penalty referenced | ${max_penalty:,} |",
        f"| Total penalties mentioned | ${total_penalties:,} |",
        f"| Sources scanned | BIS, DOJ-NSD, SEC, WorldECR, law firm RSS, Congressional |",
        "\n---\n",
    ]

    CAT_LABELS = {
        "charging-letter":      "BIS Charging Letters",
        "settlement":           "Settlements & Civil Penalties",
        "criminal-enforcement": "DOJ Criminal Enforcement",
        "denial-order":         "Denial Orders",
        "sec-litigation":       "SEC Litigation (Knowledge Doctrine Proxy)",
        "commentary":           "Law Firm & Expert Commentary",
        "legislative":          "Congressional / Legislative (Board-Level Flag)",
        "other":                "Other",
    }

    for cat, label in CAT_LABELS.items():
        items = by_cat.get(cat, [])
        if not items:
            continue
        lines.append(f"## {label}\n")
        for item in items:
            penalty_str = f" — **${item['penalty_usd']:,}**" if item.get("penalty_usd") else ""
            vsd_str = " *(VSD credit mentioned)*" if item.get("vsd") else ""
            note = f" — *{item['notes']}*" if item.get("notes") and cat in ("sec-litigation", "legislative") else ""
            lines.append(f"- **[{item['source']}]** [{item['title']}]({item['url']}){penalty_str}{vsd_str}{note}")
        lines.append("")

    lines += [
        "---\n",
        "## Review Checklist\n",
        "- [ ] Scan charging letters for high-probability knowledge language",
        "- [ ] Extract penalties and note VSD credit pattern",
        "- [ ] Map cases to energy/AI sector risk profile",
        "- [ ] Update `enforcement-tracking.json` — complete manual fields for each auto-ingested case",
        "- [ ] Flag legislative items for board-level reporting if PSI scrutiny applies",
        "\n---\n",
        "*Informational only; not legal advice. Compiled from publicly available sources.*",
    ]

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"Monthly digest written: {out_path}")


# ── Main ────────────────────────────────────────────────────────────────────

def main():
    print(f"regwatch.py — enforcement scan for {MONTH_LABEL}", flush=True)

    all_items = []

    print("Scanning BIS enforcement (charging letters, settlements, denial orders)...")
    all_items.extend(scrape_bis_enforcement())

    print("Scanning DOJ NSD press releases...")
    all_items.extend(scrape_doj_enforcement())

    print("Scanning SEC litigation releases (knowledge doctrine proxy)...")
    all_items.extend(scrape_sec_enforcement())

    print("Scanning RSS sources (WorldECR, law firms)...")
    all_items.extend(scrape_rss_sources())

    print("Scanning Congressional sources (PSI, Commerce Committee)...")
    all_items.extend(scrape_congressional())

    # Deduplicate by URL
    seen, deduped = set(), []
    for item in all_items:
        url = item.get("url", "")
        if url and url not in seen:
            seen.add(url)
            deduped.append(item)
    all_items = deduped

    print(f"Total unique items: {len(all_items)}")

    # Update enforcement-tracking.json
    tracking_path = os.path.join(
        REPO_ROOT, "docs", "enforcements", "enforcement-tracking.json"
    )
    added = update_tracking_json(all_items, tracking_path)
    print(f"Added {added} new entries to enforcement-tracking.json")

    # Write monthly digest
    digest_dir = os.path.join(REPO_ROOT, "docs", "enforcements", "monthly-digests")
    os.makedirs(digest_dir, exist_ok=True)
    digest_path = os.path.join(digest_dir, f"digest-{MONTH_LABEL}.md")
    write_monthly_digest(all_items, digest_path)

    print("Done.")


if __name__ == "__main__":
    main()
