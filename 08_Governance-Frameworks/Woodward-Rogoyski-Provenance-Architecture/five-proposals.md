# Woodward-Rogoyski Five Proposals: Cryptographic Provenance for Agentic AI

## Source

Woodward & Rogoyski, "Cryptographic Provenance for Agentic AI Systems in Export-Controlled Environments," arXiv:2608.13272 (2026). This document summarizes the five architectural proposals and their export control compliance implications.

---

## Background

Traditional export control compliance for software relied on static classification of a discrete item at a point in time. Agentic AI systems create a new compliance problem: the "item" is dynamic, distributed, and stateful — a model interacting with tools, principals, and data across sessions that may span jurisdictions and time zones.

The Woodward-Rogoyski architecture addresses this by treating an agentic session as a **provenance chain** — a cryptographically-bound sequence of actions, each anchored to a verified identity and a classified model weight.

---

## Proposal 1: Identity-Bound Sessions

**Problem:** Export control compliance requires knowing who is accessing controlled technology. Agentic systems can be invoked by machine-to-machine calls that obscure the human principal.

**Solution:** Every agentic session must carry a **cryptographically-signed principal identity assertion**, issued at session initiation and carried through all downstream tool calls and sub-agent invocations.

**Technical specification:**
- Session token includes: principal identity hash, nationality assertion, organization, timestamp
- Token signed with principal's private key; public key registered with a compliance authority
- Sub-agents inherit the originating principal's token; cannot elevate to a higher-privilege identity
- Token verified at each tool call entry point

**Export control mapping:** Implements the deemed-export screening requirement of 15 CFR §734.13 at the session layer rather than at the application layer.

---

## Proposal 2: Cryptographic Weight Hash

**Problem:** Model weights are the "item" subject to ECCN classification, but weights can be fine-tuned, distilled, or modified. How does a compliance system verify that the model being used is the classified model?

**Solution:** At training completion, compute a **cryptographic hash of model weights** (SHA-3-512 recommended) and embed it in a signed **Model Provenance Certificate** (MPC):

```
MPC fields:
  - model_id: canonical identifier
  - weight_hash: SHA3-512 of full weight tensor
  - training_flop: total FP8 training compute
  - training_dataset_fingerprint: Merkle root of training data manifest
  - eccn: BIS-assigned classification
  - eccn_rationale: benchmark scores supporting classification
  - issuer: lab identity (signed by lab's BIS-registered key)
  - issued_at: RFC3339 timestamp
  - valid_until: expiry date (re-classification trigger)
```

**Export control mapping:** Provides the evidentiary basis for ECCN classification at the model layer. Enables detection of distillation attacks by comparing capability-to-hash relationship against expected MPC.

---

## Proposal 3: Tool Authorization Ledger

**Problem:** Agentic systems can be granted access to a wide range of tools, some of which may themselves be EAR-controlled (e.g., EDA software, cryptographic APIs). Tool access changes the deemed-export surface of the session.

**Solution:** A **Tool Authorization Ledger (TAL)** that:
1. Maintains an ECCN classification for each tool in the environment
2. Requires explicit authorization grant for any tool above EAR99
3. Records each tool invocation with principal identity, timestamp, and input/output hash
4. Generates a signed audit trail for compliance review

**TAL Schema:**
```json
{
  "tool_id": "eda-api-v2",
  "eccn": "3D001",
  "authorization_required": true,
  "authorized_principals": ["principal-hash-1"],
  "invocations": [
    {
      "timestamp": "2026-08-19T10:00:00Z",
      "principal_hash": "principal-hash-1",
      "input_hash": "sha3-512-of-input",
      "output_hash": "sha3-512-of-output",
      "deemed_export_flag": false
    }
  ]
}
```

---

## Proposal 4: Jurisdiction-Aware Routing

**Problem:** Agentic systems may invoke tools or sub-agents hosted in multiple jurisdictions. A tool invocation that routes through a D:1 country's infrastructure may constitute an unauthorized re-export even if the human principal is in the US.

**Solution:** A **Jurisdiction Router** that:
1. Resolves the physical hosting location of each tool endpoint
2. Maps hosting location to EAR country tier
3. Blocks or flags invocations where tool routing creates a D:1 transit path
4. Logs all cross-border invocations with OFAC/BIS risk score

**Application to cloud infrastructure:** Multi-cloud deployments with auto-failover can inadvertently route controlled workloads through restricted jurisdictions. Proposal 4 requires static jurisdiction pinning for controlled AI sessions.

---

## Proposal 5: Continuous Re-Classification Trigger

**Problem:** A model's ECCN classification is assigned at a point in time, but model capabilities can evolve through: fine-tuning, RLHF, capability elicitation research, or external discoveries (e.g., jailbreaks that unlock previously-inaccessible capabilities).

**Solution:** A **Re-Classification Trigger** system that:
1. Monitors standardized capability benchmarks on a rolling basis
2. Flags if model scores cross an ECCN threshold
3. Automatically escalates ECCN and notifies BIS (under voluntary disclosure best practices)
4. Suspends API access pending BIS review if threshold is crossed

**Triggered by:**
- New benchmark results exceeding ECCN threshold
- Published research demonstrating previously-unknown model capability
- Post-incident capability analysis revealing undisclosed capability

**Relevance to INC-2026-003 (Mythos cryptanalysis):** HAWK-256 key recovery and 7-round AES-128 acceleration were not anticipated capabilities at model release. Proposal 5 would have triggered a re-classification review when the cryptanalytic capability was discovered, before operational exploitation.

---

## Implementation Maturity Levels

| Proposal | Implementation Difficulty | Industry Readiness (2026) | BIS Guidance |
|----------|--------------------------|--------------------------|--------------|
| 1. Identity-Bound Sessions | Medium | OIDC/OAuth foundation exists | None yet |
| 2. Weight Hash | Low (technical) / High (standardization) | Model cards exist; hashes not standard | None yet |
| 3. Tool Authorization Ledger | Medium | RBAC patterns applicable | None yet |
| 4. Jurisdiction-Aware Routing | High (infra changes required) | Cloud providers not aligned | None yet |
| 5. Re-Classification Trigger | High (BIS engagement required) | Benchmark infrastructure exists | Voluntary disclosure guidance |

---

## Relationship to the AI Diffusion Rule

The Woodward-Rogoyski proposals operationalize compliance obligations that the AI Diffusion Rule establishes at the policy level but does not specify technically:

| AI Diffusion Rule Obligation | Woodward-Rogoyski Proposal |
|------------------------------|---------------------------|
| Authorization requirement for Tier 2 access | Proposal 1 (Identity-Bound Sessions) |
| Model weight classification | Proposal 2 (Cryptographic Weight Hash) |
| Tool/technology access control | Proposal 3 (Tool Authorization Ledger) |
| Re-export jurisdiction control | Proposal 4 (Jurisdiction-Aware Routing) |
| Evolving capability monitoring | Proposal 5 (Continuous Re-Classification) |

The schema at `13_Scripts-Utilities/json-schemas/provenance-ledger.schema.json` implements the combined ledger record format.

---

## References

- Woodward & Rogoyski, arXiv:2608.13272 (2026)
- AI Diffusion Rule IFR, 15 CFR Parts 734, 740, 742, 744 (Jan 15, 2025)
- INC-2026-003: Mythos cryptanalysis (see 03_July-2026-Agentic-Incidents/incidents-index.json)
- CHM Framework (see 08_Governance-Frameworks/Agentic-SOC-Alliance/)
- BIS Voluntary Self-Disclosure guidance, 15 CFR §764.5
