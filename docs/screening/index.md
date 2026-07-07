# Screening Methodology — Sanctions & Export Controls

> Risk-based screening and due diligence methodology for counterparties, end-users, and technology transfers in AI and energy contexts. Written to combine automated list screening with structured parallel research, on the premise that tool output is a starting point, not a conclusion.

**Status:** Reference methodology · **Scope:** Third parties, vendors, customers, JV partners, and technology/end-use assessments · **Regimes covered:** US (OFAC/BIS EAR), EU, UK (OFSI), UN, and UAE (EOCN / Law 4/2022 and related instruments)

---

## 1. Purpose & Scope

This methodology defines how a subject (entity or individual) and, where relevant, a technology transaction, are screened and assessed for sanctions and export-control risk. It applies to:

- New counterparties, vendors, customers, and intermediaries (onboarding)
- Joint-venture partners and their controllers / ultimate beneficial owners (UBOs)
- Procurement of controlled or sensitive technology (e.g. advanced compute, dual-use items)
- Periodic re-screening of the existing book

It deliberately separates two activities that are often conflated: **list screening** (is the subject on, or owned/controlled by someone on, a restricted list?) and **risk assessment** (what is the residual risk once matches, ownership, end-use, and context are understood?).

---

## 2. Principles

1. **Risk-based, not checkbox.** Depth of work scales with the tiered risk rating (Section 4), not applied uniformly.
2. **Tools inform, humans decide.** Automated screening (e.g. Exiger, Dow Jones, WorldCheck) sets the floor. A negative hit is not a clearance; a hit is not a conclusion.
3. **Ownership and control over name-matching.** The subject on the paperwork is rarely where the risk sits. Follow ownership and control chains.
4. **Extraterritorial reach is assumed, then tested.** US nexus (US-origin items, USD clearing, US persons, US-origin technology/software) is presumed possible and evidenced or excluded, not ignored.
5. **Contemporaneous documentation.** Every disposition is evidenced and reproducible by a third party (auditor, regulator) from the file alone.

---

## 3. Reference Lists & Sources

Screen against, at minimum, the consolidated position of:

| Regime | Primary instruments |
|---|---|
| US — OFAC | SDN List; Consolidated Sanctions List; Sectoral (SSI); 50 Percent Rule guidance |
| US — BIS | Entity List; Denied Persons List; Unverified List; Military End User (MEU) List; EAR §744 end-use/end-user controls; Affiliates Rule (50% aggregation) |
| US — DoD | Section 1260H (Chinese military companies) |
| EU | Consolidated financial sanctions list; dual-use Reg. (EU) 2021/821 |
| UK | OFSI consolidated list; UK Sanctions List; export control (SPIRE) |
| UN | UN Security Council Consolidated List |
| UAE | EOCN Local Terrorist List / UN-implementation lists; Federal Decree-Law and Cabinet decisions on TFS; NAMLCFTC guidance |

