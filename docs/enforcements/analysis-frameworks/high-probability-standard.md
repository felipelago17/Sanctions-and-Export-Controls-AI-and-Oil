---
title: High-Probability Knowledge Standard — EAR Enforcement
description: >
  Analysis of the "knows" definition at 15 CFR § 772.1: positive knowledge, high-probability
  awareness, and willful-blindness inference as applied in BIS civil enforcement and DOJ
  criminal prosecution. Informational; not legal advice.
---

# High-Probability Knowledge Standard

*The EAR knowledge element in civil and criminal export control enforcement.*

---

!!! info "Cross-references"
    For the statutory red-flag framework, see [Knowledge Inference Pathways](knowledge-inference-pathways.md).
    For the inchoate provisions that incorporate this standard, see [Inchoate Provisions Application](inchoate-provisions-application.md).
    For the primary regulatory text, see [Primary Sources](../../regulations/primary-sources.md).

---

## I. Statutory Definition

The EAR knowledge standard is codified at **15 CFR § 772.1** under the definition of "knows":

> *"Knows" includes positive knowledge that the circumstance exists or is substantially certain to occur, and also when a person is aware of a high probability of its existence or future occurrence. Such awareness is inferred from evidence of the conscious disregard of facts known to a person and is also inferred from a person's willful avoidance of facts.*

This definition performs three distinct functions in enforcement:

| Tier | Description | Evidence basis |
|---|---|---|
| **Positive knowledge** | Actual awareness the circumstance exists or is substantially certain | Direct evidence: emails, contracts, end-user statements |
| **High-probability awareness** | Awareness of a high probability of existence or future occurrence | Circumstantial: red flags present and not resolved |
| **Willful blindness inference** | Inferred from conscious disregard or willful avoidance of facts | Structural: compliance programme gaps, deliberate non-inquiry |

The definition deliberately expands the knowledge element beyond what a defendant would readily admit. It is modelled on the common-law "deliberate ignorance" doctrine (United States v. Jewell, 532 F.2d 697 (9th Cir. 1976)) and has been applied by BIS and DOJ since the statute's predecessors in the Export Administration Act.

---

## II. Three-Tier Structure in Practice

### Tier 1 — Positive Knowledge

Positive knowledge is the easiest tier to establish but the hardest for a respondent to deny. BIS and DOJ routinely establish it through:

- Internal communications (email, messaging platforms) referencing the controlled nature of items or the sanctioned status of a party
- Sales contracts or end-user statements indicating a controlled end-use
- Prior BIS correspondence (warning letters, "is informed" letters under § 744.22) that put the entity on formal notice
- Entity List or SDN List screening results that were viewed and ignored

!!! warning "Prior regulatory contact"
    Receipt of a BIS "is informed" letter under 15 CFR § 744.22 constitutes actual notice as a matter of law. Any transaction with the named entity after receipt requires a licence regardless of the item's ECCN or other circumstances. See [Knowledge Inference Pathways](knowledge-inference-pathways.md) §IV.

### Tier 2 — High-Probability Awareness

High-probability awareness is the operative standard for most civil enforcement actions. BIS does not need to prove the respondent knew with certainty; it must show the respondent was aware of a high probability that the circumstance existed.

**What "high probability" requires:**

The standard is higher than mere suspicion but materially lower than actual knowledge. BIS Supplement 3 to Part 732 ("Know Your Customer" guidance) identifies the following categories of facts that, when present, create a high-probability awareness inference:

1. The customer or transaction has unusual characteristics inconsistent with the stated end-use
2. The customer declines to provide end-use information or is evasive
3. The items are inconsistent with the buyer's line of business
4. The order involves technical products that the buyer appears unfamiliar with
5. The destination, routing, or payment method is atypical
6. The price offered is unusually low or high
7. The buyer requests unusual shipment methods or packaging
8. Prior transactions with the party triggered compliance concerns
9. The transaction involves a country subject to embargoes or heightened controls
10. The customer requests delivery to a freight forwarder with no clear end-use destination

BIS's established position is that a respondent who observes multiple red flags and proceeds without inquiry is aware of a high probability of a violation, even if no individual red flag would be conclusive.

### Tier 3 — Willful Blindness Inference

The willful blindness pathway ("willful avoidance of facts") is the most contested in enforcement litigation. It applies where:

- A respondent actively structured transactions to avoid obtaining information that would confirm a violation
- A respondent's compliance programme was deliberately designed with gaps that prevented the detection of violations
- A respondent received indicators of risk and took no investigative steps

