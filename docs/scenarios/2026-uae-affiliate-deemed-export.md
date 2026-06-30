# Scenario 01 — UAE Affiliate Transfer & PRC / Iran Deemed Exports

!!! abstract "Scenario metadata"
    | Field | Value |
    |---|---|
    | **Scenario ID** | 01 |
    | **Title** | UAE affiliate transfer with PRC and Iranian deemed-export threads |
    | **Difficulty** | Advanced |
    | **Primary jurisdiction(s)** | EAR (BIS); OFAC (Iran) |
    | **Rule-state assumed** | BIS Affiliates Rule: Phase 1 suspended (snap-back: 10 Nov 2026); AI Diffusion Rule: in force as at drafting date; Zenith Microelectronics Entity List designation: 2026 |
    | **Items in issue** | Closed-weight frontier LLM weights (above AI-Diffusion compute threshold); proprietary training source code |
    | **Key teaching points** | (1) BIS Affiliates Rule cascade through an intermediate holding company; (2) aggregation arithmetic that crosses the 50% threshold without any single listed party holding a majority; (3) bifurcation of a single commercial transaction into an ordinary export and a deemed export on separate regulatory tracks; (4) OFAC Iran-nationality screening as a distinct and parallel obligation |

---

## Fact Pattern

**NovaCortex AI, Inc.** ("NovaCortex") is a Delaware corporation that has trained a closed-weight frontier large language model (LLM). The model was trained using compute above the threshold specified in the AI Diffusion Rule and NovaCortex holds the full proprietary training source code. NovaCortex intends to pursue two related transactions:

**Transaction A — Gulf transfer.**
NovaCortex proposes to transfer the model weights and training source code to its Abu Dhabi affiliate, **NovaCortex Gulf FZ-LLC** ("Gulf"), for the purpose of Arabic-language fine-tuning. The engineering team at Gulf includes nationals of the People's Republic of China ("PRC") and nationals of Iran.

**Transaction B — HQ release.**
NovaCortex's Delaware headquarters employs two software engineers who are PRC nationals, seconded from a PRC-affiliated university programme. NovaCortex proposes to give these engineers access to the same weights and training source code within the US facility.

**Ownership of NovaCortex Gulf FZ-LLC:**

| Shareholder | Stake |
|---|---|
| NovaCortex AI, Inc. | 45% |
| Zenith Microelectronics Co., Ltd. | 25% |
| Falcon Compute Holdings Ltd. | 30% |
| **Total** | **100%** |

**Ownership of Falcon Compute Holdings Ltd.:**

| Shareholder | Stake |
|---|---|
| Zenith Microelectronics Co., Ltd. | 60% |
| Other investors | 40% |

**Entity List status:** Zenith Microelectronics Co., Ltd. was added to the BIS Entity List in 2026 with a licence requirement applicable to all items subject to the EAR and a licensing policy of presumption of denial for exports that would make a material contribution to Zenith's advanced computing activities.

---

## Provisions Touched

| Provision | Instrument | Relevance in this scenario |
|---|---|---|
| 15 CFR § 734.3 | EAR — Items subject to the EAR | Establishes jurisdiction over US-origin technology and software regardless of location |
| 15 CFR § 734.13(b) | EAR — Deemed exports | Release of technology to a foreign person in the US = deemed export to their home country |
| 15 CFR § 734.14 | EAR — Deemed re-exports | Re-release of controlled technology by foreign persons |
| 15 CFR § 738 | EAR — Commerce Country Chart | Destination-based licence requirement analysis |
| 15 CFR § 742.6 | EAR — Regional stability / advanced computing | Advanced-computing export controls; AI Diffusion Rule basis |
| 15 CFR § 744.11 | EAR — Entity List | Licence requirement for any transaction in which a listed party is a party |
| 15 CFR § 744.21 | EAR — BIS Affiliates Rule | Extends Entity List controls to entities 50%+ owned by listed parties (individually or in aggregate) |
| 15 CFR § 732, Supp. No. 3 | EAR — Red-flag indicators | Knowledge standard for due diligence |
| 15 CFR § 762 | EAR — Recordkeeping | Document retention obligations |
| 31 CFR § 560 (ITSR) | OFAC — Iran sanctions | Prohibition on dealings involving Iran; applicable to Iranian-national access |
| OFAC 50% Rule guidance (Aug 2014) | OFAC | Aggregation methodology for SDN-ownership test; cross-reference with BIS aggregation |

