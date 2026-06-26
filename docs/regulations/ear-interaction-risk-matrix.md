---
title: EAR Interaction Risk Matrix — Physical & Logical
description: >
  A structured reference mapping physical and logical AI-system interaction surfaces to
  their Export Administration Regulations (EAR) risk profiles and control measures.
  Informational and academic; not legal advice.
---

# EAR Interaction Risk Matrix — Physical & Logical

## Purpose & Scope

This page provides a structured reference for understanding how the Export Administration
Regulations (EAR) apply across the two principal interaction surfaces of AI systems: physical
(hardware, media, facility access, and in-person technology release) and logical (electronic,
intangible, and remote release of technology, software, and controlled outputs). It is intended
as an orientating framework for compliance and academic audiences, anchored in primary EAR
concepts, and should be read alongside the operative regulatory text at each date of use.
This resource is for informational and academic purposes only; it does not constitute legal
advice.

---

## Framework — Physical vs Logical and How It Maps to the EAR

The EAR regulates **exports**, **reexports**, and **in-country transfers** of items (commodities,
software, and technology) through a four-axis control structure: **item classification**
(what), **destination** (where), **end-user** (to whom), and **end-use** (for what purpose)
(15 CFR §§ 734.13–734.15; EAR Part 730).

For AI systems, the interaction surface divides naturally into two layers that map directly
onto EAR-defined release concepts:

**Physical interaction** involves tangible commodities (chips, appliances, printed materials)
and in-person access to hardware or technology. Physical release engages EAR controls on
commodity export/reexport (15 CFR § 734.13) and on the **tangible or visual release** of
controlled technology or source code — including in printed or diagrammatic form — to a
foreign person (15 CFR § 734.16; EAR Part 772, definitions of "technology" and "source code").

**Logical interaction** involves the **intangible, electronic release** of technology or source
code: API access, model-weight transfer, remote access, cloud-infrastructure workloads, and
telemetry egress. Intangible release triggers the same EAR technology controls and — critically
— the **deemed-export** rule: releasing controlled technology to a foreign person in the United
States is deemed an export to that person's country of nationality (15 CFR § 734.16(b)).

Both layers are subject to the same licence-requirement determination process (classify →
screen parties → screen destination → screen end-use → determine licence requirement or
exception), and both are subject to the recordkeeping obligations of EAR Part 762.

!!! info "Cross-references"
    For AI model-weight and advanced-IC control background, see
    [AI & Advanced Technology Export Controls](ai-advanced-tech-export-controls.md).
    For Foreign Direct Product Rule and extraterritorial reach, see
    [Extraterritorial Jurisdiction & Enforcement](extraterritorial-enforcement.md).
    For encryption and open-source software scope, see
    [Encryption & Open Source](encryption-open-source.md).

---

## Physical Interaction Risk Table

| Category | Interaction | Description | EAR Risk | Control Measure |
|---|---|---|---|---|
| **Hardware** | Advanced compute ICs / accelerators | Procurement, possession, transfer, or delivery of advanced integrated circuits (e.g. ECCN 3A090.a, 4A090.a, 3A001.z, 4A003.z) | Controlled commodity; potential worldwide or destination-specific licence requirement; storage and security obligations | Hardware inventory by serial number; supplier-authorisation verification; secure-facility and access controls; classification confirmation |
| **Media** | Removable media / appliances carrying weights or source code | Drives, sealed appliances, or shipped storage holding model weights or controlled source code | Tangible export or reexport of controlled technology or source code (15 CFR § 734.16; EAR Part 772) | Media-control policy; encryption at rest; chain of custody; pre-shipment technology classification and ECCN determination |
| **Edge / on-prem** | Models deployed on physical devices delivered to customers | Export or reexport of a device with embedded controlled technology or software | Export of commodity plus embedded technology; potential reexport at destination | Classification of device and embedded technology before shipment; end-user and destination screening; contractual end-use limitations |
| **Data centre** | Construction or operation of compute clusters abroad | Controlled items located and operated outside the US or by non-US persons | Items-abroad obligations; ongoing security and reporting requirements | Siting controls; documented security plan; access logging; jurisdiction analysis |
| **Travel** | Hand-carry of laptops or devices holding controlled technology | Device crossing a border, or access by a foreign person abroad | Export on border crossing; potential deemed export if accessed by a foreign national | Travel / clean-device policy; licence-exception analysis (e.g. TMP, EAR § 740.9); pre-travel classification review |
| **Documentation** | Printed or visually displayed technical material | Architecture diagrams, design documentation, or build specifications in tangible or visual form | Release of technology by visual inspection constitutes an export (15 CFR § 734.16(a)) | Document classification and marking; need-to-know access controls; secure handling and disposal |
| **Facility access** | Foreign-person physical access to controlled hardware or technology | On-site staff, contractors, or visitors accessing controlled items or technical data | Deemed export — release to a foreign person in the US is deemed an export to that person's country of nationality (15 CFR § 734.16(b)) | Visitor escort controls; nationality-based access reviews; Technology Control Plan (TCP) for regulated facilities |

