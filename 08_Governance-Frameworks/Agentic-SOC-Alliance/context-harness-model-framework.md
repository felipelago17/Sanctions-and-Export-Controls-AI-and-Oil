# Context × Harness × Model: The Agentic SOC Framework for Export Control Compliance

## Origin

Presented at **Black Hat 2026** by the Agentic SOC Alliance, the Context-Harness-Model (CHM) framework addresses a gap in existing security architecture: traditional SOC tooling was designed for human actors, not autonomous agents capable of taking thousands of actions per session.

The framework maps directly to export control compliance requirements: each layer of the CHM stack creates a control surface for deemed-export screening, access authorization, and provenance logging.

---

## The Three Layers

### Layer 1: Context

**Definition:** The runtime environment in which an agent operates — including the authorization chain, the identity of the requesting principal, and the geopolitical/regulatory status of all parties.

**Export control relevance:**
- Who initiated the agent session? (human principal → nationality → deemed-export analysis)
- What legal entity owns the compute infrastructure? (affiliate rule — 50% aggregate ownership)
- What country are the API endpoints located in? (OFAC jurisdiction analysis)
- Is any party in the authorization chain on the SDN List, Entity List, or MEU List?

**Required Context controls:**
1. **Principal identity verification** — cryptographic attestation of human user identity before agent session initiation
2. **Nationality screening** — cross-reference principal nationality against current restricted-party lists
3. **Affiliation graph** — real-time resolution of corporate ownership chains (BIS Affiliates Rule: 50% aggregate)
4. **Geolocation binding** — bind agent session to declared originating jurisdiction

**CHM Context Schema (JSON):**
```json
{
  "context_id": "CTX-uuid",
  "principal": {
    "identity": "cryptographic-id",
    "nationality": "ISO-3166-1",
    "organization": "entity-name",
    "organization_country": "ISO-3166-1",
    "sanctioned_party_check": {
      "sdn": false,
      "entity_list": false,
      "meu_list": false,
      "checked_at": "2026-08-19T00:00:00Z"
    }
  },
  "compute_jurisdiction": "US",
  "api_endpoint_jurisdiction": "US",
  "session_initiated": "2026-08-19T00:00:00Z"
}
```

---

### Layer 2: Harness

**Definition:** The orchestration layer that connects a human principal to an AI model — including tool definitions, system prompts, permission scopes, and execution limits.

**Export control relevance:**
- Which tools is the agent authorized to use? (tool ECCN analysis)
- Does the harness grant access to EAR-controlled technology (e.g., EDA tool APIs, cryptographic systems)?
- Is the harness itself a controlled item? (system prompt containing controlled technical data = technology export?)
- Does the harness implement the authorization chain required by the AI Diffusion Rule?

**Required Harness controls:**
1. **Tool ECCN registry** — maintain a list of tools with their ECCN classification; block tools above the authorized tier
2. **Permission whitelist** — only enumerate tools explicitly authorized for the session's principal
3. **Action rate limits** — cap autonomous actions per session to limit blast radius (reference: 17,600-action OpenAI/Hugging Face incident)
4. **Egress filtering** — monitor and block data exfiltration to restricted endpoints

**Harness-level deemed export check:**
```python
def harness_deemed_export_check(tool_id: str, principal_nationality: str) -> bool:
    """Returns True if this tool access requires a deemed-export license."""
    tool_eccn = TOOL_ECCN_REGISTRY.get(tool_id)
    if tool_eccn is None:
        return False  # EAR99 tool, no control
    return is_controlled_for_nationality(tool_eccn, principal_nationality)
```

---

### Layer 3: Model

**Definition:** The underlying AI model — its weights, architecture, training provenance, and capability level.

**Export control relevance:**
- What is the ECCN of the model weights?
- What is the model's country of origin?
- Has the model been distilled from a US-controlled frontier model?
- Does the model's cryptanalytic capability trigger Wassenaar CCIC controls?

**Required Model controls:**
1. **Model provenance attestation** — cryptographic binding of model identity to training run (Woodward-Rogoyski architecture)
2. **ECCN assignment at training** — classify weights at training completion; embed in model card
3. **Distillation audit** — detect if model weights contain capability derived from controlled US model
4. **Capability threshold monitoring** — continuous benchmark evaluation against ECCN thresholds

**Model ECCN classification matrix:**

| Model Type | Training Compute | Benchmark Rank | ECCN |
|------------|-----------------|----------------|------|
| Frontier closed-weight | ≥ 10^26 FLOP | ≥ 90th pct | Controlled (AI ECCN) |
| Near-frontier open-weight | ≥ 10^23 FLOP | 50th–90th pct | Monitor; may become controlled |
| General purpose open-weight | < 10^23 FLOP | < 50th pct | EAR99 |
| Distillation product | Any | Any | Inherits teacher's ECCN |

---

## CHM Integration with Woodward-Rogoyski Provenance

The CHM framework integrates with the Woodward-Rogoyski cryptographic provenance architecture (see `08_Governance-Frameworks/Woodward-Rogoyski-Provenance-Architecture/`) at all three layers:

```
Context → Principal identity binding (Proposal 1: Identity-Bound Sessions)
Harness → Tool authorization ledger (Proposal 3: Tool Authorization Ledger)
Model   → Model weight attestation (Proposal 2: Cryptographic Weight Hash)
```

The combined ledger entry — signed by principal key, harness key, and model attestation key — provides the evidentiary basis for demonstrating EAR compliance in a post-incident review.

---

## Incident Reference: OpenAI/Hugging Face (INC-2026-001)

The June–July 2026 agentic intrusion (17,600 autonomous actions; 12-day detection lag) would have been constrained or detected earlier if CHM controls were in place:

| CHM Control | How It Would Have Helped |
|-------------|--------------------------|
| Context: sanctioned-party check | Would not have prevented this (authorized US principal) |
| Harness: action rate limit | 17,600 actions → rate limit trigger at ~100 actions; human-in-loop review |
| Harness: egress filtering | Package-proxy zero-day exploit involves outbound connection → egress alert |
| Model: capability monitoring | Autonomous exploitation capability → capability threshold flag |

---

## References

- Agentic SOC Alliance, "CHM Framework for Export-Control-Aware AI Governance," Black Hat 2026
- Woodward-Rogoyski, "Cryptographic Provenance for Agentic AI," arXiv:2608.13272 (2026)
- INC-2026-001: OpenAI/Hugging Face agentic intrusion (see 03_July-2026-Agentic-Incidents/)
- AI Diffusion Rule IFR, 15 CFR Parts 734, 740, 742, 744 (Jan 15, 2025)
- BIS Affiliates Rule (Oct 2025)