---

## Step-by-Step Analysis

### Step 1 — Jurisdiction

The items in issue are:

1. **LLM model weights** — US-origin software / technology developed by a US corporation using US-based compute. The weights derive from a US training process. They are "technology" or "software" within the meaning of 15 CFR § 734.3(a) as items subject to the EAR by virtue of their US origin.

2. **Proprietary training source code** — US-origin software developed in the United States by NovaCortex. Clearly subject to the EAR under 15 CFR § 734.3(a)(1).

Neither item falls within the ITAR's United States Munitions List (USML, 22 CFR § 121) absent a specific military application beyond the scope of these facts. The analysis proceeds under the EAR. OFAC jurisdiction arises separately in Step 4 in connection with Iranian-national personnel (31 CFR § 560, Iran Transactions and Sanctions Regulations).

**Conclusion:** Both items are subject to the EAR. OFAC jurisdiction is engaged in parallel for the Iranian-national question.

---

### Step 2 — Classification

!!! warning "Do not freeze these classifications"
    The ECCN landscape for frontier AI model weights and advanced-computing software is evolving. The candidates below reflect the state of the CCL at the time of drafting. **Verify each against the live CCL at your determination date** — the AI Diffusion Rule amendments, the 4E091 rescission proceedings, and the broader advanced-computing controls revision may have altered these entries.

**LLM model weights (above AI-Diffusion compute threshold):**

Candidate ECCNs include entries in the **4E** (technology for ADP equipment and related items) and **4D** (software for ADP equipment) families, as well as controls introduced specifically for advanced AI model weights. Relevant candidate entries to verify:

- **4E091** — technology for items controlled under 4A090 (advanced computing items). Verify whether this entry has been amended or rescinded at your determination date.
- **4D090** — software specially designed for items controlled under 4A090.
- Alternatively, if the weights satisfy the compute threshold under the AI Diffusion Rule, they may be subject to controls introduced under the § 742.6(b) framework specifically targeting frontier AI capabilities.

**Training source code:**

The source code is software subject to the EAR. Candidate ECCNs:

- **4D001** — software specially designed for the development or production of items controlled under ECCN 4A (if applicable).
- **4E001** — technology for the development or production of items controlled in 4A.

Classification must account for what the source code *does* (trains advanced-computing models) rather than simply the technology category.

**EAR99 caveat:** Even if either item were ultimately determined to be EAR99 (no ECCN), this would not remove the obligation to complete Steps 4 and 5. Entity List and MEU List controls apply to EAR99 items (15 CFR § 744.11(a)).

---

### Step 3 — Transaction Type

This single commercial arrangement involves **three legally distinct transactions**, each on a separate regulatory track:

**Track 1 — Transaction A, Gulf transfer: ordinary export**
Transfer of weights and training source code from the United States to NovaCortex Gulf FZ-LLC in Abu Dhabi, UAE. This is an export from the United States under 15 CFR § 734.13(a) — the physical or electronic transmission of items subject to the EAR from the United States to a foreign destination. Destination: UAE (Country Group B:2). This track goes through the Commerce Country Chart analysis in Step 5.

**Track 2 — Transaction B, HQ release to PRC nationals: deemed export**
The release of technology (weights and source code) to the two PRC-national engineers within the Delaware facility constitutes a **deemed export to the PRC** under 15 CFR § 734.13(b). The EAR deems the release of technology to a foreign national in the United States to be an export to that person's most recent country of citizenship or permanent residence. Because the engineers are PRC nationals, this is treated as an export to China (Country Group D:1, D:5), triggering the full licence requirement analysis applicable to PRC destinations.

!!! note "Track 2 is independent of Track 1"
    The deemed-export analysis for Track 2 runs entirely separately from the Gulf transfer. Even if NovaCortex abandons Transaction A, the Track 2 deemed export requires its own licence analysis. Conversely, if Transaction A proceeds, it does not licence or authorise the HQ release.

