# Five Regulatory Logics: Why Regulators Chose Export Controls for AI

## Introduction

When policymakers confronted frontier AI as a national-security concern in 2022–2026, they had a menu of regulatory instruments available: safety regulation, antitrust, financial regulation, sector-specific licensing, or export controls. This section explains the five structural logics that made export controls — specifically the EAR and IEEPA — the instrument of choice.

---

## Logic 1: Export Controls Have Extraterritorial Reach

Traditional regulatory instruments (product safety, financial oversight, antitrust) operate at the national boundary. Export controls, by contrast, extend US jurisdiction wherever US-origin technology travels.

**The Foreign Direct Product Rule (FDPR)** extends EAR jurisdiction to foreign-produced items when:
- The foreign item is the direct product of US-origin technology or software; or
- The production equipment is itself a direct product of US technology.

Applied to AI: an H100 GPU designed in the US, manufactured in Taiwan by TSMC using US EDA tools, remains subject to EAR jurisdiction even after it leaves the US. The 2022 BIS Advanced Computing Rule used FDPR to block TSMC from shipping advanced chips to Huawei regardless of whether the chips ever touched US soil.

**Applied to model weights:** A model trained on a US-controlled cluster carries a US-origin technology nexus. The AI Diffusion Rule's deemed-export provisions extend this logic to API access — wherever the model is queried from, the US retains a compliance nexus.

---

## Logic 2: Export Controls Can Move Faster Than Legislation

IEEPA (50 U.S.C. ch. 35) grants the President broad emergency powers over international transactions. Executive Orders under IEEPA can:

- Designate entities without congressional approval
- Impose controls within days of an identified threat
- Be retroactively blessed by legislation (or not — IEEPA has rarely been constrained)

**Speed advantage vs. alternative instruments:**
- Safe AI Act / GAAI Act drafts: 12–24 months from introduction to enactment
- FTC rulemaking: 2–5 years
- NIST standards: Voluntary, 3–7 years to adoption
- IEEPA Emergency Order: Days to weeks

The **Fable/Mythos directive (June 2026)** was issued under IEEPA authority in response to the July 2026 agentic intrusion incidents. It normalized cyber-predicate enforcement — using a documented AI-enabled cyberattack as a predicate to trigger export control measures — without waiting for Congress.

---

## Logic 3: Export Controls Map onto Existing Enforcement Infrastructure

BIS, OFAC, and DOJ-NSD have decades of enforcement experience, existing investigative relationships with intelligence agencies, and established sanction mechanisms. No new agency or legislative infrastructure is required.

**Institutional advantages:**
- BIS can add entities to the Entity List without notice, comment, or judicial review (subject to due process challenge)
- OFAC's SDN designation triggers instant asset freeze and correspondent banking cutoff
- DOJ-NSD can prosecute export violations as criminal offenses (18 U.S.C. §371; IEEPA criminal penalties up to $1M per violation)

**Contrast with alternatives:**
- A new AI safety agency would require enabling legislation, appropriations, and years of capacity-building
- FDA-style premarket approval for AI would require defining "AI product" — a drafting problem that has consumed years of debate

---

## Logic 4: Export Controls Target the Chokepoints

The semiconductor supply chain has identifiable chokepoints where US leverage is maximal:

| Chokepoint | US Leverage | EAR Mechanism |
|------------|-------------|---------------|
| EDA software (Cadence, Synopsys) | Near-monopoly in advanced design tools | ECCN 3D001; deemed-export rule |
| Advanced lithography (ASML) | US-origin components trigger FDPR | FDPR on EUV machines |
| Advanced packaging | TSMC CoWoS capacity; US-entity participation | Entity List; technology controls |
| AI chip architecture | NVIDIA CUDA ecosystem dependency | ECCN 3A090; 3E001 |
| Model weights (frontier) | US labs control frontier training runs | AI Diffusion Rule; AI ECCN |

The same chokepoint logic applies to AI: the compute stack (chips → datacenters → training runs → model weights → API access) is a linear supply chain with identifiable US-controlled nodes at multiple steps.

---

## Logic 5: Export Controls Create Compliance Leverage over Corporate Actors

Export controls are unusual in that they make US corporations directly liable for downstream misuse of their technology. This creates a "deputized enforcement" dynamic:

- **NVIDIA** must implement destination controls on its distributors
- **Microsoft Azure** must screen API users for SDN/Entity List status
- **Anthropic** must control access to model weights per the AI Diffusion Rule

This corporate liability structure means that BIS gets a private-sector compliance army enforcing its regulations without the need for proportionate government enforcement resources.

**The Cadence precedent (2025):** BIS's warning letter to Cadence Design Systems for deemed-export violations by foreign national employees placed the semiconductor EDA sector on notice that routine workforce access to controlled technology requires ongoing screening. This precedent — now being extended to AI model access — creates continuous compliance obligations rather than one-time transaction screening.

---

## The Cyber-Predicate Innovation (2025–2026)

A sixth regulatory logic emerged in 2025–2026: using a documented AI-enabled cyberattack as a **predicate** to trigger export control measures without needing to prove that the exporter of the underlying technology was complicit.

**Mechanism:**
1. AI system (using US-origin model) conducts cyber intrusion
2. Cyber intrusion constitutes use of "cyber-capable intrusion software" under Wassenaar CCIC controls
3. The US export control regime asserts authority over the underlying AI capability as a "dual-use" technology
4. Entity-List designation or IEEPA Order issued against the threat actor and their supply chain

This logic was used in the **Fable/Mythos directive** and is now the subject of *Anthropic v. DoD*, N.D. Cal. 3:26-cv-01996, where Anthropic challenges the extension of export control jurisdiction to AI models that are subsequently used in cyberattacks without the developer's knowledge or authorization.

---

## References

- Export Administration Regulations (EAR), 15 CFR Parts 730–774
- International Emergency Economic Powers Act, 50 U.S.C. ch. 35
- Foreign Direct Product Rule, 15 CFR §736.2(b)(3)
- AI Diffusion Rule IFR (Jan 15, 2025)
- Cadence Design Systems BIS warning letter (2025)
- Wassenaar Arrangement Munitions List, Category ML21 (cyber surveillance)
- GAAI Act discussion draft (Obernolte-Trahan, 2025–2026)
