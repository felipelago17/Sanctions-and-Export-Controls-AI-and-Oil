# AAEI — Artificial Intelligence in Trade Compliance: An Educational Guide for the Trade (2026)

**Source:** American Association of Exporters and Importers (AAEI), *Artificial Intelligence in Trade Compliance — An Educational Guide of the Trade*, 25 pp., 2026 (refers to events through mid-2026, including CBP Ruling H350722 of January 2026 and the June 2026 Commerce model-access order).

**Why it is here:** the first trade-association guide to set out, from the US importer/exporter side, where AI may and may not take decisions in customs, export-classification, licensing and screening work — and to treat **the AI model itself as an export-controlled, switch-off-able dependency**. It is directly relevant to any compliance function building AI-assisted screening or classification tooling, including the automated pipelines in this repository.

---

## Core position

AI does not change the compliance obligation; it changes **where controls must be applied**. Liability for a filing, classification or licence determination stays with a person the law can hold accountable — the importer of record, the exporter, the ITAR Empowered Official — however much of the work the tool did. The guide's organising device is a continuum from mechanical functions to independent judgement: the further a tool moves along it, the more deliberately the company must build controls that keep humans in charge.

### Three tiers of use

| Tier | Examples |
|---|---|
| **Automated end-to-end (mechanical)** | Document intake; entry-against-source reconciliation; restricted-party screening of *known* counterparties |
| **AI proposes, a person determines** | HS classification for new SKUs in established families; FTA qualification with a complete bill of materials; post-entry review findings; ECCN/USML proposals with the controlling entry and parameters |
| **Never automated (judgment)** | First-of-kind classification; valuation with royalties, assists or related-party pricing; AD/CVD scope calls; forced-labour detention responses; **voluntary self-disclosures** |

The guide recommends drawing these lines *before* a tool is in production, not after a determination is questioned.

---

## Regulators' own use of AI

- **CBP** is the lead adopter: the Advanced Trade Analytics Platform and the Automated Targeting System score cargo and surface ranked anomaly leads (value drift, post-tariff classification or origin changes, suppliers that appear and vanish) before a human sees the file; a June 2026 funding law added roughly USD 3.5 billion for technology and enforcement. Practical consequence: **the agency will catch AI-assisted mistakes before the filer does.**
- **BIS**: AAEI could find no publicly documented AI use case; it cites CSIS on analysts working with outdated Excel and spending 80 % of their time finding data, GAO's 2025 call for modern analytics, and the Disruptive Technology Strike Force's reference to real-time intelligence.
- **DDTC**: an AI-enabled virtual agent launched 19 December 2025 — scoped by DDTC to IT support, not ITAR adjudication, despite trade-press framing.
- **OFAC**: a public GenAI chatbot for FAQs, executive orders and general licences — "aspirational, not yet funded".

---

## CBP Ruling H350722 (January 2026) — software is not a substitute for human decision-making

CBP held that an unlicensed entity cannot decide what data appears on an entry, whether extracted manually or by an automated tool; an OCR tool extracting entry data can itself constitute "customs business". By extension, AI tools may pre-populate entry forms, but a **licensed broker must review and make the final determination**. Industry interpretation has varied; AAEI notes open questions on how the standard applies to newer AI platforms and the possibility of further or revoked rulings. The reasonable-care standard of the Customs Modernization Act applies unchanged to AI-assisted filings.

---

## Use cases discussed

Classification (HS, ECCN, USML) with written rationale; FTA qualification; document generation; continuous entry review and audit (with the caveat that an AI auditor finds only what it is told to look for — undeclared value anomalies, conflicting origins across documents, undisclosed related-party relationships still come from human curiosity); drafting responses to government inquiries (assertions remain for counsel); **sanctions screening** (ML and fuzzy logic for transliterations, aliases, ownership tiers against the Entity List, DPL and SDN list — value depends on list currency and tuning); **licence-determination validation** against SNAP-R and DECCS workflows, with cautious piloting of AI-drafted technology control plans and VSDs; regulatory horizon scanning at product and part level; supply-chain visibility, SKU-level traceability and supplier risk assessment applying the OFAC 50 % rule, the BIS Affiliates Rule, UFLPA, EU Forced Labour Regulation, EUDR and CBAM continuously across mapped entities — with the determination always left to a person.

---

## National-security dimension: the model as a controlled dependency

The guide records that on **12 June 2026**, three days after a frontier-model release, the Commerce Department ordered the developer to stop making the models accessible to any foreign national, inside or outside the US, after researchers reported a guardrail bypass reaching restricted cyber capabilities; because nationality could not be verified in real time, the practical effect was a worldwide shutdown. Controls were lifted on **30 June**, access resumed **1 July**, with the more capable model limited to approved US critical-infrastructure defenders. AAEI calls it the first enforcement of export controls against **access to a model** rather than the hardware, and draws the operating lesson: for export-controlled work, **tool selection is a licensing decision, not a productivity choice**, and continuity planning must assume a regulator can switch a model off for weeks and restore it with conditions.

---

## Internal controls (COSO-style mapping)

| Component | AAEI expectation |
|---|---|
| Control environment | Named owners for the tool, compliance review, security review and adoption; the ITAR Empowered Official named in the ownership map |
| Risk assessment | The primary risk is a **confident wrong answer**; train staff on failure modes, prohibit gap-filling by guesswork, define what must never be uploaded |
| Control activities | Pre-deployment testing against known-correct results; ongoing spot checks; **second-level review for any output feeding a filing or disclosure**; least-privilege data access for the tool |
| Information & communication | Every determination traceable to an approving person; inputs, outputs and rationale recorded; on the export side the reconstruction standard reaches the **prompts and outputs behind an ECCN or licence determination** |
| Monitoring | Periodic audits of output samples and overrides, plus a human in the loop on consequential outputs between audits; re-validate after vendor model updates |
| Record-keeping | Unchanged obligations under 19 CFR Part 163, 15 CFR Part 762 and FTR § 30.10 — records complete, retrievable, including **model version**, reconstructable as of the entry date, for the full retention period |
| Standards | Fold AI use into the BIS Export Compliance Program elements, especially internal audit and risk management |

Exception triggers should not be defined by model confidence alone — missing or contradictory product data, novel items, and changes in regulation, supplier or sourcing should all route to a person.

---

## Relevance for this repository and for UAE practice

- The **tiering** and the **prompt-and-output record-keeping** standard are directly applicable to the automated screening and regulatory-monitoring pipelines maintained here: outputs are proposals, determinations are logged to a named person, and model versions are recorded.
- The **model-as-dependency** point is the US trade-association articulation of the "access as the export" thesis tracked across this repository — see the [H200 licensee case note](../cases/2026-11-nyt-h200-china-licensees-vetting.md) and the [AI-chip legislation tracker](../regulations/us-ai-chip-export-legislation-tracker.md). For UAE compliance teams using US-hosted frontier models for screening or classification, the continuity question AAEI raises is live, not hypothetical.
- The CBP ruling has a UAE analogue in the licensed-customs-broker regime: automated pre-population is permissible, final declaration remains with the licensed person.

**Related pages:** [Screening Methodology](index.md) · [ICC Netherlands sanctions compliance minimum standards](icc-nl-sanctions-compliance-minimum-standards.md) · [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md)

---

*Summary prepared 9 November 2026 from the published guide. Informational only; not legal advice.*
