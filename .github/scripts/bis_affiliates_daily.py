import datetime, json, os, re, sys
import requests

REPO       = "felipelago17/Sanctions-and-Export-Controls-AI-and-Oil"
TODAY      = datetime.date.today()
IS_MON     = TODAY.weekday() == 0
LOOKBACK_H = 72 if IS_MON else 30
SNAP_BACK  = datetime.date(2026, 11, 10)
DAYS_TO_PHASE2 = (SNAP_BACK - TODAY).days

ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
SLACK_WEBHOOK = os.environ.get("SLACK_WEBHOOK_URL", "")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; bis-affiliates-bot/1.0; "
        "+https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil)"
    )
}


def safe_get(url, timeout=20):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"  WARNING: {url} -> {e}", file=sys.stderr)
        return ""


# ── 1. Fetch Federal Register — BIS + OFAC documents ─────────────────
fr_url = (
    "https://www.federalregister.gov/api/v1/documents.json"
    "?fields[]=title&fields[]=html_url&fields[]=publication_date&fields[]=abstract"
    "&order=newest&per_page=20"
    "&agencies[]=bureau-of-industry-and-security"
    "&agencies[]=office-of-foreign-assets-control"
)
fr_items = []
try:
    data = requests.get(fr_url, headers=HEADERS, timeout=20).json()
    for doc in data.get("results", []):
        title    = doc.get("title", "")
        url      = doc.get("html_url", "")
        pub      = doc.get("publication_date", "")
        abstract = (doc.get("abstract", "") or "")
        if title and url:
            fr_items.append(
                f"[Federal Register / {pub}] {title}\n  URL: {url}\n  Abstract: {abstract[:300]}"
            )
except Exception as e:
    print(f"  FR API error: {e}", file=sys.stderr)

# ── 2. Build de-dup URL set from existing digest ──────────────────────
existing_urls: set[str] = set()
for path in ("news/digest.md", "docs/news/digest.md"):
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                for m in re.finditer(r'https?://[^\s\)\"]+', line):
                    existing_urls.add(m.group(0).rstrip(".,)"))
    except FileNotFoundError:
        pass

sources_block = "\n\n".join(fr_items) if fr_items else "(No Federal Register items retrieved)"

# ── 3. Build monitoring prompt ────────────────────────────────────────
url_set_json = json.dumps(sorted(existing_urls)[:200])
MONITOR_PROMPT = (
    "ROLE\n"
    "You are an export-controls and sanctions monitoring analyst maintaining the\n"
    f'"{REPO}" repository. Today is {TODAY}. Produce a precise, citable daily update.\n'
    "\n"
    "TASK\n"
    f"1. Scan the following sources published or materially updated in the last {LOOKBACK_H}h:\n"
    "\n"
    f"{sources_block}\n"
    "\n"
    "   Priority topics, in order:\n"
    "     a. BIS Affiliates Rule / '50 Percent Rule' (EAR §744.8, §744.21; IFR 90 FR 47201;\n"
    "        suspension FR 2025-19846). Track ANY movement toward or away from the\n"
    "        10 Nov 2026 Phase 2 reimposition: extensions, early designations, FAQs,\n"
    "        advisory opinions, enforcement actions, or Federal Register notices.\n"
    "     b. Entity List / MEU List / SDN additions, removals, modifications relevant to\n"
    "        listed-party ownership chains.\n"
    "     c. OFAC 50% Rule developments and any divergence/convergence with the BIS rule.\n"
    "     d. Advanced-computing / IC controls, beneficial-ownership and front-company\n"
    "        red-flag guidance (BIS/FinCEN joint alerts).\n"
    "\n"
    "2. De-duplicate against existing repository entries. Treat an item as new only if\n"
    "   its URL is NOT in this set:\n"
    f"   {url_set_json}\n"
    "\n"
    "3. For each genuinely new item output a record in this exact schema:\n"
    "   - date_detected: (ISO 8601)\n"
    "   - source: (firm/agency)\n"
    "   - title:\n"
    "   - url:\n"
    "   - rule_or_authority: (e.g., 'EAR §744.21 / Affiliates Rule')\n"
    "   - summary: (<=3 sentences, your own words, no verbatim quoting beyond 15 words)\n"
    "   - so_what: (1 sentence: operational/compliance implication)\n"
    "   - snapback_relevance: ('high' | 'medium' | 'low')\n"
    "   - confidence: ('primary-source' | 'law-firm-analysis' | 'secondary')\n"
    "\n"
    "4. Maintain this snap-back countdown line (include it in all three output sections):\n"
    f'   "Days to Phase 2 (10 Nov 2026): {DAYS_TO_PHASE2} - status: suspended"\n'
    "\n"
    "OUTPUT - use these exact section markers:\n"
    "=== SECTION A ===\n"
    "Markdown table of new records, newest first, ready to prepend to the digest.\n"
    "If no new items: output exactly one line: *No new Affiliates Rule developments detected.*\n"
    "=== SECTION B ===\n"
    "Slack-ready digest - one bullet per record prefixed R/O/G. Lead with any 'high' item.\n"
    "Include the snap-back countdown line at the top.\n"
    f'If nothing new: "No material developments in {REPO} in the last {LOOKBACK_H}h."\n'
    "=== SECTION C ===\n"
    "Open questions or items needing human review. If none: '(none)'\n"
    "\n"
    "CONSTRAINTS\n"
    "- Cite primary sources over secondary where both exist.\n"
    "- Never reproduce more than 15 words verbatim from any source.\n"
    "- Do not infer the rule is in force during the suspension window; it is suspended\n"
    "  until 9 Nov 2026. Flag, do not assume.\n"
    "- Flag low-confidence/unverified reports rather than logging them as fact.\n"
)

