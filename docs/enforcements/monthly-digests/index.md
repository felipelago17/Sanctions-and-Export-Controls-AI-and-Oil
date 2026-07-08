# Monthly Enforcement Digests

*Auto-generated monthly summaries of BIS, DOJ-NSD, and OFAC enforcement actions, filtered for AI/computing and energy-sector relevance.*

---

## How this works

The [`regwatch.py`](https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil/blob/main/scripts/regwatch.py) scanner runs on the 1st of each month (08:00 UTC) via GitHub Actions. It:

1. Scrapes official enforcement pages (BIS charging letters, settlements, denial orders; DOJ-NSD press releases; SEC litigation releases)
2. Pulls RSS feeds from trade compliance law firms (Steptoe, Gibson Dunn, White & Case, Paul Hastings, Cleary Gottlieb, WilmerHale, Covington, Baker McKenzie, Akin Gump)
3. Checks Congressional oversight sources (Senate PSI, Senate Commerce)
4. Filters results against two keyword lists: enforcement doctrine terms and AI/energy/semiconductor topic terms
5. Deduplicates against `enforcement-tracking.json` and writes the monthly digest

---

## Digest Index

| Period | File | Generated |
|---|---|---|
| *No digests yet — scanner runs on the 1st of each month* | — | — |

---

## Keyword Coverage

**Enforcement doctrine terms** (triggers ingestion): `high probability awareness`, `knowledge standard`, `de minimis`, `substantial transformation`, `entity-shifting`, `catch-all provision`, `General Prohibition 10`, `inchoate provisions`, `charging letter`, `VSD`, `civil penalty`, `denial order`, `TDO`, `willfully`, `aiding and abetting`, `evasion`, `red flag`, `15 CFR`, `50 U.S.C.`, `ECRA`, and others.

**AI / energy / semiconductor terms** (boosts priority): `semiconductor`, `AI`, `GPU`, `chip`, `compute`, `data center`, `LNG`, `nuclear`, `rare earth`, `gallium`, `germanium`, `H100`, `A100`, `H800`, `NVIDIA`, `Huawei`, `SMIC`, `ASML`, `3A090`, `4A090`, `Entity List`, `military end user`, and others.

---

## Methodology

See [Enforcement Ingestion Workflow](../enforcement-ingestion-workflow.md) for full methodology, source list, and update cadence.

---

*Informational only; not legal advice. Digest entries are derived from public enforcement releases and law firm commentary.*
