# ECCN Decision Tree: Agentic AI Models and Systems

## Overview

This decision tree guides export control classification of agentic AI models, model weights, APIs, and associated infrastructure under the Export Administration Regulations (EAR), 15 CFR Parts 730–774.

**Jurisdiction note:** This tree applies only to EAR jurisdiction. Items subject to ITAR (22 CFR 120–130) or controlled solely for AT reasons require separate analysis.

---

## Preliminary Step: Jurisdiction

```
Is the item a defense article or service?
├── YES → Likely ITAR (22 CFR 120.6); stop here
└── NO → Continue EAR analysis below
```

---

## Node 1: Is the item a model weight file or trained parameter set?

```
Is this a trained AI model (weights, parameters, embeddings)?
├── YES → Node 2
└── NO  → Node 5 (hardware/software/technology)
```

## Node 2: Training compute and performance thresholds (AI Diffusion Rule, Jan 15 2025)

```
Does the model meet EITHER threshold?
  (a) Training compute ≥ 10^26 FLOP (FP8 or lower precision equivalent)
  (b) Achieves ≥ 90th percentile on any standard reasoning benchmark
      compared to frontier models at time of release
├── YES → Node 3 (controlled AI model)
└── NO  → Node 4 (check open-weight status)
```

**Relevant ECCNs:**  
- Frontier closed-weight models: `5E002` (technology for cryptographic items) or new AI ECCN  
- Advanced computing models: cross-reference `3A090.z` for hardware dependency

## Node 3: Model access type

```
Is the model weight publicly available (open weights)?
├── YES → EAR99 if not separately controlled; note: once published, weight
│         control is impracticable — compliance focus shifts to compute/API
└── NO (closed/API-only) →
    Is access provided to D:1 or D:5 country nationals or entities?
    ├── YES → License required (ML, STA, or EI depending on end-use)
    └── NO  → No EAR license required; record deemed-export screening
```

## Node 4: Open-weight near-frontier models

```
Training compute < 10^26 FLOP but ≥ 10^23 FLOP?
├── YES → Monitor: BIS has signaled future controls may extend downward
│         Current status: EAR99 unless hardware or software separately controlled
└── NO  → EAR99; standard screening for end-use / end-user
```

---

## Node 5: Hardware (chips, accelerators, servers)

```
Is this an advanced computing chip or accelerator?
├── Does it exceed the TPP threshold?
│   (3A090: ≥ 4800 TOPS with INT8, or TFLOPS thresholds in 15 CFR 774 Supp. 7)
│   ├── YES → ECCN 3A090 → License required for D:1/D:5; MEU list screening required
│   └── NO  → Check 3A001 (general semiconductors)
│
└── Is it semiconductor manufacturing equipment?
    ├── Controls 3nm-class or below? → ECCN 3B001 (most restrictive controls)
    └── General etch/deposition? → Check 3B002 or EAR99
```

## Node 6: Software (EDA tools, ML frameworks, APIs)

```
Is this EDA software for IC design?
├── ECCN 3D001 — review against Cadence precedent (deemed-export risk)
└── Not EDA:
    Is this ML training software with cryptographic features?
    ├── Cryptographic items → ECCN 5D002 (encryption software)
    └── General ML framework → EAR99 (PyTorch, TensorFlow base)
    
Is this an API endpoint providing access to a controlled model?
├── API access = deemed export if foreign national gains "release" of controlled tech
├── Screen: is the API user a foreign national in the US? → Deemed export analysis
└── Is the API user in a D:1/D:5 country? → EAR §742.6/744 analysis
```

---

## Node 7: Technology (know-how, training data, algorithmic specifications)

```
Is this technology required for development, production, or use of a controlled item?
├── YES → Technology ECCN = "xE0yy" corresponding to the hardware/software ECCN
│   Examples:
│   • Technology for 3A090 chips → 3E001
│   • Technology for 5D002 encryption software → 5E002
│   • Technology for AI model weights at frontier → New AI tech ECCN (TBD)
└── NO  → EAR99 (ensure not FRNs requiring review)
```

---

## Deemed Export Analysis (15 CFR §734.13)

Any "release" of EAR-controlled technology to a **foreign national** inside the US constitutes a **deemed export** requiring a license to the foreign national's country of most recent citizenship/permanent residence.

### High-risk scenarios for agentic AI:

| Scenario | Risk | ECCN |
|----------|------|------|
| Foreign national employee accesses model weights | Deemed export | AI ECCN |
| Foreign national uses internal EDA tools | Deemed export | 3D001 |
| API call from foreign-national-controlled entity | Deemed export / direct export | 5D002, AI ECCN |
| Agentic system granted tool access to controlled tech | Deemed export at runtime | Context-dependent |
| Model distillation by unauthorized foreign national | Deemed export + diversion | AI ECCN |

---

## Country Tier Reference (AI Diffusion Rule)

| Tier | Countries | License Requirement |
|------|-----------|---------------------|
| **Tier 1** | US, UK, EU+, Japan, South Korea, Australia, Canada, NZ, Israel, Taiwan | No license required (NLR) for most AI items |
| **Tier 2** | ~120 countries not in Tier 1 or 3 | TDPs required; compute caps apply |
| **Tier 3** (D:1/D:5) | China, Russia, Iran, North Korea, Belarus, Cuba, Venezuela, Syria | License required; policy of denial |

---

## Agentic System Runtime Controls Checklist

- [ ] Identify ECCN of model weights used by agent
- [ ] Identify ECCN of tools authorized in agent session
- [ ] Screen all principals in authorization chain (human + machine) for SDN/MEU/Entity List
- [ ] Evaluate deemed-export surface: does any tool grant foreign national access to controlled technology?
- [ ] Log provenance per Woodward-Rogoyski architecture (see 08_Governance-Frameworks/)
- [ ] Apply agentic SOC controls: Context × Harness × Model framework

---

## References

- 15 CFR §734.13 — Deemed export definition
- 15 CFR §774, Supplement 1 — Commerce Control List (CCL)
- ECCN 3A090 — Advanced computing items (BIS IFR Oct 2022)
- ECCN 3B001 — Semiconductor manufacturing equipment
- ECCN 3D001 — EDA software (Cadence precedent 2025)
- ECCN 5D002 — Encryption software
- AI Diffusion Rule IFR (Jan 15, 2025) — 15 CFR Parts 734, 740, 742, 744
- BIS Affiliates Rule (Oct 2025) — Snap-back: 10 November 2026