---

## Logical Interaction Risk Table

!!! warning "Regulatory currency — AI model-weight controls"
    The January 2025 *Framework for Artificial Intelligence Diffusion* — which introduced
    ECCN 4E091 for closed-weight model weights, the AI model-weight Foreign Direct Product
    Rule, Licence Exception AIA, and the tiered country framework — was rescinded by BIS on
    13 May 2025 (90 FR 20865). BIS indicated it would issue a replacement rule and, in the
    interim, operates through guidance, a policy statement, and red-flag indicators, alongside
    the pre-existing advanced-computing IC controls (ECCN 3A090.a / 4A090.a), the Entity
    List, and Part 744 end-use controls. Any "weights as controlled technology" entry below
    must be read against the replacement rule's status at the date of use. Cross-reference the
    [AI & Advanced Technology](ai-advanced-tech-export-controls.md) page.

| Category | Interaction | Description | EAR Risk | Control Measure |
|---|---|---|---|---|
| **API — inference** | Inference API | Model access via prompt/response to a foreign person or from a controlled destination | Access may constitute an intangible release of controlled technology or controlled functionality (assess against current model-weight control status) | API gateway; geography-based access screening; role-based access controls (RBAC); restricted-party checks at registration and transaction |
| **API — batch** | Batch / high-volume API | High aggregate compute consumption by a single user or entity | Logical aggregation toward controlled compute thresholds; potential end-use red flag | Rate limits; compute caps; usage monitoring and anomaly detection |
| **API — fine-tuning** | Fine-tuning API | Model modification producing a derived or fine-tuned model | Derived-model classification question; potential transfer of controlled capability | Access restriction; classify derived model; assess whether derived model inherits parent's classification |
| **Model** | Weights download (electronic) | Network transfer of model weights to a foreign person or controlled destination | Intangible export of controlled technology (assess against current weights-control status — see caveat above); potential deemed export | Block or licence-gate download endpoints; egress controls; transaction logging; destination and party screening |
| **Model** | Distillation | Replicating a model's capabilities via its outputs (output-based knowledge transfer) | Indirect capability transfer; circumvention risk (EAR Part 764) | Output monitoring; rate and pattern limits; terms-of-service restrictions on distillation use |
| **Data** | Model outputs | Technical responses, generated artefacts, or structured outputs returned to a user | Intangible release of controlled information embedded in output | Output classification and filtering; logging; destination-based output controls where applicable |
| **Plugins — RAG** | Retrieval-augmented generation / internal-data access | Component reads internal technical or controlled data to augment model responses | Technical-data exposure; potential release of controlled source code or technology via model output | Data-source filtering; access segregation; plugin allowlisting |
| **Plugins — third-party** | Third-party integrations | Data or outputs egress to external services beyond the primary platform | Unlicensed release or exfiltration to third-party providers, potentially across jurisdictions | Vendor due-diligence; data-processing agreements; egress monitoring; jurisdiction analysis |
| **Remote access** | Remote access / screen-share | Foreign person views controlled technology, source code, or controlled outputs remotely | Deemed export by electronic or visual release (15 CFR § 734.16) | Session-level controls; nationality-based view restrictions; access logging; screen-share policy |
| **Cloud / IaaS** | Cloud or IaaS training and inference | Controlled workloads on third-party cloud infrastructure, potentially across multiple jurisdictions | De minimis and Foreign Direct Product Rule analysis (15 CFR § 734.9); provider-diligence obligations; subject-status determination | Jurisdiction analysis; region-locking controls; provider know-your-customer (KYC); documented de minimis / FDPR determination |
| **Identity** | Credential / API-key sharing | Keys or credentials shared across multiple persons or across borders | Uncontrolled access; potential unauthorised release to foreign persons | RBAC; least-privilege principle; key rotation; sharing-prohibition policy; monitoring |
| **Code** | Source-code transmission | Electronic transfer of controlled source code to a foreign person or controlled destination | Release of controlled source code constitutes an export (EAR Part 772; 15 CFR § 734.16) | Repository access controls; source-code classification; egress data-loss prevention (DLP) |
| **Telemetry** | Logs / telemetry egress | Interaction logs, traces, or telemetry leaving the primary processing environment | Controlled technical data or sensitive interaction data leakage to third parties or foreign persons | Log classification; retention and access controls; redaction of controlled content before egress |

---

