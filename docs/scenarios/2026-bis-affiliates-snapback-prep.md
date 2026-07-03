# Scenario 02 — BIS Affiliates Rule Snap-Back: Preparing for 10 November 2026

!!! abstract "Scenario metadata"
    | Field | Value |
    |---|---|
    | **Scenario ID** | 02 |
    | **Title** | BIS Affiliates Rule snap-back — distributor with mixed UAE customer portfolio |
    | **Difficulty** | Intermediate |
    | **Primary jurisdiction(s)** | EAR (BIS) |
    | **Rule-state assumed** | BIS Affiliates Rule: Phase 1 suspended (9 Nov 2025 – 9 Nov 2026); Phase 2 snap-back automatically reimposed on 10 Nov 2026 unless BIS acts; AI Diffusion Rule: rescinded 13 May 2025, replacement rule pending |
    | **Items in issue** | Advanced computing integrated circuits (candidate ECCN 3A090.a — verify at determination date) |
    | **Key teaching points** | (1) Aggregation arithmetic using two separate Entity List parties to reach the 50% threshold; (2) the snap-back is automatic — BIS need not act, the suspension simply expires; (3) licence application lead time before 10 Nov 2026; (4) Phase 2 is item-agnostic across the CCL, much broader than Phase 1; (5) a customer 35% owned by a single listed party is NOT currently affected — threshold precision matters |

---

## Fact Pattern

**Apex Semiconductors LLC** ("Apex") is a Delaware corporation that distributes advanced
computing integrated circuits (candidate ECCN 3A090.a) to customers across the Gulf
Cooperation Council region. Apex holds general authorisation to export these items to the UAE
under the applicable BIS licensing framework and has supplied three UAE free-zone customers
continuously since Q3 2025.

**Customer A — Gulf Compute FZ-LLC**

| Shareholder | Stake | Entity List status |
|---|---|---|
| Falcon Capital Partners (UAE) | 60% | Clean |
| Abu Dhabi Growth Fund | 40% | Clean |
| **Total** | **100%** | |

**Customer B — Meridian Cloud Holdings Ltd**

| Shareholder | Stake | Entity List status |
|---|---|---|
| Meridian Europe BV (Netherlands) | 65% | Clean |
| **Zhongxin Advanced Chip Co., Ltd.** | **35%** | **Entity List** (added Q1 2026; licence requirement: all EAR items; licensing policy: case-by-case) |
| **Total** | **100%** | |

**Customer C — VectorTech Abu Dhabi FZ-LLC**

| Shareholder | Stake | Entity List status |
|---|---|---|
| VectorTech International SA (Switzerland) | 45% | Clean |
| **Zhongxin Advanced Chip Co., Ltd.** | **30%** | **Entity List** (same designation as above) |
| **Pinnacle Compute Systems Ltd.** | **25%** | **Entity List** (added Q4 2025; licence requirement: all EAR items; licensing policy: presumption of denial for advanced-computing end-uses) |
| **Total** | **100%** | |

Apex's compliance team has identified the ownership structures above and has asked for a
determination covering:

1. Whether any current exports to Customers A, B, or C require a licence under existing
   rules (Phase 1 suspended period).
2. Which customers will require a licence after the snap-back on 10 November 2026 (Phase 2).
3. What steps Apex must take, and by when, to maintain lawful supply after snap-back.

---

## Provisions Touched

| Provision | Instrument | Relevance in this scenario |
|---|---|---|
| 15 CFR § 734.3 | EAR — Items subject to the EAR | Establishes EAR jurisdiction over 3A090.a chips |
| 15 CFR § 734.14 | EAR — Reexport | Applicable if any UAE customer re-exports to a third country |
| 15 CFR § 744.11 | EAR — Entity List licence requirement | Direct licence requirement where a listed party is a party to the transaction |
| 15 CFR § 744.21 | EAR — BIS Affiliates Rule (50% ownership expansion) | Extends Entity List controls to entities 50%+ owned by listed parties; currently suspended Phase 1; Phase 2 reimposed 10 Nov 2026 |
| 15 CFR § 744.21(b) | EAR — Affiliates Rule: aggregation methodology | Ownership stakes from multiple listed parties are aggregated for the 50% threshold test |
| 15 CFR Part 742 | EAR — CCL-based controls | Advanced-computing licence requirements and licensing policy |
| 15 CFR Part 740 | EAR — Licence exceptions | Exceptions that may or may not be available post-snap-back |
| 15 CFR § 762 | EAR — Recordkeeping | Five-year retention of export records |
| 15 CFR § 732, Supp. No. 3 | EAR — Red-flag indicators | Knowledge standard; party-screening obligations |

