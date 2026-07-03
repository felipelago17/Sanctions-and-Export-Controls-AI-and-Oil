---
title: De Minimis and FDPR Disputes — Jurisdictional Enforcement
description: >
  Analysis of 15 CFR §§ 734.4 (de minimis) and 734.9 (Foreign Direct Product Rule) as
  contested jurisdictional thresholds in export control enforcement, with emphasis on
  AI/semiconductor supply chains. Informational; not legal advice.
---

# De Minimis and FDPR Disputes

*Contested jurisdictional thresholds in EAR enforcement.*

---

!!! info "Cross-references"
    For the extraterritorial enforcement framework more broadly, see [Extraterritorial Enforcement](../../regulations/extraterritorial-enforcement.md).
    For China-specific FDPR application, see [China Export Control Architecture](../../regulations/china/china-export-control-architecture.md).
    For AI/semiconductor ECCN classifications, see [AI & Advanced Technology](../../regulations/ai-advanced-tech-export-controls.md).

---

## I. Overview

Jurisdiction is the threshold question in any EAR enforcement action involving foreign-produced items. Two provisions define when the EAR reaches outside US borders:

- **15 CFR § 734.4 (De Minimis Rule):** A foreign-produced item is subject to the EAR when it incorporates US-origin controlled content above a defined value threshold.
- **15 CFR § 734.9 (Foreign Direct Product Rule / FDPR):** A foreign-produced item is subject to the EAR when it is the direct product of US-origin technology or software, or produced by a plant or major component thereof, and the item meets end-use or end-user conditions.

These provisions are the most technically contested in EAR enforcement. Disputes arise over calculation methodology, the definition of "direct product," the "substantial transformation" exception, and the end-use/end-user triggers.

---

## II. De Minimis Rule — 15 CFR § 734.4

### A. Threshold Structure

| Destination | De Minimis threshold | Covered content |
|---|---|---|
| **Most countries** | 25% (value of controlled US content / value of foreign item) | EAR99 US content does not count; only US-origin items controlled for reasons other than anti-terrorism (AT) reasons only |
| **Country Group E:1 and E:2** (embargoed: Cuba, Iran, North Korea, Sudan, Syria; and Russia/Belarus) | 10% | Same content definition |
| **Items on the Commerce Control List controlled for AT reasons only** | 25% (same as general) | US-origin AT-only controlled content |

!!! warning "EAR99 does not count toward de minimis"
    Only US-origin items that are controlled for reasons other than AT-only count toward the de minimis calculation. A foreign item that incorporates substantial quantities of US-origin EAR99 components may still fall below de minimis even if the EAR99 content is commercially significant.

### B. Calculation Methodology — Common Disputes

**Dispute 1: Fair market value vs. book value**

Section 734.4 requires use of fair market value. In practice, respondents and BIS frequently disagree on:

- Whether to use the value at the time of the disputed export or at the time the foreign item was manufactured
- How to value US-origin content embedded in a foreign-assembled item where the US content is not separately priced
- Whether to use transfer-pricing values for intra-company transactions or arm's-length equivalents

**Dispute 2: Commingled items**

When US-origin controlled content is commingled with other inputs such that individual components cannot be isolated (e.g., US-origin precursor chemicals incorporated into a foreign-produced compound), the de minimis calculation becomes contested. BIS has generally taken the position that the US-origin input's value is measured at the point of incorporation, not after transformation.

**Dispute 3: Substantial transformation**

There is no explicit "substantial transformation" exception in § 734.4 equivalent to US Customs and Border Protection rules. However, BIS has acknowledged in informal guidance and enforcement context that US-origin content that has been so fundamentally transformed that it is unrecognisable may not count. This is a very narrow exception and has rarely been determinative.

### C. De Minimis and AI/Semiconductor Supply Chains

For AI accelerator chips manufactured outside the United States:

- **TSMC-fabricated chips using US EDA software:** US-origin electronic design automation (EDA) tools used in chip design are US-origin technology. Whether the chip itself is subject to the EAR depends on whether it is a "direct product" of the US-origin technology (FDPR analysis) rather than de minimis.
- **US-origin chip packaging materials:** Where US-origin advanced packaging materials are incorporated in foreign-assembled AI chips, de minimis calculation applies to those materials.
- **Software embedded in foreign hardware:** US-origin software embedded in a foreign-produced AI accelerator counts toward de minimis at its fair market value.

---

## III. Foreign Direct Product Rule — 15 CFR § 734.9

### A. Structure and Triggers

The FDPR subjects a foreign-produced item to the EAR if it meets **two conditions simultaneously**:

**Condition 1 (Technology/Software prong):** The item is:
- The direct product of US-origin technology or software that is subject to the EAR and controlled for national security (NS), chemical or biological weapons (CB), nuclear nonproliferation (NP), missile technology (MT), regional stability (RS), surreptitious listening (SL), or anti-terrorism (AT) reasons, **or**
- Produced by any plant or major component of a plant that is itself the direct product of such US-origin technology or software

**Condition 2 (End-use/End-user prong):** The item is:
- Destined for a Military End-User (MEU) in a D:1, D:4, or D:5 country, **or**
- Destined for a D:1, D:4, or D:5 country for an end-use that requires a licence under Part 744, **or** 
- For the **Entity List FDPR (§ 734.9(e)):** the item meets the technology/software prong and is destined for or will be used by a party on the Entity List with a "footnote 1" designation

### B. "Direct Product" — The Core Dispute

**What is a direct product?**

The FDPR has been litigated and debated around what constitutes a "direct product" of US-origin technology or software. BIS's general position:

- A chip designed using US-origin EDA software is a direct product of that software
- A chip manufactured using US-origin semiconductor manufacturing equipment (e.g., ASML EUV, Applied Materials deposition tools) is a direct product of that equipment
- A chip that incorporates US-origin IP (e.g., ARM architecture licenses) where the US-origin IP is embedded in the functional design may be a direct product

**The ASML EUV / TSMC controversy:**

The central FDPR dispute in AI-chip enforcement is whether TSMC-fabricated chips for Chinese AI companies are subject to the EAR by virtue of being manufactured in tools that are themselves direct products of US-origin technology. BIS's October 2022 and October 2023 rules extended the FDPR to specifically address this:

- The "advanced computing FDPR" covers items produced by tools that meet the FDPR prong for Entity List or MEU end-users
- TSMC's implementation of export controls on advanced chips (October 2024) reflects its view that its products meet the FDPR trigger for Huawei, CXMT, and similar Entity-Listed entities

**Dispute: Plant vs. major component**

The "plant or major component" prong extends the FDPR to items produced by an entire fabrication facility where even one major piece of US-origin equipment is incorporated. This creates significant extraterritorial reach: a fab using a single US-origin deposition tool may have its entire output potentially subject to the EAR for specific end-users.

Respondents have argued that the "major component" language requires the US-origin equipment to be functionally essential to the production of the specific item, not merely present in the facility. BIS has not formally ruled on this interpretation.

### C. Entity List FDPR (§ 734.9(e)) — Footnote 1 Designations

The Entity List FDPR is the most aggressive extension of US jurisdiction. It subjects foreign-produced items to the EAR when:

1. The item meets the technology/software prong (produced using US-origin tools/technology), **and**
2. It is destined for an entity with a "footnote 1" designation on the Entity List

Footnote 1 entities include Huawei, SMIC, and numerous other Chinese semiconductor and AI entities. The FDPR applies regardless of where the item is manufactured and regardless of whether the US-origin technology content falls below de minimis.

!!! warning "FDPR and de minimis are mutually exclusive"
    The FDPR applies without regard to the de minimis threshold. An item that falls below de minimis (no EAR jurisdiction under § 734.4) may still be subject to the EAR under the FDPR if it meets the technology/software and end-use/end-user conditions. The two provisions address different bases for jurisdiction.

### D. Substantial Transformation and FDPR

Unlike de minimis, the FDPR contains an explicit exception: items that have been "commingled" with foreign-origin items in a way that substantially transforms them are not subject to the FDPR.

The scope of this exception is contested:

- BIS has taken a narrow view: substantial transformation requires that the US-origin direct product is so changed by the foreign manufacturing process that it is no longer identifiable as such
- For semiconductor chips, BIS has generally held that design and fabrication processes do not substantially transform the underlying IP or equipment contribution — the chip remains a direct product

---

## IV. Combined Jurisdiction Disputes

### De Minimis + FDPR Interaction

In complex supply chains, both provisions may be at issue simultaneously:

**Scenario:** A European telecom equipment manufacturer (not on the Entity List) ships a 5G base station to a D:5 country. The base station incorporates:
- US-origin EDA-designed chips (possible FDPR trigger for technology prong)
- Other US-origin components worth 18% of total item value (below 25% de minimis)

Analysis:
- De minimis: 18% < 25% → no EAR jurisdiction under § 734.4
- FDPR: If the chips are direct products of US-origin EDA software AND the end-user is an MEU → EAR jurisdiction under § 734.9 regardless of de minimis

Result: The item is subject to the EAR via FDPR despite falling below de minimis.

### The "AI Chip Stack" Jurisdiction Problem

For AI accelerator systems, the FDPR analysis is complicated by the fact that the same chip may:

1. Be designed using US-origin EDA software (direct product of software)
2. Be fabricated in a facility using US-origin equipment (direct product of plant)
3. Be packaged using US-origin advanced packaging technology (direct product of equipment)

Each layer independently satisfies the FDPR technology/software prong. The end-user prong then determines whether the specific shipment is subject to licence requirements.

---

## V. Enforcement Posture

BIS has consistently taken an expansive view of both de minimis and FDPR jurisdiction in enforcement actions:

- De minimis disputes are generally resolved in BIS's favour where the respondent cannot produce contemporaneous records of the calculation
- FDPR disputes are harder to resolve without formal BIS guidance or an advisory opinion
- The burden in civil enforcement is effectively on the respondent to demonstrate that the item falls outside EAR jurisdiction — BIS does not carry an affirmative burden to prove jurisdiction in administrative proceedings

**Voluntary Self-Disclosure (VSD) consideration:** Where there is genuine uncertainty about whether the FDPR applies, BIS's VSD programme allows entities to disclose potential violations while the jurisdictional question is unresolved. BIS typically grants mitigation credit for VSDs even where the jurisdictional analysis is contested.

---

## VI. Primary Sources

| Source | URL |
|---|---|
| 15 CFR § 734.4 — De minimis | <https://www.ecfr.gov/current/title-15/section-734.4> |
| 15 CFR § 734.9 — Foreign Direct Product Rule | <https://www.ecfr.gov/current/title-15/section-734.9> |
| BIS — Advanced Computing FDPR (Oct 2022 / Oct 2023 rules) | <https://www.federalregister.gov/agencies/bureau-of-industry-and-security> |
| BIS Advisory Opinion Programme | <https://www.bis.gov/complementary-resources/advisory-opinions> |
| 15 CFR Part 734 — Scope of the EAR | <https://www.ecfr.gov/current/title-15/part-734> |

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. FDPR rules are subject to frequent amendment; verify current text before any compliance determination.*
