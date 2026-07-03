---
title: Inchoate Provisions in EAR Enforcement — § 764.2 Application
description: >
  Application of attempt, conspiracy, solicitation, aiding/abetting, and evasion
  provisions at 15 CFR § 764.2 in export control enforcement, with parallel criminal
  tracks and case-type analysis. Informational; not legal advice.
---

# Inchoate Provisions in EAR Enforcement

*Attempt, conspiracy, solicitation, aiding/abetting, and evasion under 15 CFR § 764.2.*

---

!!! info "Cross-references"
    For the knowledge standard underlying these provisions, see [High-Probability Knowledge Standard](high-probability-standard.md).
    For how agencies construct knowledge chains, see [Knowledge Inference Pathways](knowledge-inference-pathways.md).
    For GPU smuggling cases where these provisions are frequently invoked, see [GPU Smuggling Case Summaries](../case-summaries/gpu-smuggling/index.md).

---

## I. The § 764.2 Violations Framework

Section 764.2 of the EAR establishes the full catalogue of civil violations. Unlike most regulatory frameworks that focus on completed substantive violations, § 764.2 contains a rich set of inchoate provisions that extend liability to conduct that precedes or facilitates a completed export.

| Provision | Conduct | Knowledge requirement |
|---|---|---|
| **§ 764.2(a)** | Substantive violation: export, reexport, or transfer without required licence | "Knows" (§ 772.1) |
| **§ 764.2(b)** | Conspiracy: agreement to violate or cause a violation | Knowledge of the agreement + intent |
| **§ 764.2(c)** | Solicitation: request that another commit a violation | Intent that the violation occur |
| **§ 764.2(d)** | Attempt: taking a substantial step toward a violation | Intent to complete the violation |
| **§ 764.2(e)** | Aiding and abetting: assist or facilitate a violation | Knowledge that a violation is occurring or will occur |
| **§ 764.2(f)** | Acting with knowledge of a violation: order, buy, remove, conceal, store or transport goods in violation | "Knows" (§ 772.1) |
| **§ 764.2(g)** | Misrepresentation / false statements: cause or attempt to cause the issuance of a licence through false statements | Knowledge of falsity or reckless disregard |
| **§ 764.2(h)** | Evasion: solicit, pay, or accept with intent to evade or take actions that evade EAR | Intent to evade |

---

## II. Conspiracy — § 764.2(b)

### Elements

A conspiracy under § 764.2(b) requires:

1. An agreement between two or more parties
2. To violate the EAR or cause another to violate it
3. An overt act in furtherance of the agreement

The agreement need not be formal or written. BIS has found conspiracies based on: series of coordinated transactions; shared entity-shifting structures; parallel false documentation practices among co-conspirators; and structured payment arrangements designed to obscure the nature of a transaction.

### Application — GPU Smuggling Supply Chains

GPU smuggling conspiracies typically involve at minimum:

- A **procurer** (sourcing entity, often US-based or with US connections, purchasing from NVIDIA or similar)
- A **transshipment intermediary** (freight forwarder or shell company in a neutral jurisdiction)
- An **end-user** (typically in China or another controlled country)

Each party in this chain may face conspiracy liability even if:
- The procurer never physically touched the chips after export
- The intermediary claims it did not know the final destination
- The end-user was not named in the original export documentation

The conspiracy is established at the level of the agreement to circumvent controls, not at the level of any individual transaction.

### Parallel Criminal Track

DOJ-NSD charges conspiracy under 18 USC § 371 (conspiracy to commit an offence against the United States) in parallel with or in lieu of ECRA criminal charges. The § 371 standard requires the government to prove: (1) the existence of an agreement, (2) knowing and voluntary participation, and (3) an overt act. The maximum penalty is 5 years imprisonment — lower than the ECRA criminal maximum (20 years), but easier to prove because "willfulness" (required under ECRA § 1760) does not need to be established separately from the agreement.

---

## III. Attempt — § 764.2(d)

### Elements

Attempt requires:

1. Intent to commit a complete EAR violation, and
2. A substantial step toward completing it

