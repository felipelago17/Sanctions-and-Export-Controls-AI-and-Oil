# OFAC UBO Aggregation & 50% Rule

OFAC's 50% Rule is one of the most consequential and least well-understood rules in US
sanctions compliance. It extends SDN-equivalent restrictions to any entity owned 50% or more
(individually or in aggregate) by one or more SDN-listed parties — **even if that entity does
not itself appear on the SDN List**.

> **See also:** Felipe Villasuso Lago, *"The Affiliate Trap: OFAC's 50% Rule and Aggregation
> Risk in Joint Ventures"*, Oxford Business Law Blog (OBLB), 2026. The article analyses how
> the aggregation mechanic creates hidden sanctions exposure in multi-party joint ventures and
> private equity structures, with particular focus on the oil & gas sector.

---

## Purpose & Scope

This page provides an analytical reference on OFAC's 50% Rule and its intersection with the
BIS Affiliates Rule (EAR § 744.21). It addresses the rule's mechanics, aggregation, the
gap between OFAC and BIS frameworks, oil/energy sector exposure, and a basic compliance
workflow. It is for informational and academic purposes only and does not constitute legal
advice.

---

## Rule Mechanics

### What the Rule Does

OFAC's 50% Rule operates as an **automatic extension** of the SDN List. A US person is
prohibited from transacting with any entity in which one or more SDN-designated parties
hold, directly or indirectly, an ownership interest of 50% or more — collectively, not
merely individually. The entity need not itself be listed; the ownership link is sufficient.

The rule derives from OFAC's general interpretive authority and is articulated in its August
2014 guidance, *Revised Guidance on Entities Owned by Persons Whose Property and Interests
in Property are Blocked* (updated in subsequent OFAC FAQs, including Topic 1521). It applies
across all OFAC sanctions programmes unless a programme-specific regulation expressly states
otherwise.

### Aggregation

The aggregation mechanic is the rule's most operationally demanding feature. Where **multiple
SDN parties** each hold minority stakes in an entity, their interests are **added together**
for the 50% threshold test. An entity jointly owned 30% by SDN-A and 25% by SDN-B crosses
the threshold (55% combined) and is treated as blocked property — even though neither SDN
alone meets the 50% test, and even though the entity itself is not listed.

Aggregation applies:

- Across any number of SDN co-owners
- Through intermediate holding structures (indirect ownership chains are counted)
- Across different sanctions programmes (an SDN under Russia OFAC and an SDN under Iran OFAC
  can combine for the threshold if they co-own a target entity)

### Indirect Ownership and Layering

A chain of ownership is traced through all tiers. If SDN-A owns 80% of Company B, and
Company B owns 70% of Company C, then Company C is treated as 56% SDN-owned (0.8 × 0.7) and
falls within the rule. OFAC does not publish a definitive methodology for fractional
attribution across complex structures; the August 2014 guidance states the general principle,
and parties must exercise judgement — and document it.

!!! warning "OFAC does not maintain a 50% Rule list"
    Unlike the SDN List itself, OFAC does not publish a consolidated list of entities that
    are blocked solely by operation of the 50% Rule. Counterparty due diligence — including
    beneficial ownership (UBO) screening — is the responsibility of the transacting party.
    Failure to screen is not a defence in enforcement proceedings.

---

## OFAC 50% Rule vs BIS Affiliates Rule — Convergence and Divergence

The BIS Affiliates Rule (EAR § 744.21; suspended until 9 November 2026 under Phase 1 of
IFR 90 FR 47201) extends export-licence requirements to **affiliated entities** of listed
parties under BIS's own 50% / ownership-chain test. The two regimes share a common
threshold but differ in structure, scope, and the compliance action they require.

| Dimension | OFAC 50% Rule | BIS Affiliates Rule (EAR § 744.21) |
|---|---|---|
| **Legal basis** | OFAC interpretive guidance; 31 CFR programme regulations | EAR § 744.21; IFR 90 FR 47201 (suspended until 9 Nov 2026) |
| **Threshold** | 50% ownership, direct or indirect, aggregated across SDNs | 50% or more by a listed party; same aggregation principle |
| **Listed party** | SDN List designees (OFAC) | Entity List, MEU List, BIS-designated parties |
| **Prohibited action** | All transactions with the blocked entity absent licence or authorisation | Export, reexport, or in-country transfer of controlled items to the affiliated entity without a licence |
| **Suspension** | No suspension — rule is continuously operative | Phase 1 suspended until 9 Nov 2026; Phase 2 snap-back on 10 Nov 2026 |
| **Industry coverage** | All sectors; all OFAC programmes | Advanced-computing and AI-related items; items on the CCL |
| **Enforcement authority** | OFAC (civil and criminal penalties under IEEPA) | BIS / OEE (administrative and criminal penalties under EAR) |

**Key divergence points:**

1. **Designation lists differ.** An entity may be listed on the SDN but not on the Entity
   List, or vice versa. A full compliance analysis requires screening against both OFAC and
   BIS lists separately.

2. **The BIS rule is suspended; the OFAC rule is not.** The 9 November 2026 snap-back of the
   BIS Affiliates Rule does not affect OFAC's 50% Rule. The latter continues to apply without
   interruption across all transactions involving OFAC-sanctioned parties.

