<!--
COMPLIANCE CLINICS — SCENARIO TEMPLATE
=======================================
To add a new clinic:
  1. Copy this file to docs/scenarios/YYYY-<short-slug>.md
  2. Fill in every section below (delete these comments when done)
  3. Add your scenario to the index table in docs/scenarios/index.md
  4. Add a nav entry in mkdocs.yml under "Compliance Clinics"
  5. Do NOT add this template file itself to the nav (it is kept out of the
     built site by design — see the not_in_nav exclusion below)

House style reminders:
  - British English in prose; US regulatory terms verbatim in citations
  - Cite EAR/OFAC provisions as  15 CFR § …  /  31 CFR § …
  - Never assert a frozen ECCN for AI model weights or advanced computing —
    present candidate ECCNs and instruct the reader to verify at determination date
  - Use Material admonitions: !!! note / warning / tip / abstract / example
  - Footer line (copy verbatim) on every page
-->

---
search:
  exclude: true
---

# [Scenario NN] — [Short Title]

!!! abstract "Scenario metadata"
    | Field | Value |
    |---|---|
    | **Scenario ID** | NN |
    | **Title** | [Short descriptive title] |
    | **Difficulty** | Introductory / Intermediate / Advanced |
    | **Primary jurisdiction(s)** | EAR / OFAC / both |
    | **Rule-state assumed** | [e.g. BIS Affiliates Rule: Phase 1 suspended; AI Diffusion Rule: as of DD Mon YYYY] |
    | **Items in issue** | [Describe the technology or goods] |
    | **Key teaching points** | [2–4 bullet points] |

---

## Fact Pattern

[Set out the facts clearly and concisely. Include company names, nationalities, ownership percentages, and the specific transactions contemplated. Avoid legal conclusions in the fact pattern — leave those for the analysis.]

---

## Provisions Touched

| Provision | Instrument | Relevance |
|---|---|---|
| 15 CFR § 734 | EAR — Scope | [Why it matters here] |
| 15 CFR § 744.11 | EAR — Entity List | [Why it matters here] |
| 15 CFR § 744.21 | EAR — Affiliates Rule | [Why it matters here] |
| [Add rows as needed] | | |

---

## Step-by-Step Analysis

### Step 1 — Jurisdiction

*Is the item subject to the EAR, ITAR, or neither? State your reasoning briefly.*

[Analysis here]

---

### Step 2 — Classification

*Identify candidate ECCNs. Do not assert a frozen classification for AI model weights or advanced computing items — present candidates and direct the reader to verify against the current CCL at their determination date.*

[Analysis here]

---

### Step 3 — Transaction Type

*Is this an export, re-export, in-country transfer, or deemed export (15 CFR § 734.13(b))? If multiple transactions are in issue, analyse each separately.*

[Analysis here]

---

### Step 4 — Parties & End-User Screening

*Screen all parties against the Entity List, MEU List, and SDN List. Apply the BIS Affiliates Rule (15 CFR § 744.21) and OFAC 50% Rule where relevant. Show ownership aggregation arithmetic explicitly — do not conclude without the numbers.*

[Analysis here]

---

### Step 5 — Destination

*Apply the Commerce Country Chart and any advanced-computing tier. Note applicable country groups.*

[Analysis here]

---

### Step 6 — Licence Determination

*Is a licence required? Is any exception available (EAR Part 740)? What is the applicable licensing policy (approval, case-by-case, presumption of denial)?*

[Analysis here]

---

### Step 7 — Documentation & Recordkeeping

*What records must be created and for how long must they be retained (15 CFR § 762)?*

[Analysis here]

---

### Step 8 — Residual Red Flags

*Apply the red-flag indicators (15 CFR § 732, Supp. No. 3). Note any diversion risk, personnel concerns, or knowledge-standard issues.*

[Analysis here]

---

## Model Determination Memo

??? success "Model Determination Memo — expand to reveal"

    **MEMORANDUM — EXPORT CONTROL DETERMINATION (ILLUSTRATIVE)**

    | Field | Determination |
    |---|---|
    | **Items in issue** | [Describe] |
    | **Jurisdiction** | [EAR / ITAR / Other] |
    | **Classification** | [Candidate ECCN(s) — verify at determination date] |
    | **Parties** | [List parties and screening results] |
    | **Licence requirement** | [Required / Not required / Conditional] |
    | **Applicable exception** | [If any] |
    | **Licensing policy** | [Approval / Case-by-case / Presumption of denial] |
    | **Conditions / holds** | [Any transaction holds or conditions] |
    | **Recordkeeping** | [Documents required; retention period] |
    | **Red flags** | [Summary of residual concerns] |
    | **Recommended action** | [What the compliance function should do next] |

    *This memo is an illustrative analysis for educational purposes only. It does not constitute legal advice. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*

---

## What Would Change the Answer?

| Variation | Effect on determination |
|---|---|
| [Change one fact] | [How the conclusion changes and why] |
| [Change another fact] | [Effect] |
| [Add rows as needed] | |

---

## Further Reading

- [Cite EAR/OFAC provisions, BIS guidance, OFAC FAQs, and cross-links to other pages in this repository]

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*