The inference is available both in civil enforcement (where no scienter threshold applies beyond knowledge) and in criminal enforcement where the DOJ must prove "willfulness" under ECRA § 1760(a).

!!! note "Willful blindness vs. negligence"
    The willful blindness inference requires intentional avoidance — a deliberate decision not to know. Mere negligence in compliance (failing to screen parties, not updating procedures) does not satisfy the standard, but it may support a finding of "reason to know" sufficient for civil liability under the lesser standard applicable to some Part 764 violations. BIS distinguishes between willful violations (maximum penalties apply) and those committed with reason to know or negligently.

---

## III. Civil vs. Criminal Knowledge Standards

The "knows" definition at § 772.1 governs civil enforcement by BIS. Criminal enforcement under ECRA introduces an additional element.

| Track | Standard | Statute | Penalty ceiling |
|---|---|---|---|
| **Civil (BIS)** | "Knows" per § 772.1 (includes high-probability) | 50 USC § 4819 (ECRA); 15 CFR Part 764 | $364,992 per violation (as of 2025 adjustment) or twice the transaction value |
| **Criminal (DOJ)** | "Willfully" violates | 50 USC § 4819(b) | $1M per violation; 20 years imprisonment (natural persons) |
| **Criminal — conspiracy** | Knowledge of the agreement + intent to further it | 18 USC § 371 | 5 years imprisonment |

**"Willfully" in criminal enforcement:** Courts apply the Ratzlaf/Cheek line of cases requiring the defendant acted with knowledge that their conduct was unlawful, not merely that it was factually wrong. However, courts have also held that ignorance of the specific regulatory provision is not a defence once the defendant knew they were dealing in controlled items. See *United States v. Hsu*, 364 F.3d 192 (4th Cir. 2004).

---

## IV. Application to GPU Smuggling and AI-Chip Cases

The high-probability standard has particular salience in contemporary GPU/AI-chip enforcement because:

- The ECCN 3A090.a threshold (≥ 4,800 TFLOPS BF16; ≥ 300 TB/s I/O) is publicly published, so any sophisticated buyer or seller dealing in high-end AI accelerators is presumed to know the export control status
- Entity List and SDN status of Chinese AI research entities is publicly searchable; a failure to screen does not negate knowledge
- Prior BIS guidance (October 2023 advanced computing rule; May 2025 4E091 rescission) has been widely covered in trade publications — constructive notice applies

In GPU-smuggling cases, BIS has established high-probability awareness through: (a) the technical specifications of the chips matching controlled thresholds; (b) transshipment routing through non-aligned jurisdictions; (c) shell-company intermediaries with no plausible commercial rationale; and (d) pricing inconsistent with legitimate market conditions.

---

## V. Compliance Implications

1. **Document all inquiry steps.** When a red flag arises, the response (investigation, customer clarification, compliance hold) must be documented. The absence of documentation supports a willful blindness inference.
2. **"Is informed" letters require immediate compliance holds.** Any entity named in BIS correspondence under § 744.22 must be quarantined from transactions until counsel advises on a path forward.
3. **Screen against all lists, not just SDN.** High-probability awareness can arise from Entity List, MEU List, or Denied Persons List status even where OFAC SDN screening is clean.
4. **Quantify red-flag combinations.** Any two or more Supplement 3 indicators co-present should trigger a mandatory compliance hold pending resolution.
5. **Compliance programme gaps are evidence.** BIS treats the absence of a compliance programme, or a compliance programme with known gaps, as supporting a willful-blindness inference in civil penalty negotiations.

---

## VI. Primary Sources

| Source | URL |
|---|---|
| 15 CFR § 772.1 — "Knows" definition | <https://www.ecfr.gov/current/title-15/section-772.1> |
| 15 CFR Part 732, Supplement 3 — Red flag indicators | <https://www.ecfr.gov/current/title-15/part-732/appendix-Supplement%20No.%203%20to%20Part%20732> |
| 15 CFR § 764.2 — Violations | <https://www.ecfr.gov/current/title-15/section-764.2> |
| 50 USC § 4819 (ECRA) — Penalties | <https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title50-section4819> |
| BIS "Don't Let This Happen to You" — enforcement case studies | <https://www.bis.gov/compliance-a-training/export-management-a-compliance/dont-let-happen-you> |

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. Confirm current regulatory text before any compliance decision.*
