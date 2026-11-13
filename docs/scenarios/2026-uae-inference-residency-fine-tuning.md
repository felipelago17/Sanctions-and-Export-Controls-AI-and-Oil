# Scenario 03 — UAE Inference Residency vs Fine-Tuned Weights

!!! abstract "Scenario metadata"
    | Field | Value |
    |---|---|
    | **Scenario ID** | 03 |
    | **Title** | In-country inference and a fine-tuning project for a UAE group |
    | **Difficulty** | Intermediate |
    | **Primary jurisdiction(s)** | EAR (BIS); UAE FDL 43/2021 |
    | **Rule-state assumed** | AI Diffusion Rule: text in the CFR, announced as not enforced since May 2025, replacement pending (see [status page](../cases/2026-11-ai-diffusion-rule-4e091-status.md)); UAE schedule under Cabinet Resolution 156/2025; position as at 13 Nov 2026 |
    | **Items in issue** | API access to a US-developed closed-weight LLM hosted in the UAE; fine-tuned adapter weights; training corpus containing engineering data; confidential-computing components |
    | **Key teaching points** | (1) Access and weights are different export-control objects; (2) local hosting answers a data-residency question, not an export-control one; (3) a fine-tuned artefact inherits questions from both the base model and the training data; (4) UAE and US analyses run in parallel |

---

## Fact Pattern

**Sahra Industrial Group PJSC** ("Sahra") is a UAE industrial group with an onshore operating company and a subsidiary registered in a financial free zone. It contracts with **Halcyon AI, Inc.** ("Halcyon"), a Delaware developer of a closed-weight LLM.

**Phase 1 — Inference.** Halcyon offers inference from a data centre in the UAE operated by a local cloud partner on US-origin accelerators. Sahra staff, who hold a range of nationalities, submit prompts that sometimes include engineering drawings and process data received from a US equipment supplier. Halcyon support engineers outside the UAE can access logs for troubleshooting.

**Phase 2 — Fine-tuning.** Sahra wants a version adapted to its maintenance records and the supplier's technical manuals. Halcyon will run the fine-tuning job in the UAE data centre and host the resulting adapter weights. Sahra asks for (a) a copy of the adapter weights held in escrow in the UAE and (b) access for a joint-venture affiliate in which a non-UAE investor holds a significant minority stake.

---

## Provisions Touched

| Provision | Instrument | Relevance in this scenario |
|---|---|---|
| 15 CFR § 734.3 | EAR — items subject to the EAR | Jurisdiction over US-origin software, technology and hardware |
| 15 CFR §§ 734.13–734.14 | EAR — export, reexport | Whether prompts, logs or weights moving between countries are exports or reexports |
| 15 CFR § 734.18 | EAR — activities that are not exports | Possible relevance of end-to-end encryption conditions; verify the current text |
| 15 CFR § 734.9 | EAR — foreign direct product rules | Reach over items produced with US technology, including the model-weights provision added in Jan 2025 |
| 15 CFR § 742.6(a)(13) | EAR — AI Diffusion Rule weights control | Text reported to remain in the CFR; not enforced by announced policy |
| 15 CFR § 740.17 | EAR — Licence Exception ENC | Encryption components of the confidential-computing stack |
| 15 CFR Part 744 | EAR — end-user and end-use controls | Screening of Sahra, the cloud partner and the JV affiliate |
| FDL 43/2021; Cabinet Resolutions 97/2024 and 156/2025 | UAE | Whether any software or technology leaving the UAE is on the UAE schedule |

---

## Step-by-Step Analysis

### Step 1 — Jurisdiction

The base model, the accelerators and the supplier's technical data are US-origin, so the EAR is engaged whatever the hosting location. The UAE regime is engaged separately if listed software or technology is exported or re-exported from the UAE. Neither analysis disposes of the other.

### Step 2 — Classification

Four objects need separate treatment. Do not record a frozen ECCN for any of them.