**Track 3 — Iranian-national access at Gulf: OFAC Iran screening**
The Gulf engineering team includes Iranian nationals. Any access by those individuals to the weights or source code — whether received by Gulf or pre-existing — raises a separate **OFAC Iran question under the Iran Transactions and Sanctions Regulations (ITSR), 31 CFR § 560**. This is not an EAR deemed-export issue but an OFAC-programme matter requiring a full ITSR screening before the Gulf transaction is approved. It is analysed in Step 4.

---

### Step 4 — Parties & End-User Screening

This step contains the central teaching point of this clinic: the BIS Affiliates Rule cascade.

#### 4a — Direct Entity List screen

| Party | Entity List? | MEU List? | SDN? |
|---|---|---|---|
| NovaCortex AI, Inc. (US exporter) | No | No | No |
| NovaCortex Gulf FZ-LLC (consignee — Tx A) | Not directly | Not directly | No |
| Zenith Microelectronics Co., Ltd. (shareholder) | **Yes — 2026** | Check | Check |
| Falcon Compute Holdings Ltd. (shareholder) | Not directly | Not directly | No |
| PRC-national engineers (Tx B — deemed export) | Individual screening required | Individual screening required | Individual screening required |
| Iranian-national engineers (Gulf) | Individual screening required | Individual screening required | Check |

Zenith Microelectronics is on the Entity List. This is the entry-point for the Affiliates Rule cascade below.

#### 4b — BIS Affiliates Rule cascade (15 CFR § 744.21)

The BIS Affiliates Rule (Phase 1 suspended; reimposition: 10 Nov 2026) extends Entity List controls to entities owned 50% or more — individually or in aggregate — by one or more listed parties.

**Tier 1 — Is Falcon Compute Holdings covered?**

Zenith owns **60%** of Falcon. Since 60% ≥ 50%, Falcon is owned by a single listed party at or above the threshold. Falcon is therefore a "covered" entity under the Affiliates Rule, even though Falcon itself is not independently listed.

```
Zenith → Falcon: 60%  ≥  50%  ✓  Falcon is covered
```

**Tier 2 — Is NovaCortex Gulf covered?**

Now apply the aggregation arithmetic to NovaCortex Gulf:

| Shareholder | Stake | Status |
|---|---|---|
| Zenith Microelectronics (directly listed) | 25% | Listed / controlled |
| Falcon Compute Holdings (covered — see Tier 1) | 30% | Covered = treated as listed |
| NovaCortex AI, Inc. | 45% | Not listed |

Aggregate stake held by listed or covered parties: **25% + 30% = 55%**

Since 55% ≥ 50%, **NovaCortex Gulf FZ-LLC is itself a covered entity** under the Affiliates Rule.

!!! warning "The NovaCortex majority-shareholder result is not a shield"
    NovaCortex AI, Inc. holds the largest single block (45%) and is itself clean. This does not protect Gulf. The Affiliates Rule aggregates the listed/covered stakes *against each other*, not against the clean shareholder. The fact that no single listed party holds ≥50% is irrelevant once the aggregate crosses the threshold.

**Contrast with OFAC 50% Rule:** The OFAC 50% Rule (August 2014 guidance) applies the same aggregation logic for SDN ownership and reaches the same mathematical conclusion for Gulf. However, there is a significant difference in scope: the OFAC 50% Rule applies to SDN-listed parties, whereas the BIS Affiliates Rule applies to Entity List and MEU List parties. In this scenario, Zenith's Entity List designation triggers the BIS analysis. Whether Zenith is also SDN-listed must be verified separately; if so, Gulf may also be blocked property under OFAC. See [OFAC UBO & 50% Rule](../regulations/ofac-ubo-50-percent-rule.md) for the aggregation methodology comparison and the [BIS Affiliates Rule](../regulations/bis-affiliates-rule.md) page for the *Affiliate Trap* analysis.

**Tier 3 — What does "covered" mean for the transaction?**

A covered entity is treated as if it were independently listed on the Entity List. This means:

