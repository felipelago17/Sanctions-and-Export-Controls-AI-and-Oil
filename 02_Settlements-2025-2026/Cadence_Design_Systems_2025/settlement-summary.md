# Cadence Design Systems — BIS Deemed Export Warning Letter (2025)

## Key Facts

| Field | Value |
|-------|-------|
| Settlement ID | BIS-2025-002 |
| Company | Cadence Design Systems |
| Agency | Bureau of Industry and Security (BIS) |
| Penalty Amount | $0 (Warning letter) |
| Date | 2025 |
| Enforcement Type | Warning letter |
| ECCN | 3D001, 5D002 |

## Conduct

Cadence Design Systems failed to obtain deemed-export licences for foreign national employees in the US who accessed controlled EDA (Electronic Design Automation) software tools. The software was classified under ECCN 3D001 (software for the development or production of equipment controlled under 3A001 or 3B001) and potentially 5D002 (encryption software).

Under 15 CFR §734.13, providing access to controlled technology to a foreign national in the US constitutes a "deemed export" to that national's country of most recent citizenship or permanent residence. EDA software that enables the design of advanced semiconductor chips is controlled for National Security (NS) reasons, and access by nationals of countries subject to NS controls (including China) requires a deemed-export licence.

Cadence's internal access controls were insufficient to prevent foreign national employees from accessing controlled EDA tools without the required licences.

## Why This Case Matters

**Novel Precedent: EDA Software as Deemed Export.** This is among the first known BIS enforcement actions focused on the deemed-export risk of EDA software access in the semiconductor industry. EDA tools (Cadence Virtuoso, Synopsys IC Compiler, Mentor Graphics Calibre) are the essential software layer that enables integrated circuit design — without them, even a talented engineer cannot produce designs for advanced nodes.

**AI Extension.** The Cadence precedent is directly analogous to the AI context: if a foreign national employee at a US AI lab accesses controlled model weights or AI development infrastructure (AI training frameworks with controlled cryptographic components), that access may constitute a deemed export. The AI Diffusion Rule does not yet explicitly address EDA-analogous deemed-export scenarios for AI software, but BIS enforcement guidance is expected.

**Compliance Programme as Mitigation.** The warning letter (rather than a civil penalty) reflects that Cadence cooperated with BIS and agreed to implement an enhanced compliance programme with annual reporting obligations. This is the paradigmatic outcome of proactive engagement with BIS after a voluntary self-disclosure.

## Compliance Lessons

1. **Foreign national access to controlled technology requires licence screening, not just employment eligibility verification (I-9/E-Verify).** Employment law compliance and export control compliance are separate obligations.

2. **Access control systems must map to ECCN classifications.** A role-based access control (RBAC) system that grants all engineers access to all EDA tools without nationality screening creates systematic deemed-export risk.

3. **Warning letters create ongoing obligations.** The enhanced compliance programme and annual reporting requirement make Cadence a monitored entity — future violations will be treated as aggravated (repeat violations).

4. **AI parallel.** Any US AI lab where foreign national employees access model weights above EAR99 classification faces the same deemed-export compliance obligation. The Cadence precedent puts the entire AI industry on constructive notice.

## Deemed Export Compliance Checklist (AI Context)

- [ ] Classify all model weights by ECCN
- [ ] Map employee nationalities against EAR §734.13 triggers
- [ ] Implement access controls that enforce ECCN-based restrictions for foreign national employees
- [ ] Obtain deemed-export licences for controlled access, or restructure access to eliminate the deemed-export trigger
- [ ] Document screening programme for BIS audit readiness
- [ ] Annual self-audit and voluntary disclosure protocol

## References

- BIS Cadence Design Systems warning letter (2025)
- 15 CFR §734.13 — Deemed export definition
- 15 CFR §774 — Commerce Control List (CCL)
- ECCN 3D001 — EDA software
- ECCN 5D002 — Encryption software
- See also: settlements-index.json entry BIS-2025-002