The "substantial step" standard is drawn from the Model Penal Code and has been broadly interpreted in EAR enforcement to include:

- Placing an order for controlled items with the intent to divert them
- Completing an AES (Automated Export System) filing with false end-user information
- Arranging shipping or logistics for a controlled shipment before the physical export
- Paying for controlled items prior to export

### What Attempt Covers That Substantive Violations Do Not

Attempt liability captures:

- Transactions intercepted by law enforcement or customs before the item leaves US territory
- Transactions where the controlled item was seized in transit before reaching the prohibited end-user
- Sting operations where the controlled item was never actually shipped

In GPU smuggling enforcement, attempt charges are commonly used where law enforcement intercepts a shipment at a US port of export. The physical possession of the chips by a transshipment intermediary at the time of interception, combined with export documentation listing a prohibited end-user, satisfies the substantial step requirement.

---

## IV. Solicitation — § 764.2(c)

### Elements

Solicitation requires:

1. A request, instruction, or inducement directed at another person
2. With intent that the other person commit an EAR violation

Unlike conspiracy, solicitation does not require the other person to agree or act. A single communication requesting a violation is sufficient.

### Practical Application

Solicitation is typically charged as a secondary count alongside conspiracy or attempt. It is most commonly seen in:

- **Procurement cases:** A Chinese entity (or its US intermediary) that instructs a US exporter to falsify end-use certificates or route shipments through third-country intermediaries to avoid export controls
- **Broker and agent arrangements:** A foreign principal that instructs a US broker to procure controlled items without disclosing the true end-user
- **Internal corporate direction:** A senior executive who directs compliance staff to approve transactions that the staff knows (or should know) require a licence

---

## V. Aiding and Abetting — § 764.2(e)

### Elements

Aiding and abetting under § 764.2(e) requires:

1. Knowledge that a violation of the EAR has occurred or is about to occur, and
2. Assistance or facilitation that contributes to the violation

The knowledge standard here is the § 772.1 "knows" definition — including the high-probability pathway. An entity that provides logistics, financing, or documentation to a transaction that the entity was aware at a high probability was a violation faces aiding and abetting liability.

### Key Application Scenarios

**Freight forwarders:** A freight forwarder that handles export documentation for a controlled shipment, observes multiple Supplement 3 red flags, and proceeds without inquiry faces aiding and abetting liability for any violation that results. The forwarder need not know the precise destination or end-user — high-probability awareness of a violation suffices.

**Financial intermediaries:** A bank or payment processor that processes payments for controlled transactions where the payment structure is inconsistent with legitimate trade (circular payments, over-invoicing, payments through Entity List-adjacent parties) may face aiding and abetting liability under § 764.2(e) in parallel with Bank Secrecy Act exposure.

**Technology providers:** An entity that provides software, tooling, or services that facilitate an export violation — where it was aware at a high probability that its contribution would be used in a violation — may be charged even where it did not directly participate in the export.

### Distinction from Conspiracy

Aiding and abetting does not require proof of an agreement. It is a lower-threshold provision covering parties that contribute to a violation without necessarily being co-conspirators. In GPU smuggling cases, peripheral intermediaries (logistics agents, testing labs, warehouse operators) are more commonly charged with aiding and abetting than conspiracy.

---

## VI. Evasion — § 764.2(h)

### Elements

Evasion is the most broadly worded provision in § 764.2:

> No person may engage in any transaction or take any other action with intent to evade the provisions of the EAR or an order, licence, licence exception, or other authorization issued thereunder.

The provision applies to any transaction or action — it is not limited to exports, reexports, or transfers. It captures:

- Structuring transactions into below-threshold shipments to avoid ECCN triggers
- Substituting item descriptions on export documentation
- Using shell companies or nominees to obscure the true party to a transaction
- Providing false information to a freight forwarder or EAR-regulated party

### Evasion and Entity-Shifting

"Subsidiary entity shifting" — the establishment of new legal entities in third countries to serve as fronts for transactions that would otherwise require a licence — is the paradigmatic evasion scenario. BIS has consistently treated the establishment of a shell structure as evidence of evasive intent even where individual transactions through the shell, evaluated in isolation, might not independently trigger licence requirements.

