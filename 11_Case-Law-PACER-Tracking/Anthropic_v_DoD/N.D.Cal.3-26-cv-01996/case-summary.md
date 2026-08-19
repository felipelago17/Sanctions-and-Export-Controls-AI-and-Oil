# Anthropic PBC v. Department of Defense et al.
## N.D. Cal. No. 3:26-cv-01996

---

## Case Profile

| Field | Value |
|-------|-------|
| Case | Anthropic PBC v. Dep't of Defense et al. |
| Docket | 3:26-cv-01996 |
| Court | U.S. District Court, N.D. Cal. (San Francisco) |
| Filed | March 2026 |
| Status | Active — motion to dismiss pending |
| Key Issue | Whether the Fable/Mythos directive's cyber-predicate extension of EAR jurisdiction to AI model weights is lawful |

---

## Background

The Fable/Mythos directive (June 2026) was issued under IEEPA authority in response to the July 2026 agentic AI incidents. It extended EAR jurisdiction to AI model weights and agentic systems on the theory that:

1. An AI model that demonstrably enables cyber intrusion constitutes "intrusion software" or equivalent dual-use technology under Wassenaar CCIC controls
2. The US developer of that model had "reason to know" of the intrusion risk
3. Therefore, the model's export (including via API to foreign nationals) constitutes a licensable transaction under the EAR

Anthropic challenged this extension on four grounds.

---

## Legal Claims

### Count I: Administrative Procedure Act (APA) — Arbitrary and Capricious

**Argument:** BIS failed to provide notice and comment before imposing new ECCN designations on AI model weights via the directive. The cyber-predicate mechanism was not disclosed in the AI Diffusion Rule rulemaking record and constitutes a major rule requiring full APA notice-and-comment.

**Government response:** IEEPA emergency orders are not subject to APA notice-and-comment requirements when issued in response to a declared national emergency.

**Tension:** *MCI Telecomm. Corp. v. AT&T*, 512 U.S. 218 (1994) — agencies cannot make major policy changes through informal action; *Biden v. Nebraska*, 143 S. Ct. 2355 (2023) — major questions doctrine.

---

### Count II: First Amendment — Model Weights as Protected Speech

**Argument:** AI model weights are a form of expressive content — they encode the "knowledge" and "reasoning" of the model. Controlling the publication or transmission of model weights constitutes content-based speech restriction, subject to strict scrutiny.

**Precedent invoked:** *Bernstein v. DOJ*, 176 F.3d 1132 (9th Cir. 1999) — source code for encryption software is protected speech; export controls on source code are prior restraints subject to First Amendment scrutiny.

**Government response:** Model weights are functional items (like a machine), not expressive speech; *Bernstein* is distinguishable because source code can be read by humans and communicates ideas, while model weights are numerical parameters that require interpretation by specialized software.

**Tension:** This is a genuinely open question. As AI models become more capable, the distinction between "functional" and "expressive" content in model weights becomes increasingly difficult to maintain.

---

### Count III: Fifth Amendment Due Process

**Argument:** The directive imposed new export control obligations on Anthropic without prior notice, a meaningful opportunity to be heard, or any hearing. Due process requires at minimum notice and an opportunity to contest ECCN designations before they take effect.

**Government response:** Export control designations are national security determinations exempt from ordinary due process procedural requirements; *Mathews v. Eldridge* balancing favors government when national security is at stake.

---

### Count IV: Ultra Vires — IEEPA Limits

**Argument:** IEEPA grants the President authority over "any transaction in foreign exchange" and "any transfer of credit or payments." Using IEEPA to impose export controls on the *development* and *API deployment* of AI models — purely domestic activities — exceeds the statute's scope.

**Government response:** *Regan v. Wald*, 468 U.S. 222 (1984) — IEEPA broadly interpreted; post-*NFIB v. OSHA* precedents on major questions doctrine are distinguishable because national security falls within the IEEPA heartland.

---

## Significance

This case will determine whether:

1. Model weights receive First Amendment protection analogous to encryption source code
2. The cyber-predicate theory of export control jurisdiction is lawful
3. IEEPA can be used to impose export controls on purely domestic AI development activities
4. AI companies can seek pre-enforcement review of ECCN designations

A ruling in Anthropic's favor on Count II would create a First Amendment floor on AI export controls — the government would need to meet strict scrutiny (compelling interest, narrowly tailored) to restrict model weight publication. This would not eliminate export controls on AI, but it would require a more targeted and procedurally rigorous approach.

A ruling for the government on all counts would confirm broad executive authority to impose AI export controls via IEEPA with minimal procedural constraints.

---

## Litigation Tracker

| Date | Event | Status |
|------|-------|--------|
| 2026-03-01 | Complaint filed | Complete |
| 2026-03-15 | TRO application filed | Denied |
| 2026-04-01 | Government answer / MTD filed | Filed |
| 2026-05-01 | Anthropic opposition to MTD | Filed |
| TBD | Hearing on MTD | Pending |
| TBD | Discovery (if MTD denied) | Pending |

---

## Amicus Landscape

Anticipated amicus filings:
- **For Anthropic:** CCIA (Computer & Communications Industry Assoc.); EFF (Electronic Frontier Foundation); academic First Amendment scholars
- **For Government:** National Security community; defense-oriented think tanks; semiconductor equipment manufacturers (ironic alignment on the principle of broad EAR authority)

---

## References

- Complaint, Anthropic PBC v. DoD, No. 3:26-cv-01996 (N.D. Cal. Mar. 1, 2026)
- Fable/Mythos directive (Jun 2026)
- *Bernstein v. DOJ*, 176 F.3d 1132 (9th Cir. 1999)
- *Regan v. Wald*, 468 U.S. 222 (1984)
- IEEPA, 50 U.S.C. ch. 35
- AI Diffusion Rule IFR (Jan 15, 2025)
- pacer-tracker.json entry PACER-001