## Cross-Cutting Controls (Both Layers)

The following controls apply irrespective of whether the interaction is physical or logical.
They derive from structural EAR obligations that attach at the transaction level, not the
transfer modality.

| Control | EAR basis | Notes |
|---|---|---|
| **Restricted-party screening** | EAR Parts 744, 764; EAR Supplement 4 to Part 744 (Entity List); Denied Persons List; Military End-User List | Screen at registration, transaction, and periodically for existing relationships. Includes SDN and foreign-sanctions lists via OFAC overlap |
| **Destination / embargo geofencing** | EAR Part 746; OFAC country-programme regulations | EAR Part 746 controls apply to embargoed and sanctioned destinations; OFAC prohibitions may be broader and apply in parallel |
| **End-use controls** | EAR Part 744 (WMD, military-intelligence, advanced-computing end-uses) | Advanced-computing end-use restrictions (§ 744.23) apply to specified chip-class items regardless of ECCN or licence requirement elsewhere |
| **Jurisdiction, de minimis, and FDPR analysis** | 15 CFR § 734.9 (FDPR); 15 CFR § 734.4 (de minimis) | Items produced abroad using US technology, software, or equipment may remain subject to the EAR. Applies to both physical (chip export) and logical (software/model transfer) contexts |
| **ECCN classification and CCATS** | EAR Part 730; Supplement 1 to Part 774 (CCL) | Self-classify items against the Commerce Control List; request a Classification Determination (CCATS) from BIS for uncertain classifications |
| **Licensing and licence-exception analysis** | EAR Parts 740–746 | Determine whether a validated licence, licence exception (e.g. TMP, ENC, APP), or NLR applies before each transaction |
| **Recordkeeping** | EAR Part 762 | Five-year retention of export-related records, including electronic transaction logs, API records, and access logs where these constitute export records |
| **Technical assistance as controlled technology** | EAR Part 772 (definition of "technology"); EAR § 734.16 | Providing instructions, training, or design assistance to a foreign person — including remotely — may constitute an export of technology |
| **Encryption controls** | EAR Category 5 Part 2; EAR Part 740 (Licence Exception ENC) | Encryption items and software have separate classification (5E002, 5D002) and licence-exception requirements. Cross-reference [Encryption & Open Source](encryption-open-source.md) |

---

## Regulatory-Currency Caveat

!!! warning "This page reflects sources available as at the date of last review"
    The EAR is amended frequently. ECCN classifications, licence requirements, entity-list
    entries, and policy statements change without notice. The January 2025 AI Diffusion Rule
    was rescinded on 13 May 2025; its replacement was not finalised as at 22 June 2026. Always
    verify current regulatory text at **[eCFR Title 15 Chapter VII](https://www.ecfr.gov/current/title-15/chapter-VII)**
    and **[bis.gov](https://www.bis.gov)** before taking any compliance action.

---

## Primary Sources

- **Export Administration Regulations (EAR), 15 CFR Parts 730–774**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C>

- **EAR Part 734 — Scope of the EAR (definitions of "export", "reexport", "in-country
  transfer", "deemed export", "technology", "source code")**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-734>

- **EAR Part 742 — Control Policy — CCL-Based Controls**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-742>

- **EAR Part 744 — End-User and End-Use Controls**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-744>

- **EAR Part 746 — Embargoes and Other Special Controls**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-746>

- **EAR Part 762 — Recordkeeping**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-762>

- **EAR Part 772 — Definitions of Terms**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-772>

- **Commerce Control List (CCL), Supplement 1 to Part 774**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-774/appendix-Supplement%20No.%201%20to%20Part%20774>

- **BIS — Deemed Export Policy Guidance and FAQs**
  — <https://www.bis.gov/licensing/deemed-exports>

- **BIS IFR 90 FR 4544 — AI Diffusion Rule (January 2025; rescinded 13 May 2025)**
  — Federal Register Vol. 90, No. 10, 15 Jan 2025 (historical reference only)

- **BIS — Rescission of AI Diffusion Rule (90 FR 20865, 13 May 2025)**
  — Federal Register Vol. 90, No. 92 (historical reference; replacement rule pending as at
  22 Jun 2026)

- **BIS — Consolidated Screening List**
  — <https://www.trade.gov/consolidated-screening-list>

---

## Disclaimer

This resource is for informational and academic purposes only and does not constitute legal
advice. All content is compiled exclusively from **publicly available sources** — official
government publications, regulatory texts, legislative materials, press releases, and
open-access analysis. No proprietary, confidential, subscription-only, or privileged material
is reproduced. Entries that could not be retrieved at the time of indexing are flagged
accordingly and based solely on publicly stated metadata. Always consult qualified
export-control and sanctions counsel before taking any compliance decision.