| Object | Candidate treatment | What to verify |
|---|---|---|
| Base model weights | Candidate 4E091 if the model meets the Jan 2025 threshold; otherwise likely EAR99 | Current CFR text and enforcement posture at the determination date |
| Adapter weights from fine-tuning | No settled position. Consider the base-model treatment and whether controlled technical data is recoverable from the artefact | Extraction testing; developer's own classification |
| Supplier drawings and process data | Whatever the supplier's classification is | Obtain it in writing from the supplier |
| Confidential-computing and TLS components | Category 5 Part 2 candidates | Self-classification or ENC eligibility |

### Step 3 — Transaction Type

**Phase 1** is provision of access. Sahra receives outputs, not the model. The export-relevant movements are the prompts (if they contain controlled technical data and are accessible outside the UAE) and Halcyon's remote log access. **Phase 2** creates a new artefact and proposes two transfers of it: escrow in-country, and access by an affiliate.

### Step 4 — Parties & End-User Screening

Screen Sahra, the free-zone subsidiary, the cloud partner and the JV affiliate, including ownership chains, against the Entity List, MEU List and SDN List. Apply the ownership-aggregation logic in the [BIS Affiliates Rule page](../regulations/uae/bis-affiliates-rule.md) to the JV investor, noting the current suspension. Record staff nationalities only to the extent needed for a release analysis of controlled technical data.

### Step 5 — Destination

Hosting in the UAE fixes where inference runs. It does not fix where logs can be read, where support staff sit, or where the affiliate's users are. Map each access path as its own destination.

### Step 6 — Licence Determination

| Flow | Likely position | Condition |
|---|---|---|
| Prompts containing only EAR99 or Sahra-origin data | No licence expected | Screening clear |
| Prompts containing supplier's controlled technical data | Depends on the supplier's classification and on who can access it | Restrict by policy until classification is in hand |
| Remote log access by Halcyon staff | Movement of the same data out of the UAE | Limit by zero-retention or in-country support, or classify |
| Adapter weights in UAE escrow | Open question tied to Step 2 | Contract for a classification from Halcyon before release |
| Affiliate access | End-user question first, item question second | Screening and ownership analysis complete |

### Step 7 — Documentation & Recordkeeping

Keep the data-flow map, the supplier's classification, screening results, the fine-tuning dataset manifest, extraction-test results and the rule-state note with its date. Retain under 15 CFR Part 762.

### Step 8 — Residual Red Flags

- The contract describes the service as "UAE-resident" but support access is global.
- The training corpus includes third-party technical manuals with unknown classification.
- The affiliate's minority investor has not been identified to ultimate ownership.
- No one has been assigned to re-check the rule state when the replacement rule is published.

---

## Model Determination Memo

> **Phase 1** may proceed on the basis that Sahra receives access, not the model, provided that (i) controlled supplier data is excluded from prompts until its classification is confirmed and (ii) remote log access is disabled or confined to the UAE. **Phase 2** may proceed to training once the dataset manifest is cleared. Release of adapter weights to escrow, and access by the JV affiliate, are held pending Halcyon's written classification of the adapter weights, completion of ownership screening, and a check of the UAE schedule. The determination is dated and must be revisited on publication of any replacement for the AI Diffusion Rule.

---

## What Would Change the Answer?

- Commerce issues the replacement rule, or resumes enforcement of the existing text.
- The supplier classifies its data above EAR99.
- The JV investor, or a party in its chain, is or becomes listed.
- Extraction testing shows supplier data can be recovered from the adapter weights.
- The UAE schedule is amended to add an entry that fits model weights.

---

## Further Reading

- [AI Diffusion Rule & ECCN 4E091 — status](../cases/2026-11-ai-diffusion-rule-4e091-status.md)
- [UAE Non-Proliferation & Export Control Regime](../regulations/uae/uae-non-proliferation-regime.md)
- [Encryption Controls, Open Source & EAR Scope](../regulations/encryption-open-source.md)
- [BIS Deemed-Export — Anthropic Fable 5 / Mythos 5](../cases/2026-06-anthropic-fable-mythos-deemed-export.md)
- [Scenario 01](2026-uae-affiliate-deemed-export.md)

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*
