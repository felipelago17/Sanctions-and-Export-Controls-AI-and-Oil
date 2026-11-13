# AI Diffusion Rule & ECCN 4E091 — "Rescinded" but Still in the CFR (status at Nov 2026)

Whether US export controls on AI model weights exist depends on which document is read. A May 2025 press release announced that the January 2025 AI Diffusion Rule was being rescinded and would not be enforced. No Federal Register document has removed the rule's text. In May 2026 the Government Accountability Office (GAO) said the rule remains legally in effect until Commerce completes a rulemaking. This page records the sequence and what it means for classification work.

> **Source status:** GAO decision B-337935 was read directly. The other points rest on law-firm commentary (Akin, Baker McKenzie, Kirkland, Morrison Foerster, Sheppard Mullin). The current text of the EAR was not checked; do that at the determination date. Not legal advice.

---

## Timeline

| Date | Event | Source |
|---|---|---|
| 13–15 Jan 2025 | AI Diffusion interim final rule published (90 FR 4544). Adds ECCN 4E091 for weights of certain advanced closed-weight models, a model-weights foreign direct product rule, and wider licence requirements for ECCNs 3A090.a and 4A090.a | Akin; Morrison Foerster; Sheppard Mullin |
| 12–13 May 2025 | Commerce/BIS press release announces rescission; enforcement officials told not to enforce the rule. BIS says a replacement rule will follow | Baker McKenzie; Kirkland |
| Jun 2025 | Commentary notes that BIS has not specifically addressed the status of the model-weights controls | Morrison Foerster |
| Feb–Mar 2026 | Draft replacement rule ("Redesigned Framework for Artificial Intelligence Diffusion") sent to OIRA, then withdrawn | Sheppard Mullin |
| 12 May 2026 | GAO decision B-337935: the planned rescission is not final action, but the non-enforcement directive is itself a "rule" under the Congressional Review Act; the AI Diffusion Rule "remains legally in effect" until rescinded by rulemaking | GAO |
| 12 Jun – 1 Jul 2026 | Commerce, by unpublished letter, requires licences before a developer's newest frontier models are made available to foreign persons; partially unwound by 1 July | Sheppard Mullin; see [Anthropic case page](2026-06-anthropic-fable-mythos-deemed-export.md) |
| Jul 2026 | A UAE-related rule (cited as 91 FR 43034) is described as the only Federal Register acknowledgment of the non-enforcement posture, and as covering chip controls only | Sheppard Mullin (not read directly) |

---

## What the GAO decision does and does not say

- **Does say:** the rule stays legally in effect until Commerce finishes a rescission rulemaking; Commerce itself told GAO the framework remains in the Code of Federal Regulations; the non-enforcement directive should have been submitted to Congress.
- **Does not say:** anything about ECCN 4E091 by name. It cites the rule's provisions at 15 CFR § 742.6(a)(6)(iii)(A), § 742.6(a)(13) and Supplement No. 5 to Part 740 as at 17 April 2026.
- **Practical reading:** text on the books, a public instruction not to enforce it, and no replacement yet.

---

## Implications

| Area | Position to take |
|---|---|
| **Classification memos** | Do not record "4E091 repealed" or "4E091 applies" without a date and a source. Record the CFR text at the determination date and the enforcement posture separately |
| **Contracts** | Weight-transfer and termination clauses should allocate the risk that enforcement resumes or a replacement rule arrives as an interim final rule without notice |
| **Limitation risk** | Non-enforcement is a policy, not an amendment. Conduct during the gap is not clearly protected if the policy changes |
| **Access controls** | The June 2026 letter shows that controls can attach to model access without any change to the CCL. Access architecture is the durable control |
| **UAE deployments** | US-origin compute and US-developed weights remain subject to this uncertainty regardless of local hosting; see [Compliance Clinic 03](../scenarios/2026-uae-inference-residency-fine-tuning.md) |

---

## Relevance to This Repository

- The [ECCN decision tree](https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil/blob/main/09_ECCN-Classification-Framework/agentic-ai-models-ECCN-decision-tree.md) and [Compliance Clinic 01](../scenarios/2026-uae-affiliate-deemed-export.md) assume the rule is in force. That matches the GAO reading of the legal text but not the enforcement posture; both should be read with this page.
- [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md) lists the January 2025 commentary; this page supplies what happened next.

---

## Sources

- GAO, B-337935 (12 May 2026): <https://www.gao.gov/assets/890/885758.pdf>
- Akin, "BIS Rescinds AI Diffusion Rule and Issues New Guidance": <https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/bis-rescinds-ai-diffusion-rule-and-issues-new-guidance>
- Baker McKenzie, "BIS Begins Rescinding AI Diffusion Rule…" (May 2025): <https://sanctionsnews.bakermckenzie.com/bis-begins-rescinding-ai-diffusion-rule-and-issues-guidance-on-huawei-ics-and-on-ics-and-commodities-used-to-train-ai-models/>
- Kirkland & Ellis, alert on the rescission (May 2025): <https://www.kirkland.com/publications/kirkland-alert/2025/05/bis-rescission-of-the-biden-administration>
- Morrison Foerster, "AI Diffusion Rule Out but BIS Increases Compliance Obligations for Companies" (17 Jun 2025): <https://www.mofo.com/resources/insights/250617-ai-diffusion-rule-out-but-bis-increases-compliance>
- J. Mallory, R. Whitten & J. Blanquart (Sheppard Mullin), "Choosing Between U.S. and Chinese AI Models: The Export Control Risks on Both Sides" (23 Jul 2026): <https://www.sheppard.com/insights/blogs/us-vs-chinese-ai-models-export-control-risks>

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources. Confirm current CCL entries, rule text, and snap-back status before any compliance decision.*