section_a = section_b = section_c = ""

if ANTHROPIC_KEY:
    import anthropic
    client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
    try:
        msg = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{"role": "user", "content": MONITOR_PROMPT}],
        )
        response_text = msg.content[0].text

        def extract_section(text, tag):
            m = re.search(rf"=== {tag} ===\n(.*?)(?:=== \w+ ===|$)", text, re.DOTALL)
            return m.group(1).strip() if m else ""

        section_a = extract_section(response_text, "SECTION A")
        section_b = extract_section(response_text, "SECTION B")
        section_c = extract_section(response_text, "SECTION C")
        print(f"  Claude analysis complete. Section A chars: {len(section_a)}")
    except Exception as e:
        print(f"  Anthropic API error: {e}", file=sys.stderr)
        section_a = "*Anthropic API error - raw Federal Register items logged below.*\n"
        section_b = (
            f"Monitor error on {TODAY}. "
            f"Days to Phase 2 (10 Nov 2026): {DAYS_TO_PHASE2} - status: suspended"
        )
else:
    print("  ANTHROPIC_API_KEY not set - skipping AI analysis; logging raw FR items.")
    if fr_items:
        section_a = (
            f"*ANTHROPIC_API_KEY not configured - raw items listed for manual review.*\n\n"
            f"Days to Phase 2 (10 Nov 2026): {DAYS_TO_PHASE2} - status: suspended\n\n"
            + "\n".join(f"- {item.splitlines()[0]}" for item in fr_items)
        )
    else:
        section_a = (
            f"*No new Affiliates Rule developments detected.*\n\n"
            f"Days to Phase 2 (10 Nov 2026): {DAYS_TO_PHASE2} - status: suspended"
        )
    section_b = (
        f"Days to Phase 2 (10 Nov 2026): {DAYS_TO_PHASE2} - status: suspended\n"
        "(AI analysis disabled - ANTHROPIC_API_KEY not set)"
    )

# ── 4. Prepend Section A to both digest files ─────────────────────────
block = f"## {TODAY} - BIS Affiliates Rule Monitor *(auto)*\n\n{section_a}\n"
if section_c and section_c.lower() not in ("(none)", "none"):
    block += f"\n**Open questions:** {section_c}\n"

for path in ("news/digest.md", "docs/news/digest.md"):
    try:
        with open(path, encoding="utf-8") as f:
            content = f.read()
        m = re.search(r"<!-- DIGEST_START -->(.*?)<!-- DIGEST_END -->", content, re.DOTALL)
        existing_body = m.group(1).strip() if m else ""
        combined = block + "\n\n---\n\n" + existing_body
        lines = combined.splitlines()
        if len(lines) > 3000:
            lines = lines[:3000]
        new_content = re.sub(
            r"<!-- DIGEST_START -->.*?<!-- DIGEST_END -->",
            f"<!-- DIGEST_START -->\n{chr(10).join(lines)}\n<!-- DIGEST_END -->",
            content,
            flags=re.DOTALL,
        )
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  Digest updated: {path}")
    except FileNotFoundError:
        print(f"  WARNING: {path} not found", file=sys.stderr)

# ── 5. Post Section B to Slack ────────────────────────────────────────
if SLACK_WEBHOOK and section_b:
    payload = {"text": f"*BIS Affiliates Rule Monitor - {TODAY}*\n{section_b}"}
    try:
        r = requests.post(SLACK_WEBHOOK, json=payload, timeout=15)
        r.raise_for_status()
        print("  Slack notification sent.")
    except Exception as e:
        print(f"  WARNING: Slack post failed: {e}", file=sys.stderr)
elif not SLACK_WEBHOOK:
    print("  SLACK_WEBHOOK_URL not set - skipping Slack notification.")

print("Daily monitor done.")