3. **Sectoral vs. item-level scope.** OFAC's rule applies to *all transactions* with a 50%-
   owned SDN affiliate. BIS's rule applies only to *controlled-item transfers*. A sale of
   uncategorised goods to a BIS-listed affiliate may be permissible under EAR; the same sale
   may be prohibited under OFAC if the overlapping SDN ownership threshold is met.

!!! info "Cross-reference"
    For the BIS Affiliates Rule suspension, Phase 2 snap-back timeline, and monitoring
    workflow, see [BIS Affiliates Rule](bis-affiliates-rule.md).
    For the full EAR interaction surface and deemed-export framework, see
    [EAR Interaction Risk Matrix](ear-interaction-risk-matrix.md).

---

## Oil & Gas Sector Exposure

The oil and energy sector presents heightened 50% Rule exposure for several structural reasons:

**Joint-venture prevalence.** Major upstream projects are routinely structured as JVs between
state-owned or private national oil companies and international operators. Where a state-owned
NOC is — or becomes — SDN-designated, the JV entity itself may cross the 50% Rule threshold
depending on equity split, with no separate designation of the JV required.

**Offtake and service chains.** Even entities that are not parties to the JV can be exposed:
trading entities, offtake counterparties, and service providers that deal with a JV entity
which is itself 50%-SDN-owned are transacting with a constructively blocked entity.

**Temporal risk.** SDN designations can be imposed rapidly and with retroactive transactional
consequences. A NOC not designated on contract execution may be designated mid-project; the
50% Rule then applies from the designation date, not the original transaction date.

**OFAC–BIS compound exposure.** In advanced-computing or AI-adjacent energy projects
(computational reservoir modelling, AI-driven extraction optimisation), a single counterparty
may simultaneously trigger both OFAC's 50% Rule (if SDN-linked) and BIS's Affiliates Rule
(if Entity List-linked). Each regime requires separate analysis and, where applicable,
separate licence applications.

---

## Compliance Workflow

A minimum viable screening and determination process for 50% Rule compliance:

1. **Identify all counterparties and their UBO chains.** Obtain beneficial ownership
   information to at least two tiers above the direct counterparty; go deeper for high-risk
   jurisdictions or sectors (Russia, Iran, Venezuela, North Korea, Syria, Cuba; oil/gas;
   advanced computing).

2. **Screen against OFAC SDN and all relevant programme lists.** Use OFAC's own search tool
   and commercial screening databases. Remember that OFAC's tool only searches the SDN List
   itself — 50% Rule-blocked entities are *not* separately searchable.

3. **Aggregate across co-owners.** Where the UBO chain shows multiple owners, sum interests
   attributable to any SDN-listed parties. If the aggregate reaches or exceeds 50%, treat the
   entity as blocked.

4. **Parallel BIS screening.** Run the same UBO chain against the BIS Entity List, MEU List,
   Denied Persons List, and Unverified List. Document separately from the OFAC analysis.

5. **Determine whether a licence or authorisation is required.** For OFAC: an OFAC licence
   or statutory exception (e.g. OFAC General Licence). For BIS: a validated licence or
   applicable licence exception.

6. **Document the determination and retain records.** OFAC and BIS both impose multi-year
   record-retention requirements. Document the ownership analysis, sources, date of screening,
   and the compliance conclusion, including any negative determinations.

!!! note "Re-screen on material changes"
    Beneficial ownership structures and SDN/BIS lists change frequently. Screen again when:
    entering a new transaction, on material change to counterparty ownership, and
    periodically for ongoing relationships (at minimum annually for high-risk
    counterparties).

---

## Primary Sources

- **OFAC FAQ Topic 1521 — The 50% Rule**
  — <https://ofac.treasury.gov/faqs/topic/1521>

- **OFAC — Revised Guidance on Entities Owned by Persons Whose Property and Interests in
  Property are Blocked (August 2014)**
  — <https://ofac.treasury.gov/media/11971/download?inline>

- **OFAC SDN and Consolidated Sanctions List search**
  — <https://sanctionssearch.ofac.treas.gov>

- **OFAC — Specially Designated Nationals and Blocked Persons List (SDN List)**
  — <https://ofac.treasury.gov/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists>

- **BIS — EAR § 744.21 (Affiliates Rule text)**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-744/section-744.21>

- **BIS IFR 90 FR 47201 — BIS Affiliates Rule (Interim Final Rule, suspension details)**
  — Federal Register Vol. 90 (2025); current status at bis.gov

- **BIS Consolidated Screening List (Entity List, Denied Persons, MEU List, Unverified List)**
  — <https://www.trade.gov/consolidated-screening-list>

- **Sanctionfy — OFAC 50% Rule (2026 Commentary)**
  — <https://www.sanctionfy.com/blog/2026/ofac-50-percent-rule>

---

*Last reviewed: June 2026*

---

## Disclaimer

This resource is for informational and academic purposes only and does not constitute legal
advice. All content is compiled exclusively from **publicly available sources** — official
government publications, regulatory texts, legislative materials, press releases, and
open-access analysis. No proprietary, confidential, subscription-only, or privileged material
is reproduced. Always consult qualified sanctions and export-control counsel before taking any
compliance decision.