- A licence is required for *any* export, re-export, or in-country transfer of *any* item subject to the EAR to NovaCortex Gulf — regardless of ECCN or EAR99 status.
- The applicable licensing policy follows the Zenith Entity List entry: presumption of denial for items that would make a material contribution to advanced computing activities.

#### 4c — OFAC Iran screening (Track 3)

Iranian nationals employed at NovaCortex Gulf will have access to items transferred under Transaction A. Under the Iran Transactions and Sanctions Regulations (31 CFR § 560), US persons are generally prohibited from exporting, selling, or supplying, directly or indirectly, any goods, technology, or services to Iran or to nationals of Iran acting on behalf of Iranian interests, absent an OFAC licence or applicable general licence.

The question of whether access by Iranian-national engineers to the weights and source code at a UAE facility constitutes a prohibited facilitation by NovaCortex (a US person) requires a full ITSR analysis. This clinic flags the issue as a mandatory hold point; it does not reach a final OFAC conclusion because the employment and organisational structure of the Iranian-national engineers would require fact-specific diligence. **No item should be released to NovaCortex Gulf before this screening is completed.**

#### 4d — Track 2 (PRC nationals at HQ) — individual screening

The two PRC-national engineers must be individually screened against the SDN List, Entity List, MEU List, and MEU Footprint (for PRC nationals) before any technology release. The deemed export to China also implicates end-user screening for PRC military end-use under 15 CFR § 744.21 and the Military End-User Rule (15 CFR § 744.21). Confirm nationality and any dual citizenship.

---

### Step 5 — Destination

**Transaction A — UAE**

The UAE is in Country Group B:2. For most ECCN categories, the UAE does not require a licence under the Commerce Country Chart. However, this analysis is superseded here by the Entity List/Affiliates Rule result in Step 4: the licence requirement arises from the end-user control (15 CFR § 744.11), not from the destination per se.

Under the AI Diffusion Rule, the UAE is not a Country Group A:5 (approved) destination. Advanced-computing items above the compute threshold require a Validated End-User (VEU) authorisation or a licence for transfer to UAE entities — irrespective of the Affiliates Rule issue.

**Transaction B — PRC (deemed export)**

China is Country Group D:1, D:5. It is not in Country Group A:5 or A:6. For any ECCN subject to the advanced-computing controls, China is a restricted destination requiring a licence. The AI Diffusion Rule imposes heightened controls on compute-threshold items for PRC destinations. A licence for a PRC deemed export of above-threshold LLM weights or training code would face a presumption of denial under current policy.

---

### Step 6 — Licence Determination

**Transaction A — Transfer to NovaCortex Gulf (covered entity):**

- **Licence required.** The requirement arises from the end-user control (15 CFR § 744.11, via the Affiliates Rule cascade in § 744.21), ECCN-independent.
- **Exception availability:** No EAR Part 740 exception is available for transactions with Entity List parties absent specific exception text — check current exception text for any post-drafting amendments.
- **Licensing policy:** Presumption of denial, following the Zenith Entity List entry for items that would materially contribute to advanced computing activities.
- **Practical consequence:** A licence application may be made but should not be expected to succeed under current policy. Hold all transfers pending licence issuance.

**Transaction B — Deemed export to PRC (HQ release):**

- **Licence required.** The deemed export to China of above-threshold LLM weights / training code under candidate advanced-computing ECCNs (verify classification at determination date) requires a licence for China.
- **Exception availability:** No licence exception is available for PRC destinations for items controlled under the advanced-computing framework.
- **Licensing policy:** Presumption of denial for PRC advanced-computing transactions under current BIS policy.

**Track 3 — Iranian-national access (OFAC):**

- **Hold pending OFAC screening.** If Iranian-national engineers would access items transferred under Transaction A, an OFAC ITSR analysis and, if required, a specific licence or general-licence determination is mandatory before any release.

---

### Step 7 — Documentation & Recordkeeping

Under 15 CFR § 762.2, NovaCortex must retain:

- Export control classification records (ECCN determination workpapers, including candidate-ECCN reasoning and CCL citation at determination date)
- Screening records for all parties and transaction counterparties (Entity List, MEU List, SDN checks)
- Affiliates Rule ownership-structure diligence materials (corporate structure charts, ownership certificates, registry extracts for Falcon and NovaCortex Gulf)
- Aggregation arithmetic memoranda (the 25% + 30% = 55% calculation above and supporting documentation)
- OFAC Iranian-national screening records
- Any licence applications filed, correspondence with BIS, and any licences issued