---

## Step-by-Step Analysis

### Step 1 — Jurisdiction

The items in issue are advanced computing integrated circuits distributed by a US entity
(Apex, a Delaware corporation). As items on the Commerce Control List (CCL), they are
"items subject to the EAR" under 15 CFR § 734.3 regardless of their destination or the
nationality of the buyer. EAR jurisdiction is not in doubt. ITAR does not apply (these are
commercial computing items, not defence articles on the US Munitions List). UAE national law
applies concurrently but does not determine EAR applicability.

### Step 2 — Classification

The items are advanced computing integrated circuits. The candidate ECCN is **3A090.a**
(integrated circuits for advanced computing, above applicable Total Processing Performance
thresholds). ECCN 3A090.a carries a worldwide licence requirement for certain end-users and
end-uses under Part 744, and is subject to the advanced-computing end-use controls under
§ 744.23.

!!! warning "Verify at determination date"
    ECCN parameters and thresholds for advanced computing ICs are subject to amendment.
    Confirm that the specific items fall within the current 3A090.a parameters against the
    live CCL at your actual determination date. Do not assume a frozen classification.

### Step 3 — Transaction Type

Each supply from Apex to a UAE customer is an **export** (15 CFR § 734.13): release of items
subject to the EAR from the United States to a foreign destination. There is no deemed-export
issue in the primary Apex-to-customer transaction (no foreign nationals are given access to
controlled technology within the US in this scenario). If any UAE customer subsequently
re-exports these chips to a third country, a separate **reexport** analysis (15 CFR § 734.14)
is required; that question is outside the scope of this clinic but should be addressed in
Apex's end-user undertakings.

### Step 4 — Parties & End-User Screening

**Customer A — Gulf Compute FZ-LLC:** Both shareholders are clean. No Entity List, MEU List,
or SDN match. Affiliates Rule analysis: no listed-party ownership → no aggregation required.
**Conclusion: No listed-party issue.**

---

**Customer B — Meridian Cloud Holdings Ltd:** Zhongxin Advanced Chip Co., Ltd. holds 35%.
Zhongxin is on the Entity List.

*Phase 1 (current — through 9 Nov 2026):* The BIS Affiliates Rule is suspended. There is
no Affiliates Rule licence requirement arising from Zhongxin's 35% stake during Phase 1.
However: **§ 744.11 licence requirement** — is Zhongxin itself a "party" to the transaction?
If Apex is exporting directly to Meridian (not to Zhongxin), and Zhongxin is a passive
minority shareholder with no transaction-level role, § 744.11 does not automatically trigger.
Apex should nonetheless assess whether Zhongxin has operational involvement in Meridian's
chip procurement decisions; if so, Zhongxin is a "party to the transaction" and a § 744.11
licence is required now.

*Phase 2 (from 10 Nov 2026):* The Affiliates Rule reimposition requires a licence where the
customer is 50%+ owned by listed parties. Zhongxin holds only **35%** of Meridian.
**35% < 50% — Phase 2 does NOT trigger for Meridian** based on current ownership.

!!! tip "Threshold precision — 35% is below the line"
    The BIS Affiliates Rule threshold is 50% ownership, individually or in aggregate across
    listed parties. A single listed party holding 35% — even an Entity List designee — does
    not trigger the Affiliates Rule. The control is binary: at or above 50%, licence required;
    below 50%, no Affiliates Rule requirement (though § 744.11 may still apply if the listed
    party is a transaction party). This is a frequent point of confusion in compliance review.

**Conclusion for Customer B:** Phase 2 does NOT trigger based on the 35% stake alone.
Monitor for ownership changes; reassess if Zhongxin increases its stake.

---

**Customer C — VectorTech Abu Dhabi FZ-LLC:** Two Entity List parties hold stakes.

*Aggregation arithmetic (15 CFR § 744.21(b)):*

| Listed party | Stake | Entity List |
|---|---|---|
| Zhongxin Advanced Chip Co., Ltd. | 30% | Yes |
| Pinnacle Compute Systems Ltd. | 25% | Yes |
| **Combined listed-party stake** | **55%** | **Exceeds 50% threshold** |

55% > 50% → VectorTech Abu Dhabi FZ-LLC **is a Phase 2 affected entity** under the
Affiliates Rule. Note that neither listed party alone holds a majority, but the aggregation
arithmetic — explicitly required by § 744.21(b) — brings the combined stake above the
threshold. This is the same mechanism as the OFAC 50% Rule, applied now to BIS's Affiliates
Rule post-snap-back.

