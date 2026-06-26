# Extraterritorial Jurisdiction & Enforcement

US export controls and sanctions have extensive extraterritorial reach through mechanisms
including the Foreign Direct Product Rule (FDPR), the de minimis rule, and correspondent-
banking pressure. This page provides an analytical reference on how BIS and OFAC project
authority beyond US borders, with a focus on advanced-computing and AI-sector applications.
It is for informational and academic purposes only and does not constitute legal advice.

---

## Purpose & Scope

The United States extends its export-control and sanctions jurisdiction beyond items that
physically leave US territory. Three primary legal mechanisms create this extraterritorial
reach: (1) the **Foreign Direct Product Rule** (FDPR), which subjects foreign-produced goods
to the EAR when they incorporate US technology, software, or equipment; (2) the **de minimis**
rule, which catches foreign-made goods containing a US-controlled content share above a
threshold; and (3) **OFAC's secondary sanctions and correspondent-banking pressure**, which
can effectively extend US financial controls to non-US persons transacting in US dollars or
using US financial infrastructure. All three operate independently and may apply
simultaneously to a single transaction.

---

## Foreign Direct Product Rule (FDPR)

### What the Rule Does

The FDPR (15 CFR § 734.9) provides that a foreign-produced item is subject to the EAR if it
is the **direct product** of US-origin technology or software, or if it is produced by a
plant or major component of a plant that is itself the direct product of US-origin technology
or software — and if at least one of the item-level or end-user/destination conditions in
§ 734.9 is met.

In practice, this means that a chip designed in Taiwan using US-origin electronic design
automation (EDA) software, fabricated on equipment built using US technology, and
incorporating US-origin IP, may remain subject to EAR licensing requirements even if no
US-origin physical component appears in the finished product.

### Conditions for FDPR Application

The FDPR applies when **both** of the following are true:

1. **US-origin technology/software nexus.** The item was produced using US-origin technology
   or software (or produced in a facility that uses US-origin production equipment that is
   itself a direct product of US technology).
2. **Destination or end-user condition.** The item is destined for a country, end-user, or
   end-use to which FDPR application has been specified — either in a country-specific FDPR
   (e.g. the Russia/Belarus FDPR, the Military End-User FDPR) or in an entity-specific FDPR
   applied to Entity List designees.

!!! warning "Entity-specific FDPRs on listed parties"
    BIS has applied entity-specific FDPRs to certain Entity List designees, most prominently
    Huawei (2020) and parties involved in advanced-semiconductor production for the PRC
    military. Where an entity-specific FDPR applies, any foreign-produced item that is the
    direct product of the specified US technology or software — wherever in the world it is
    produced — requires a BIS licence before being supplied to that entity.

### FDPR in the AI and Chip Ecosystem

For AI hardware and the advanced-computing supply chain, the FDPR's practical scope is
exceptionally broad:

- **EDA software.** US-origin EDA tools (used by virtually all advanced fabs and chip
  designers globally) bring chips designed with those tools within potential FDPR scope.
- **Wafer fabrication equipment (WFE).** US-origin WFE — lithography-support, deposition,
  etch — may bring chips fabricated on that equipment within FDPR scope, even where the
  chipmaker is not a US entity and the fab is not in the United States.
- **IP licensing.** US-origin processor architecture licences (e.g. certain RISC-V toolchains,
  proprietary ISAs) used in chip design can create a FDPR nexus.

The result is that the majority of leading-edge semiconductors produced anywhere in the world
may be subject to US EAR controls through the FDPR, regardless of the nationality of the
designer, fabricator, or exporter.

!!! info "Cross-reference"
    For ECCN classifications of advanced-computing ICs (3A090, 4A090, 3A001.z, 4A003.z) and
    model-weight control history, see
    [AI & Advanced Technology Export Controls](ai-advanced-tech-export-controls.md).
    For the physical/logical interaction surface, see
    [EAR Interaction Risk Matrix](ear-interaction-risk-matrix.md).

---

## De Minimis Rule

The de minimis rule (15 CFR § 734.4) provides that a foreign-produced item is **not** subject
to the EAR — notwithstanding a US-content nexus — if the fair market value of the controlled
US-origin content incorporated in the foreign item falls below a specified percentage threshold
of the total fair market value of the foreign item. The standard threshold is **25%**; a lower
threshold of **10%** applies for items destined to Cuba, Iran, North Korea, Sudan, and Syria.

For most advanced-computing items, the de minimis exclusion is unavailable: controlled
US-origin technology (EDA software, US-origin IP) typically represents a substantial share of
the value of the finished chip, and EAR Part 734 contains specific provisions that limit de
minimis eligibility for certain controlled categories.

Parties seeking to rely on de minimis must:

1. Calculate controlled US-content value accurately (including technology and software, not
   only physical components).
2. Verify that the item category is not excluded from de minimis eligibility.
3. Document the calculation and retain records (EAR Part 762).

---

## Substantial Transformation

The EAR does not follow goods through manufacturing processes that constitute a **substantial
transformation** into a fundamentally different item. Where foreign processing genuinely
transforms the US-origin controlled input into a distinct product with different character,
use, and tariff classification, the resulting item may no longer be a "direct product" of the
original US-origin content for FDPR purposes — though this is a fact-specific analysis and
contested in enforcement proceedings.

For chips, however, BIS has taken an expansive view: the chip remains a direct product of
the EDA software used in its design even after wafer fabrication, packaging, and testing.
Substantial transformation is not readily available as a FDPR escape for advanced
semiconductors.

---