**Retention period:** Five years from the later of the date of the transaction, the date of re-export or re-transfer, or the date of any licence (15 CFR § 762.6).

Records must be produced upon request by BIS, OFAC, or other authorised agencies (15 CFR § 762.7).

---

### Step 8 — Residual Red Flags

Applying the BIS red-flag indicators (15 CFR § 732, Supp. No. 3):

| Red flag | Assessment |
|---|---|
| Affiliate ownership by a listed party (Zenith) | **Confirmed — the primary basis for the licence requirement** |
| End-user (Gulf) inconsistent with legitimate use? | Arabic fine-tuning of frontier LLM weights is a plausible commercial purpose; however, the entity is covered regardless |
| Iranian nationals accessing advanced AI technology | High-risk — OFAC Iran concerns are independent of EAR result |
| PRC nationals at HQ accessing above-threshold model | Standard deemed-export risk; additional concern if engineers are affiliated with PRC university programmes linked to military-civil fusion entities |
| Personnel churn post-transfer | Model weights are extractable; once transferred, diversion risk persists — contractual controls at Gulf are insufficient absent a licence |
| Knowledge of Zenith's involvement | NovaCortex has constructive knowledge of Gulf's ownership structure and therefore knowledge of Zenith's involvement. The "red flags were present and not resolved" standard (15 CFR § 732 Supp. No. 3) is met |

!!! warning "The knowledge standard is constructive, not actual"
    NovaCortex cannot avoid liability by claiming it did not know Zenith was Entity-Listed. Once a party has the ownership information (or should reasonably have obtained it through due diligence), knowledge is imputed. Proceeding with the transfer in these circumstances without a licence would expose NovaCortex to denial-order and civil-penalty risk under 15 CFR § 764.

---

## Model Determination Memo

??? success "Model Determination Memo — expand to reveal answer key"

    **MEMORANDUM — EXPORT CONTROL DETERMINATION (ILLUSTRATIVE)**
    **NovaCortex AI, Inc. — Gulf Transfer & HQ Deemed Export**

    | Field | Determination |
    |---|---|
    | **Items in issue** | (1) Closed-weight frontier LLM weights trained above AI-Diffusion compute threshold; (2) proprietary LLM training source code |
    | **Jurisdiction** | Both items subject to the EAR (US-origin technology / software, 15 CFR § 734.3). OFAC ITSR jurisdiction engaged separately for Iranian-national access |
    | **Classification** | Candidate ECCNs: 4E091 / 4D090 (advanced computing) or other entries under the AI Diffusion Rule framework — **verify against live CCL at determination date; do not rely on this memo for final classification** |
    | **Transaction types** | (A) Export to UAE (NovaCortex Gulf); (B) Deemed export to PRC (HQ release, 15 CFR § 734.13(b)); (C) OFAC — Iranian-national access at Gulf |
    | **Party screening** | Zenith Microelectronics: **Entity Listed (2026)**. Falcon Compute Holdings: 60% Zenith-owned → **covered** under BIS Affiliates Rule. NovaCortex Gulf: 25% (Zenith direct) + 30% (Falcon covered) = **55% aggregate → covered**. No single listed party holds ≥50% directly; the aggregate test is determinative |
    | **Licence requirement — Tx A** | **Required** — end-user control (15 CFR §§ 744.11, 744.21) applies ECCN-independently; destination AI-Diffusion control provides independent basis |
    | **Licence requirement — Tx B** | **Required** — deemed export to PRC of above-threshold advanced-computing items; no exception available |
    | **Licensing policy** | **Presumption of denial** for both transactions under Zenith's Entity List entry and PRC advanced-computing policy |
    | **OFAC hold — Iranian nationals** | Complete ITSR analysis and, if required, obtain OFAC licence or confirm general licence before any access by Iranian-national engineers |
    | **Conditions / transaction hold** | **Hold all releases** — Transaction A and Transaction B — pending licence issuance and OFAC screening completion |
    | **Recordkeeping** | Retain all ECCN classification workpapers, ownership-structure diligence, aggregation arithmetic, screening records, and any licence application materials for five years (15 CFR § 762.6) |
    | **Red flags** | Confirmed: Zenith Entity List status known / constructively known; Iranian-national personnel; PRC-national deemed-export risk; personnel-churn diversion risk post-transfer |
    | **Recommended action** | (1) Suspend both transactions immediately. (2) Commission a fresh ownership-structure review of NovaCortex Gulf and Falcon (registry extracts, UBO declarations). (3) Engage export-control counsel to prepare and file licence applications if business case supports. (4) Conduct OFAC ITSR analysis for Iranian-national personnel before any Gulf transaction proceeds. (5) Screen PRC-national HQ engineers individually; confirm absence of MEU / military-civil fusion links. (6) Create and retain documentation of this determination and all diligence steps |

    *This memo is an illustrative analysis for educational purposes only. It does not constitute legal advice. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*