*Phase 1 (current):* The rule is suspended; no Affiliates Rule licence requirement applies
to VectorTech during Phase 1. Assess § 744.11 separately (see above).

*Phase 2 (from 10 Nov 2026):* A BIS licence will be **required** for all EAR-controlled
item exports to VectorTech. Given Pinnacle's licensing policy of "presumption of denial for
advanced-computing end-uses," the licence application faces a high barrier.

**Conclusion for Customer C: Phase 2 triggers; licence required from 10 Nov 2026.**

### Step 5 — Destination

UAE is not an embargoed destination under EAR Part 746. It sits in Country Group B for most
advanced-computing controls. The relevant analysis for 3A090.a is the advanced-computing
end-use controls under § 744.23, not an embargo. The UAE's status as a major AI-investment
hub means end-use verification is a live concern.

### Step 6 — Licence Determination

**Customer A:** No licence required beyond standard NLR compliance with classification and
end-use controls. Continue with end-user screening and end-use undertakings.

**Customer B (Phase 1):** No Affiliates Rule licence; assess § 744.11 based on Zhongxin's
transaction-level role. Recommend obtaining an end-user statement from Meridian affirming
Zhongxin has no operational role in chip procurement.

**Customer B (Phase 2):** No change — 35% ownership remains below threshold. Continue to
monitor ownership.

**Customer C (Phase 1):** No Affiliates Rule licence during suspension. Same § 744.11
caution as for Customer B regarding listed-party transaction involvement.

**Customer C (Phase 2):** Licence required. Apex has two options:
1. **File a BIS licence application** for exports to VectorTech before 10 Nov 2026. Lead
   time for BIS processing varies; Apex should file by **1 September 2026** to allow
   adequate processing time. Given Pinnacle's "presumption of denial" policy for advanced-
   computing end-uses, the application faces a high denial risk.
2. **Suspend exports to VectorTech** effective 10 Nov 2026 and notify the customer in
   writing if the licence is not approved or a pending application provides no safe harbour.

