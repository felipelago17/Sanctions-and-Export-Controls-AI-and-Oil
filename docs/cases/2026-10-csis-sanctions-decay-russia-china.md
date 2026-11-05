# Sanctions Decay and Substitution Elasticity — Russia's Turn to China (CSIS, October 2026)

Damien Spleeters' CSIS analysis, *Russia's Turn to China Under Sanctions: Sanctions Decay, Substitution Elasticity, and the Challenge of Sustaining Pressure* (9 October 2026), supplies an analytical vocabulary this repository has lacked for assessing whether export controls and designations are *working* — as distinct from whether they are being *enforced*. It sits alongside the enforcement-arc and settlements material as the effectiveness counterpoint.

The paper's provocation: in May 2026 Ukraine's sanctions commissioner cited the shift of Russian weapons to Chinese components as evidence that sanctions were working — while Russian missile and drone use rose year on year. Spleeters argues both can be true, and that component counts are the wrong metric.

> **Source status:** Secondary analysis (think-tank). Figures attributed to the Kyiv School of Economics (KSE) are as reported by CSIS; the underlying KSE datasets should be consulted for methodology. Weapons-component findings derive from field documentation of recovered systems and are not independently verified here.

---

## Core Concepts

| Term | Definition (per CSIS) | Repository relevance |
|---|---|---|
| **Sanctions decay** | The gradual loss of a control's practical effect as the target adapts — through diversion, substitution, stockpiling or indigenous production | Explains why designation counts and settlement values ([Enforcement Arc](../enforcements/index.md)) can rise while capability denial falls |
| **Substitution elasticity** | How quickly, cheaply and reliably a restricted product, supplier or channel can be replaced | The variable that should be assessed *before* a control is imposed; high-elasticity targets decay fast |
| **Capability disruption** | The proper success metric: is the adversary's capability slower, costlier, less reliable, harder to scale, or more visible? | Replaces "Western parts absent / Chinese parts present" as the test |

---

## Key Findings

### Adaptation is layered, not a switch

A single Russian platform may simultaneously contain pre-2022 Western stock, newly diverted Western parts, Russian production, Chinese substitutes, and Western parts embedded inside Chinese modules. "Russia has switched to Chinese components" is therefore too coarse a claim in either direction.

### China's three roles

1. **Diversion hub** for Western-origin technology (the transshipment problem addressed by the BIS Entity List and FDPR — see [Extraterritorial Enforcement](../regulations/extraterritorial-enforcement.md))
2. **Supplier of substitutes** (domestic Chinese microelectronics, engines, communications modules)
3. **Producer of complete capabilities** — the Garpiya drone (2024) prompted what Treasury described as the first US sanctions on Chinese entities directly developing and producing complete weapons systems with Russian firms

### Data points (KSE, as reported)

- Export controls have cut the value of Russia's imports of Common High Priority (CHP) items by **more than half** since 2022.
- China accounts for roughly **75%** of reported CHP exports to Russia.
- The price premium Russia pays China rose with dependence, reaching about **300%** in 2025 — a direct measure of the *cost* dimension of capability disruption, and evidence that controls impose friction even when they do not deny.

### Field evidence

- **Geran-4:** Chinese turbojet, network switch, mesh modem, connectors and transceiver recovered alongside US-attributed components.
- **Geran-2 anti-jamming antenna (2025):** of 15 identified components, only two American; most Chinese, including a signal-filtering chip from the Beijing Microelectronics Technology Institute.

### Corporate adaptation outpaces listing

**Avinex Global** was registered in Hong Kong about a week before **Avtex** was added to the US Entity List; Treasury later reported thousands of microelectronics shipments to Russia through the successor. This is the successor-entity problem the [Subsidiary & Entity Shifting](../enforcements/case-summaries/subsidiary-entity-shifting/index.md) case summaries document from the enforcement side.

### Visibility loss

Substitution does not only replace a part; it can remove the manufacturer records and trace-request responses on which investigations depend. Chinese substitutes sourced outside Western supply chains carry no obligation to answer an end-use enquiry, and **China's State Council Order No. 834 (2026)** now permits countermeasures against foreign organisations that disrupt transactions with Chinese entities and subjects supply-chain investigations in China to Chinese law — a blocking-statute response to the FDPR and to private-sector traceability programmes. See [China Export Control Architecture](../regulations/china/china-export-control-architecture.md).

### Policy divergence

Continuous US sanctions implementation against Russia has largely stalled in 2026, while the EU (21st package, July 2026: 37 drone-related listings; 51 entities added to tighter dual-use restrictions, including China- and Hong Kong-linked entities) and the UK continue to add designations. The asymmetry increases the diversion value of US-origin items relative to EU-origin ones and complicates allied messaging.

---

## Policy Recommendations (CSIS)

1. **Substitution assessment before action** — require an elasticity analysis before major technology controls or designations.
2. **Target ecosystems and inelastic dependencies** — software, machine tools, test and measurement equipment, logistics — not individual parts.
3. **Successor monitoring built into every designation** — track owners, addresses, banks, freight forwarders and payment patterns from the date of listing.
4. **Shared adaptation / substitution forecast register** among the US, EU, UK, Ukraine and partners.
5. **Interoperable evidence architecture** linking field, customs, corporate and financial data.
6. **Measure capability disruption** — delay, cost, performance, reliability, scale, visibility — not component displacement.

---

## Why This Matters for the Repository's Core Subjects

**AI compute controls.** The substitution-elasticity lens is the right frame for the advanced-computing controls catalogued in [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md). The policy debate over whether chip controls "work" has been conducted largely in component-displacement terms (are Huawei Ascend chips replacing Nvidia?) when the capability-disruption questions — training-run delay, cost per FLOP, cluster reliability, yield, scale — are the ones that matter. Spleeters' six-dimension metric transfers directly.

**Energy equipment.** Russian upstream and LNG projects (Arctic LNG 2, Vostok Oil) exhibit the same layered adaptation: Western turbines and compressors in stock, Chinese substitutes with lower reliability, and indigenous production at higher cost and delay. The 300% premium finding is a template for estimating the economic effect of equipment controls on oil-and-gas capacity additions.

**Successor-entity diligence.** The Avtex/Avinex pattern is the operational case for the "successor monitoring" recommendation and for continuous (not point-in-time) screening — see [Screening Methodology](../screening/index.md).

**Enforcement-effectiveness narrative.** The repository's enforcement tracking records penalties and designations. Spleeters' framework is a reminder to present those as *inputs*; capability disruption is the *output*, and the two can move in opposite directions.

---

## Sources

- Spleeters, D., *Russia's Turn to China Under Sanctions: Sanctions Decay, Substitution Elasticity, and the Challenge of Sustaining Pressure*, CSIS, 9 Oct 2026 — <https://www.csis.org/analysis/russias-turn-china-under-sanctions>
- Kyiv School of Economics (KSE Institute), Common High Priority items trade data — as cited by CSIS
- Council of the EU, 21st sanctions package against Russia (July 2026)
- State Council of the PRC, Order No. 834 (2026)
- US Treasury, Garpiya drone designations (2024)

**Related pages in this repository**

- [Extraterritorial Enforcement](../regulations/extraterritorial-enforcement.md)
- [China Export Control Architecture](../regulations/china/china-export-control-architecture.md)
- [Subsidiary & Entity Shifting — case summaries](../enforcements/case-summaries/subsidiary-entity-shifting/index.md)
- [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md)
- [Screening Methodology](../screening/index.md)

---

*Analysis note prepared 6 November 2026. Informational only; not legal advice.*