Also maintain: adverse-media and PEP data feeds; corporate registries (UAE onshore/free-zone, and the subject's home jurisdiction); and beneficial-ownership sources.

!!! note "List currency"
    Lists change without notice. Record the *date and version/source* of each list consulted so a screen can be reconstructed as at the screening date.

---

## 4. Risk Tiering

Assign a preliminary tier from the subject's jurisdiction, sector, ownership opacity, and transaction type. The tier sets the required depth.

| Tier | Triggers (examples) | Required work |
|---|---|---|
| **Low** | Domestic, transparent ownership, non-sensitive goods/services, no sanctions-nexus jurisdiction | Automated screening + UBO confirmation |
| **Medium** | Cross-border, moderate ownership complexity, adjacent to controlled sectors | Above + parallel research (Section 7) + adverse-media review |
| **Medium-High / High** | Sanctions-nexus or high-risk jurisdiction; controlled/dual-use technology; state-owned or politically connected controllers; opaque or nominee ownership; historical ties to sanctioned entities or programmes | Full EDD: ownership chain to UBO, source-of-wealth where relevant, end-use/end-user analysis, escalation |

---

## 5. Name & Entity Screening

1. **Normalise inputs.** Legal name, all trading names, transliteration variants, prior names, and known aliases. Capture registration number and jurisdiction — names alone are unreliable across transliterated scripts.
2. **Fuzzy + phonetic matching.** Do not rely on exact match. Account for transliteration (Arabic, Cyrillic, Chinese romanisation), word order, honorifics, and abbreviations.
3. **Score and adjudicate hits.** For each hit, record: matched list, match strength, and the discriminating identifiers used to confirm or dismiss (DOB, registration number, address, nationality). A dismissed hit needs a stated *reason*, not just a status.
4. **Escalate true and near-true matches** per Section 10 before any dismissal is finalised.

---

## 6. Ownership, Control & the 50% Problem

Name screening the subject is insufficient. Restriction flows through ownership and control.

- **OFAC 50 Percent Rule.** An entity owned 50%+, directly or indirectly, individually or *in the aggregate*, by one or more blocked persons is itself blocked, even if not separately listed. Sum indirect interests through the chain. See [OFAC UBO & 50% Rule](../regulations/ofac-ubo-50-percent-rule.md).
- **BIS Affiliates Rule (50% aggregation).** For Entity List / MEU exposure, aggregate ownership interests of listed parties across the chain; a subject can inherit restriction without appearing by name. See [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md).
- **Control beyond equity.** Board control, golden shares, contractual control, and nominee/trust arrangements can create control without majority equity. Test for these where ownership is opaque.
- **Map the chain to the UBO.** Diagram the ownership chain to each natural-person UBO, noting the source and date of each layer. Where a registry is unavailable or unreliable, state that as a *limitation* and reflect it in the residual rating.

---

## 7. Parallel Research Methodology (beyond automated screening)

Automated tools miss what has not been structured into their datasets: recent developments, local-language sources, historical affiliations, and reputational signals. Run structured parallel research for Medium+ subjects.

1. **Corroborate identity** against primary registry filings, not just the aggregator's record.
2. **Reconstruct history.** Prior names, predecessor entities, and past affiliations — including previously sanctioned or restricted programmes/partners the subject or its principals were connected to (e.g. legacy ties to sanctioned technology ecosystems). Historical links inform present risk even where currently unlisted.
3. **Local-language and regional sources.** Search in the languages of the subject's home and operating jurisdictions; automated feeds under-cover non-English press and regional registries.
4. **Principal-level review.** Screen and research directors, senior managers, and controllers individually — reputational and connection risk frequently sits at the individual, not the entity, level.
5. **Verify claimed regulatory status.** Confirm licences/authorisations (e.g. FSRA, ADGM, DFSA, home regulator) directly against the regulator's public register; treat unverified claims as a red flag.
6. **Triangulate.** No single source is dispositive. Record concurring and conflicting sources and how the conflict was resolved.

---

## 8. Export Controls & End-Use Screening

For technology procurement and transfers, screening the counterparty is only half the analysis; the item and the end-use complete it.

1. **Classify the item.** Determine ECCN (or EU dual-use / national equivalent) and the reason(s) for control. Software and plug-in components can carry their own classification — assess them, not just the host system. See [AI & Advanced Technology](../regulations/ai-advanced-tech-export-controls.md) and the [ECCN Classifier](../tools/eccn-classifier/index.html).
2. **Establish jurisdictional nexus.** US-origin content, de minimis US content, use of US-origin tools/software, and USD clearing can each pull a transaction into US jurisdiction. Evidence the nexus or its absence. See [De Minimis & FDPR Disputes](../enforcements/analysis-frameworks/de-minimis-fdr-disputes.md).
3. **End-user and end-use checks (EAR §744).** Screen the end-user against the Entity List, MEU List, and Section 1260H; assess prohibited end-uses (e.g. certain military, WMD, or advanced-computing applications).
4. **Red-flag review.** Apply BIS "Know Your Customer" red flags: reluctance to give end-use information, mismatch between item and buyer's business, unusual routing or freight-forwarding, requests to circumvent, or transhipment through diversion-prone jurisdictions. See [Knowledge Inference Pathways](../enforcements/analysis-frameworks/knowledge-inference-pathways.md).
5. **Disposition.** Clear, clear-with-conditions (e.g. contractual end-use undertakings, no-re-export clauses), or decline. Where a listed vendor exists, prefer an approved alternative and document the substitution.

---

## 9. Adverse Media & PEP

- Screen for PEP status (including family and close associates) and record the connection.
- Conduct adverse-media review proportionate to tier: sanctions evasion, export diversion, corruption, fraud, and links to restricted programmes.
- Distinguish allegation from finding; record source quality and date; avoid treating a single low-quality source as dispositive either way.

---

## 10. Disposition, Escalation & Sign-off

| Outcome | Meaning |
|---|---|
| **Clear** | No true match; ownership/end-use risk within tolerance |
| **Clear with conditions** | Proceed subject to stated controls (contractual clauses, monitoring, restricted scope) |
| **Escalate** | Referred to Compliance / MLRO / legal for decision — required for confirmed or unresolved true matches, 50%-rule exposure, and high-tier subjects |
| **Decline / Exit** | Prohibited nexus, unacceptable residual risk, or unresolved red flags |

Escalation record captures: the trigger, the analysis, options considered, the decision, the decision-maker, and the date.

---

## 11. Ongoing Monitoring & Re-screening

- Re-screen the active book against list updates on a defined cadence (and on event triggers: list changes, ownership changes, adverse media).
- Re-run at renewal, at material change in the relationship, and on any counterparty ownership change.
- Retain prior screening records so changes in a subject's status over time are traceable.

---

## 12. Record-keeping & Audit Trail

For every screen, retain: inputs (names, IDs, ownership), lists and sources with dates/versions, hits and their adjudication with reasons, ownership diagram, end-use analysis (where applicable), disposition, and sign-off. The standard is reproducibility: an independent reviewer should reach the same disposition from the file alone.

---

## Appendix A — Screening Record (template)

```
Subject (legal name):
Trading names / aliases:
Registration no. / jurisdiction:
Risk tier (Low / Med / Med-High / High):
Transaction / relationship type:

Lists screened (name — source — date/version):
Hits (list — match strength — adjudication — reason):

Ownership & control:
  UBO(s):
  Ownership chain (with % and source per layer):
  OFAC 50% aggregation applied? (Y/N — result):
  BIS Affiliates aggregation applied? (Y/N — result):
  Control-beyond-equity assessed? (Y/N — notes):

Parallel research summary:
  Identity corroborated (source):
  Historical affiliations:
  Principal-level findings:
  Regulatory status verified (regulator / register / date):
  Source conflicts & resolution:

Export controls (if applicable):
  Item / ECCN / reason for control:
  US / other jurisdictional nexus:
  End-user & end-use analysis:
  Red flags reviewed:

Adverse media / PEP:

Disposition (Clear / Clear w/ conditions / Escalate / Decline):
Conditions (if any):
Decision-maker & date:
Limitations & assumptions:
```

---

## Appendix B — Red-Flag Quick Reference

!!! warning "Red flags requiring compliance hold"
    - Ownership resolves to a sanctioned or restricted party at 50%+ in aggregate
    - Control without matching equity (nominees, golden shares, board control)
    - Claimed regulatory authorisation not found on the regulator's register
    - Principals with historical ties to sanctioned entities or programmes
    - Transhipment through diversion-prone jurisdictions; unusual routing
    - Reluctance to disclose end-use/end-user; item-to-buyer mismatch
    - US-origin technology, tools, or USD clearing without a cleared nexus
    - Requests to structure, split, or otherwise circumvent controls

See [Knowledge Inference Pathways — Inquiry Notice](../enforcements/analysis-frameworks/knowledge-inference-pathways.md) for the full BIS Supplement 3 red-flag list and the two-or-more-indicator threshold.

---

*This document is an internal methodology reference, not legal advice. Sanctions and export-control obligations depend on the specific facts, items, and jurisdictions involved and change frequently; confirm current list entries and regulatory positions at the time of each screen.*