!!! danger "Snap-back is automatic — no BIS trigger required"
    The Phase 2 reimposition on 10 Nov 2026 occurs automatically by operation of IFR 90 FR
    47201. BIS is not required to publish a new rule or issue a separate notice. Supplying
    VectorTech after 10 Nov 2026 without a licence (or while a licence application is
    pending, if BIS's interim policy does not provide a safe harbour) is a potential EAR
    violation. Do not wait for a BIS announcement — plan to the statutory date.

### Step 7 — Documentation & Recordkeeping

Under 15 CFR § 762, Apex must retain for **five years**:

- Export documentation (export control classifications, shipping records, invoices) for all
  three customers
- Party screening records: dates, databases searched, results, and sign-off for each transaction
- Ownership analysis records for Customers B and C: the aggregation arithmetic, source
  documents for ownership percentages, and the compliance conclusion
- Licence applications filed for Customer C and any BIS correspondence
- End-user statements and undertakings obtained from all three customers
- Any internal communications bearing on knowledge of end-use or end-user risk

Records must be accessible to BIS on demand.

### Step 8 — Residual Red Flags

- **Customer C's ownership structure** — two Entity List parties together controlling 55%
  is a significant red flag regardless of Phase 1 suspension. Apex should reassess its
  commercial relationship now, not on 10 Nov 2026.
- **Pinnacle's "presumption of denial" policy** — this designation signals BIS views
  Pinnacle as a serious proliferation or advanced-computing risk. Indirect supply to an
  entity Pinnacle co-controls should be treated as high-risk throughout.
- **Customer B's Zhongxin stake** — Zhongxin at 35% is below the Affiliates Rule threshold
  but is an Entity List party. If Apex has reason to believe Zhongxin directs or benefits
  from Meridian's chip purchases, § 744.11 applies now and a licence is required.
- **Post-snap-back ownership changes** — listed parties sometimes increase stakes in
  controlled entities after a regulatory trigger is known to be approaching. Monitor
  Customers B and C for ownership changes in the run-up to 10 Nov 2026.

---

## Model Determination Memo

??? success "Model Determination Memo — expand to reveal"

    **MEMORANDUM — EXPORT CONTROL DETERMINATION (ILLUSTRATIVE)**
    *Apex Semiconductors LLC — UAE Customer Portfolio / BIS Affiliates Rule Snap-Back*

    | Field | Customer A (Gulf Compute) | Customer B (Meridian) | Customer C (VectorTech) |
    |---|---|---|---|
    | **Items in issue** | 3A090.a ICs (verify at date) | 3A090.a ICs | 3A090.a ICs |
    | **Jurisdiction** | EAR | EAR | EAR |
    | **Classification** | Candidate 3A090.a — verify | Candidate 3A090.a — verify | Candidate 3A090.a — verify |
    | **Listed-party ownership** | None | Zhongxin: 35% | Zhongxin 30% + Pinnacle 25% = 55% |
    | **Affiliates Rule (Phase 1)** | Not triggered | Not triggered (suspended) | Not triggered (suspended) |
    | **Affiliates Rule (Phase 2)** | Not triggered | **Not triggered** (35% < 50%) | **TRIGGERED** (55% ≥ 50%) |
    | **§ 744.11 licence (now)** | Not required | Assess Zhongxin's transaction role | Assess listed parties' transaction role |
    | **Licence requirement from 10 Nov 2026** | None (absent new facts) | None (absent ownership change) | **Yes — Affiliates Rule** |
    | **Licensing policy** | N/A | N/A | Presumption of denial (Pinnacle policy) for advanced computing |
    | **Recommended action** | Continue with screening; obtain EUU | Obtain EUU; confirm Zhongxin not transaction party; monitor ownership | File BIS licence application by 1 Sep 2026 or plan to suspend exports at snap-back |
    | **Recordkeeping** | 5 years from export | 5 years; retain ownership analysis | 5 years; retain aggregation arithmetic, licence application, all BIS correspondence |
    | **Red flags** | Low | Medium (Zhongxin stake) | High (dual listed-party majority; denial-policy designee) |

    *This memo is an illustrative analysis for educational purposes only. It does not constitute
    legal advice. Confirm current CCL entries, rule text, and snap-back status before any
    compliance decision.*

---

## What Would Change the Answer?

| Variation | Effect on determination |
|---|---|
| Zhongxin increases its Meridian stake from 35% to 50% before 10 Nov 2026 | Phase 2 now triggers for Customer B: Zhongxin alone reaches the 50% threshold. Licence required from snap-back; apply same analysis as Customer C |
| VectorTech buys out Pinnacle's 25% stake, reducing Zhongxin to sole listed-party owner at 30% | Combined stake drops to 30% < 50%; Phase 2 no longer triggers under the Affiliates Rule for VectorTech. § 744.11 analysis of Zhongxin's transaction role still required |
| BIS issues a Phase 2 extension or further suspension before 10 Nov 2026 | Snap-back date shifts; recalibrate the 1 Sep 2026 licence-filing deadline to the new date. Monitor the Federal Register and bis.gov |
| Customer C is found to be re-exporting chips to a third country | A separate reexport analysis (§ 734.14) is required. Depending on destination and end-user, an EAR reexport licence may be required. Apex's end-user undertaking should prohibit unauthorised reexport; violation of the EUU is a BIS red flag |
| One of the items supplied is EAR99 rather than 3A090.a | Affiliates Rule still applies to EAR99 items in Phase 2 — the rule covers **all items subject to the EAR**, not only CCL-classified items. This is a common misconception. The licence requirement for Customer C applies to EAR99 items too |
| Apex is a non-US company but the chips incorporate US-origin technology above de minimis | US EAR jurisdiction is established through the FDPR or de minimis rules; the entire Affiliates Rule analysis applies equally. Being a non-US distributor provides no immunity |

---

## Further Reading

- **EAR § 744.21 — BIS Affiliates Rule text**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-744/section-744.21>

- **BIS IFR 90 FR 47201 — Affiliates Rule Interim Final Rule (suspension details)**
  — Federal Register Vol. 90 (2025); current snap-back status at bis.gov

- **EAR § 744.11 — Entity List licence requirement**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-744/section-744.11>

- **[BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md)** — this repository's
  monitoring page with snap-back countdown

- **[OFAC UBO & 50% Rule](../regulations/ofac-ubo-50-percent-rule.md)** — companion OFAC
  analysis; the aggregation arithmetic is structurally identical

- **[Compliance Clinic 01 — UAE Affiliate + PRC / Iran Deemed Exports](
  2026-uae-affiliate-deemed-export.md)** — related scenario covering Affiliates Rule cascade
  through a holding structure and deemed-export bifurcation

- **BIS Consolidated Screening List**
  — <https://www.trade.gov/consolidated-screening-list>

---

*Informational and academic use only; not legal advice. Compiled from publicly available
sources. Confirm current CCL entries, rule text, and snap-back status before any compliance
decision.*