---

## What Would Change the Answer?

| Variation | Effect on determination |
|---|---|
| **Falcon's Zenith stake is 40% (not 60%)** | Falcon is no longer covered (40% < 50% single-party threshold). Gulf's aggregate drops to 25% (Zenith direct only) — well below 50%. Gulf is not a covered entity. Transaction A reverts to a standard export-to-UAE / AI-Diffusion analysis. The Entity List issue disappears, but the AI-Diffusion destination analysis and the Iranian-national OFAC screening remain. |
| **LLM weights determined to be EAR99 at determination date** | Entity List / Affiliates Rule controls still apply to EAR99 items (15 CFR § 744.11(a)). The covered-entity licence requirement for Transaction A is unchanged. The UAE destination analysis eases (no ECCN-based column X), but the end-user control is ECCN-agnostic. For Transaction B, if weights are EAR99, the PRC deemed-export analysis is simplified — no advanced-computing ECCN-based licence requirement — but the Entity List / Affiliates Rule end-user issue still applies if any Gulf-employed PRC nationals are involved in HQ access. |
| **PRC-national HQ engineers are permanent US residents (green card holders)** | A permanent resident's country of permanent residence is the United States; 15 CFR § 734.13(b) deems a release to be an export to the *most recent country of citizenship or permanent residence*. If these engineers have obtained US permanent residence and are not dual nationals of the PRC, there may be no PRC deemed export. However, BIS guidance on dual-national engineers and PRC military-civil fusion links should be reviewed; and if engineers hold PRC citizenship in addition to US permanent residence, the analysis is less clear. |
| **BIS Affiliates Rule has fully reimposed (Phase 2, post 10 Nov 2026)** | The snap-back does not change the conclusion — the Affiliates Rule cascade to NovaCortex Gulf is the same under Phase 1 and Phase 2. However, Phase 2 may introduce expanded scope or clarified aggregation guidance; verify the Phase 2 rule text at your determination date. If the snap-back has occurred and BIS has issued further interpretive guidance, review that guidance for any changes to the tier-by-tier cascade methodology. |

---

## Further Reading

**EAR provisions**

- 15 CFR § 734 — Scope of the EAR and deemed-export definitions
- 15 CFR § 742.6 — Advanced-computing export controls (AI Diffusion Rule basis)
- 15 CFR §§ 744.11, 744.21 — Entity List and BIS Affiliates Rule

**This repository**

- [BIS Affiliates Rule & 50% Ownership Expansion](../regulations/bis-affiliates-rule.md) — mechanics, snap-back, and the *Affiliate Trap* analysis
- [OFAC UBO & 50% Rule](../regulations/ofac-ubo-50-percent-rule.md) — aggregation methodology and comparison with BIS rule
- [Anthropic Fable 5 / Mythos 5 — BIS Deemed-Export Directive (Jun 2026)](../cases/2026-06-anthropic-fable-mythos-deemed-export.md) — a live case study on deemed-export controls applied to frontier AI model access

**OFAC**

- OFAC, *Revised Guidance on Entities Owned by Persons Whose Property and Interests in Property are Blocked* (August 2014)
- 31 CFR § 560 (Iran Transactions and Sanctions Regulations)

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*