!!! note "Evasion and the knowledge standard"
    Evasion requires "intent to evade" — an element of purpose beyond the § 772.1 "knows" standard. BIS must establish that the respondent acted with the purpose of circumventing the EAR, not merely that they were aware of a high probability that a violation would occur. In practice, this intent is usually inferred from the structure of the transaction (shell entities, false documentation, unusual routing) rather than from direct evidence of intent.

---

## VII. Parallel Civil and Criminal Tracks

BIS (civil) and DOJ-NSD (criminal) frequently pursue parallel enforcement tracks in major cases. Understanding how the tracks interact:

| Feature | BIS Civil Track | DOJ Criminal Track |
|---|---|---|
| Standard of proof | Preponderance of evidence | Beyond reasonable doubt |
| Knowledge element | § 772.1 "knows" (includes high-probability) | "Willfully" (ECRA § 1760) or specific intent (§ 371) |
| Maximum penalty | $364,992/violation (2025); 2× transaction value | $1M/violation; 20 years imprisonment |
| Timing | Can proceed in parallel with criminal | May include tolling request to BIS |
| Settlement | Charging letter + civil penalty + compliance order | Deferred prosecution or plea + criminal fine |
| Collateral consequences | Denial order; temporary denial; Entity List addition | Debarment; corporate monitor; corporate guilty plea |

**Tolling and sequencing:** DOJ-NSD may request that BIS toll the statute of limitations on civil proceedings while criminal prosecution is pending, to avoid civil discovery being used to undermine the criminal case. This is a frequent complication in multi-defendant GPU smuggling prosecutions.

**Corporate vs. individual liability:** In criminal enforcement, DOJ increasingly targets individual executives alongside the corporate entity — particularly where the corporate entity is foreign (and thus difficult to enforce against) and individuals have US connections that support personal jurisdiction.

---

## VIII. Application in Contemporary Enforcement Categories

### GPU Smuggling

The inchoate provisions map onto GPU smuggling conspiracies as follows:

- **Procurer** (US entity/person): § 764.2(a) (substantive), § 764.2(b) (conspiracy), § 764.2(h) (evasion for structuring through shell entities)
- **Transshipment intermediary**: § 764.2(e) (aiding and abetting), § 764.2(b) (conspiracy if agreement established)
- **Documentation falsifier**: § 764.2(g) (false statements), § 764.2(h) (evasion)
- **End-user**: § 764.2(f) (acting with knowledge of violation), § 764.2(b) (conspiracy)

### Semiconductor Manufacturing Equipment Cases

Equipment cases typically involve:

- **Manufacturer's distributor**: § 764.2(a) or § 764.2(d) (attempt where shipment is intercepted)
- **False end-user certificate issuer**: § 764.2(g) (misrepresentation)
- **Freight forwarder**: § 764.2(e) (aiding and abetting for routing through controlled jurisdiction)

### Subsidiary/Entity Shifting Cases

Entity shifting cases centre on § 764.2(h) (evasion) and § 764.2(b) (conspiracy):

- The establishment of the shell entity is the overt act
- The direction to use the shell entity for controlled transactions is evidence of agreement (conspiracy)
- The use of the shell entity's name in place of the restricted party's name on documentation is evasion

---

## IX. Primary Sources

| Source | URL |
|---|---|
| 15 CFR § 764.2 — Violations | <https://www.ecfr.gov/current/title-15/section-764.2> |
| 50 USC § 4819 (ECRA) — Civil penalties | <https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title50-section4819> |
| 50 USC § 4820 (ECRA) — Criminal penalties | <https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title50-section4820> |
| 18 USC § 371 — Conspiracy against the United States | <https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title18-section371> |
| DOJ NSD Export Controls prosecutions | <https://www.justice.gov/nsd/export-control-and-sanctions> |
| BIS Export Enforcement charging letters | <https://www.bis.gov/enforcement/charging-letters> |

---

*Informational and academic use only; not legal advice. Compiled from publicly available sources.*
