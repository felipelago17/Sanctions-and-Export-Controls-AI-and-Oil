import datetime, os, re, sys
import requests

TODAY = datetime.date.today()

# Only run on Monday (or workflow_dispatch)
if TODAY.weekday() != 0 and os.environ.get("GITHUB_EVENT_NAME") != "workflow_dispatch":
    print("Not Monday - weekly synthesis skipped.")
    sys.exit(0)

REPO          = "felipelago17/Sanctions-and-Export-Controls-AI-and-Oil"
ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
SLACK_WEBHOOK = os.environ.get("SLACK_WEBHOOK_URL", "")
SNAP_BACK     = datetime.date(2026, 11, 10)
DAYS_TO_PHASE2 = (SNAP_BACK - TODAY).days

if not ANTHROPIC_KEY:
    print("ANTHROPIC_API_KEY not set - weekly synthesis skipped.")
    sys.exit(0)

# ── Extract last 7 days of digest entries ────────────────────────────
cutoff = TODAY - datetime.timedelta(days=7)
digest_excerpt = ""
try:
    with open("news/digest.md", encoding="utf-8") as f:
        content = f.read()
    m = re.search(r"<!-- DIGEST_START -->(.*?)<!-- DIGEST_END -->", content, re.DOTALL)
    body = m.group(1) if m else ""
    lines_out = []
    include = False
    for line in body.splitlines():
        date_m = re.match(r"^## (\d{4}-\d{2}-\d{2})", line)
        if date_m:
            try:
                entry_date = datetime.date.fromisoformat(date_m.group(1))
                include = entry_date >= cutoff
            except ValueError:
                include = False
        if include:
            lines_out.append(line)
    digest_excerpt = "\n".join(lines_out).strip()
except FileNotFoundError:
    pass

if not digest_excerpt:
    digest_excerpt = "(No entries logged in the last 7 days.)"

# ── Weekly synthesis prompt ───────────────────────────────────────────
SYNTHESIS_PROMPT = (
    "ROLE\n"
    f'You are an export-controls analyst maintaining "{REPO}". Today is {TODAY}.\n'
    "Synthesise, do not re-monitor.\n"
    "\n"
    "INPUT\n"
    "The records the daily job logged in the last 7 days (do NOT fetch or scan new\n"
    "sources - work only from existing repository entries):\n"
    "\n"
    f"{digest_excerpt}\n"
    "\n"
    "TASK\n"
    "1. Cluster the week's logged items into 2-4 themes (e.g., snapback trajectory,\n"
    "   Entity List/SDN ownership chains, BIS-OFAC divergence, diligence/red-flag guidance).\n"
    "2. State the net change for the week: did the probability, timing, or scope of the\n"
    "   10 Nov 2026 Phase 2 reimposition move? In which direction, and on what evidence?\n"
    "3. Surface contradictions or unresolved items carried over from daily 'open questions'.\n"
    "4. Flag staleness: any priority topic with zero entries in 7 days that warrants a\n"
    "   manual check.\n"
    "\n"
    f"Snap-back countdown: Days to Phase 2 (10 Nov 2026): {DAYS_TO_PHASE2} - status: suspended\n"
    "\n"
    "OUTPUT\n"
    "- A <=150-word weekly brief (prose, leadership-ready).\n"
    "- 'Watch next week': up to 3 bullets, each a concrete trigger to monitor.\n"
    "- If the week had no logged items: 'No logged developments this week - monitor live.'\n"
    "\n"
    "CONSTRAINTS\n"
    "- No verbatim quoting beyond 15 words; paraphrase.\n"
    "- Do not introduce facts absent from the logged entries.\n"
    "- Suspension holds until 9 Nov 2026 unless an entry says otherwise.\n"
)

import anthropic
client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)
try:
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        messages=[{"role": "user", "content": SYNTHESIS_PROMPT}],
    )
    synthesis = msg.content[0].text.strip()
    print(f"  Weekly synthesis complete ({len(synthesis)} chars).")
except Exception as e:
    print(f"  Anthropic API error: {e}", file=sys.stderr)
    sys.exit(0)

# ── Append synthesis block to digest ─────────────────────────────────
block = (
    f"## Week of {TODAY} - BIS Affiliates Rule Weekly Brief *(auto)*\n\n"
    f"{synthesis}\n"
)

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
        print(f"  Weekly brief written: {path}")
    except FileNotFoundError:
        print(f"  WARNING: {path} not found", file=sys.stderr)

# ── Post synthesis to Slack ───────────────────────────────────────────
if SLACK_WEBHOOK:
    payload = {"text": f"*BIS Affiliates Rule - Weekly Brief ({TODAY})*\n{synthesis}"}
    try:
        r = requests.post(SLACK_WEBHOOK, json=payload, timeout=15)
        r.raise_for_status()
        print("  Slack weekly brief sent.")
    except Exception as e:
        print(f"  WARNING: Slack post failed: {e}", file=sys.stderr)

print("Weekly synthesis done.")
