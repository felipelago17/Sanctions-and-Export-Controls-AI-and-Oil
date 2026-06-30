# Compliance Clinics

*Worked export-control and sanctions scenarios — from fact pattern to determination memo.*

---

!!! warning "Regulatory status — read before using any clinic"
    The **AI Diffusion Rule** (15 CFR §§ 742.6, 744.6) and the **BIS Affiliates Rule** (15 CFR § 744.21) are in active flux. The Affiliates Rule expansion is currently suspended (Phase 1: 10 Nov 2025 – 9 Nov 2026) and will **automatically reimpose on 10 Nov 2026** (Phase 2) unless BIS acts before that date. Candidate ECCNs for frontier AI model weights and training code are not frozen; classification must be confirmed against the live CCL at your determination date. Every clinic states the rule-state assumed at the time of drafting; always verify current status before relying on a result.

---

## Purpose

Compliance Clinics are hands-on, known-answer exercises. Each clinic takes a realistic fact pattern through the fixed eight-step determination workflow set out below and concludes with a model determination memo — the answer key. They are designed for three audiences:

!!! example "How to use this section"
    **Practitioners — self-assessment**
    Work through the eight steps on your own before opening the collapsible *Model Determination Memo*. Compare your reasoning step by step, not just your conclusion. Pay particular attention to the aggregation arithmetic in Step 4 and the deemed-export split in Step 3.

    **Researchers — provisions mapping**
    Each clinic includes a *Provisions Touched* table cross-referencing every EAR and OFAC provision engaged by the scenario. Use this as a citation index to locate the relevant regulatory text, OFAC FAQ, or BIS guidance before drafting analysis.

    **Lecturers — marking rubric**
    Withhold the *Model Determination Memo* section and distribute the scenario as a formative or summative assessment. The eight-step structure provides a natural marking scheme; each step carries discrete analytical content that can be scored independently.

---

## The Eight-Step Determination Workflow

Every clinic works through these steps in sequence. The workflow integrates EAR, OFAC, and the BIS Affiliates Rule into a single pass.

| Step | Question | Key provision(s) |
|---|---|---|
| **1 — Jurisdiction** | Is the item / technology subject to the EAR, ITAR, or neither? | 15 CFR § 734 (EAR scope); ITAR 22 CFR § 120–130 |
| **2 — Classification** | What is the candidate ECCN, or is the item EAR99? | 15 CFR § 738; CCL (Supp. No. 1 to Part 774) |
| **3 — Transaction type** | Export, re-export, in-country transfer, or **deemed export**? | 15 CFR §§ 734.13–734.16; note: release of technology to a foreign person *in the United States* = deemed export to that person's home country |
| **4 — Parties & end-user screening** | Are any parties on the Entity List, MEU List, or SDN List? Apply the **BIS Affiliates Rule** (15 CFR § 744.21) and the **OFAC 50% Rule** (OFAC Aug 2014 guidance). Show aggregation arithmetic explicitly. | 15 CFR § 744.11 (Entity List); § 744.21 (Affiliates Rule); 31 CFR (programme-specific regs) |
| **5 — Destination** | Does the destination require a licence under the Commerce Country Chart or advanced-computing tier? | 15 CFR §§ 738, 742.6; Supp. No. 1 to Part 738 (CCC) |
| **6 — Licence determination** | Is a licence required? Is any licence exception available? What is the licensing policy? | 15 CFR Parts 740 (exceptions), 742 (controls), 746 (embargoes) |
| **7 — Documentation & recordkeeping** | What records must be created and retained? | 15 CFR § 762 |
| **8 — Residual red flags** | Are there diversion indicators, personnel-churn concerns, or knowledge-standard issues? | 15 CFR § 732, Supp. No. 3 (red flags); § 764 (violations) |

!!! tip "End-user controls are ECCN-agnostic"
    Steps 4 and 6 interact critically: Entity List and MEU List controls (15 CFR §§ 744.11, 744.21) apply regardless of the item's ECCN classification, including EAR99 items. A licence is required even if the item would otherwise require no licence for the destination. Do not short-circuit the workflow by concluding "EAR99 = no licence required" before completing Step 4.

---

## Scenario Index

| # | Title | Difficulty | Key issues |
|---|---|---|---|
| [01](2026-uae-affiliate-deemed-export.md) | UAE affiliate + PRC / Iran deemed exports | Advanced | Affiliates Rule cascade; deemed-export bifurcation; OFAC Iran screening |
| — | *[Contribute a scenario](scenario-template.md)* | — | Copy the template; follow the house style |

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*