## OFAC Extraterritorial Reach

OFAC's extraterritorial reach operates through two distinct channels:

### Secondary Sanctions

Secondary sanctions target **non-US persons** who conduct transactions with US-sanctioned
parties or in sanctioned sectors. Unlike primary sanctions (which apply to US persons and
US-nexus transactions), secondary sanctions do not require a US connection to the transaction:
a non-US company transacting with a sanctioned party in a third country can be designated
under the relevant secondary-sanctions authority, losing access to the US financial system
and US counterparties.

Programmes with significant secondary-sanctions reach relevant to this repository include:
- **Russia (CAATSA / E.O. 14024):** Broad secondary-sanction authority over financial,
  energy, and defence transactions with designated Russian parties.
- **Iran (IFCA / CISADA):** Secondary sanctions on energy, shipping, and financial-sector
  transactions.
- **North Korea (CAATSA):** Secondary sanctions on parties providing significant goods,
  services, or support to North Korea.

### Correspondent Banking and Dollar-Clearing Pressure

US-dollar transactions clear through US correspondent banks, which are subject to OFAC
primary sanctions. This creates an effective secondary mechanism: any dollar-denominated
payment that routes through a US correspondent bank is reviewable by that bank, which will
block or reject transactions involving SDN-listed parties or sanctioned programmes. The
practical effect is that OFAC's reach extends to any dollar-clearing transaction globally,
regardless of the nationality of the transacting parties.

---

## BIS Enforcement Tools

BIS's Office of Export Enforcement (OEE) uses a range of administrative and criminal
enforcement tools:

| Tool | Effect | Timeframe |
|---|---|---|
| **Warning letter** | Puts party on notice; no formal penalty | Immediate |
| **Denial order (DO)** | Bars the party from participating in EAR transactions | Administrative order; may be indefinite |
| **Temporary denial order (TDO)** | Emergency export-privilege denial; renewable | 180-day initial; renewable |
| **Civil monetary penalty** | Up to the greater of $364,992 or twice the transaction value per violation (as of 2026 CPI adjustment) | After administrative proceedings |
| **Criminal referral (DOJ)** | Wilful violations of EAR: up to 20 years imprisonment and up to $1 million per count (individuals); corporate fines up to twice the gross gain | After criminal investigation |
| **Entity List addition** | Triggers licence requirement for all EAR-controlled items; end-use controls | BIS order; published in Federal Register |

BIS assesses aggravating and mitigating factors following the Framework for Voluntary Self-
Disclosure (VSD) and the factors in Supplement 1 to Part 766. VSDs generally result in
reduced penalties and signal good-faith compliance culture.

---

## Compliance Implications for the AI Sector

**For chip designers and IP licensors:** Any US-origin technology or software (EDA, IP
licences, compiler toolchains) incorporated into the design or production of advanced
computing ICs creates a potential FDPR nexus. Map US-origin inputs at the design stage, not
after the fact.

**For cloud and IaaS providers:** Cloud training and inference workloads on foreign-origin
infrastructure that was itself produced using US technology may fall within FDPR scope if
the infrastructure is subject to an applicable FDPR condition. Provider jurisdiction and
equipment provenance are material compliance inputs.

**For non-US distributors and resellers:** Reselling chips or AI-infrastructure components
subject to the EAR — even entirely outside the United States — triggers EAR reexport and
in-country transfer obligations (15 CFR §§ 734.14–734.15). The country of destination and
the end-user's status (Entity List, MEU List, OFAC SDN) must be verified at the point of
resale.

**For recipients of "is informed" letters:** BIS may notify exporters that specific
end-users require a licence even for otherwise-NLR items, through a mechanism known as an
"is informed" letter (EAR § 744.22). Receipt of such a letter is not publicly disclosed but
eliminates the good-faith NLR defence for that end-user.

---

## Primary Sources

- **EAR § 734.9 — Foreign Direct Product Rule**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-734/section-734.9>

- **EAR § 734.4 — De minimis US content**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-734/section-734.4>

- **EAR §§ 734.14–734.15 — Reexport and in-country transfer**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-734>

- **EAR § 744.22 — "Is informed" licensing requirement**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-744/section-744.22>

- **BIS Office of Export Enforcement — Enforcement resources**
  — <https://www.bis.gov/enforcement>

- **BIS — Framework for Voluntary Self-Disclosure (Supplement 1 to Part 764)**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-764/appendix-Supplement%20No.%201%20to%20Part%20764>

- **OFAC — Secondary Sanctions Overview**
  — <https://ofac.treasury.gov/sanctions-programs-and-country-information>

- **Morrison Foerster — Managing Export Control Risks in the AI Chip Ecosystem (Feb 2026)**
  — <https://www.mofo.com/resources/insights/260209-managing-export-control-risks-in-the-ai-chip-ecosystem>

- **WilmerHale — AI Diffusion Rule Officially Paused; New Guidance Elevates Risk (May 2025)**
  — <https://www.wilmerhale.com/en/insights/client-alerts/20250515-us-export-controls-on-ai-diffusion-officially-paused-but-new-guidance-elevates-risk-for-ai-related-exports>

---

*Last reviewed: June 2026*

---

## Disclaimer

This resource is for informational and academic purposes only and does not constitute legal
advice. All content is compiled exclusively from **publicly available sources** — official
government publications, regulatory texts, legislative materials, press releases, and
open-access analysis. No proprietary, confidential, subscription-only, or privileged material
is reproduced. Always consult qualified export-control and sanctions counsel before taking
any compliance decision.
