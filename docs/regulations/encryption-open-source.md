# Encryption Controls, Open Source & EAR Scope

Encryption items have their own licensing and reporting framework under EAR Part 742.15
and Supplement No. 3 to Part 740. Many AI and software products incorporate encryption,
making these rules directly relevant to developers and cloud providers. Open-source software
raises distinct questions about EAR applicability that are frequently misunderstood. This
page provides an analytical reference on both topics. It is for informational and academic
purposes only and does not constitute legal advice.

---

## Purpose & Scope

Encryption export controls operate as a **specialised overlay** on the broader EAR framework.
Items with encryption functionality are classified under ECCNs 5D002, 5E002, or 5A002 (and
related "z" subcategories for hardware), and are subject to licensing requirements under
Part 742.15 that differ from — and in some cases are more permissive than — the general
licence-requirement structure for other controlled items. The key relief mechanism is Licence
Exception ENC (15 CFR § 740.17), which provides a conditional path to export without a
validated licence.

For open-source software, EAR § 734.7 provides that technology or software that has been
**made available to the public** in the manner specified is not subject to the EAR — but the
conditions for this exclusion are narrower than commonly assumed.

---

## Encryption Classification

### ECCN 5D002 and 5E002

Software that provides encryption functionality — including implementations of symmetric
or asymmetric cryptography, key management, authentication, and digital-signature algorithms
— is generally classified under **ECCN 5D002** (software) or **ECCN 5E002** (technology).
Hardware with encryption functionality falls under **ECCN 5A002**.

The control parameters focus on **key length and algorithm**, but virtually all modern
cryptographic implementations (AES-128+, RSA-2048+, ECDH, TLS 1.2+) fall within controlled
ranges. In practice, classification under 5D002/5E002 is the default starting point for any
software incorporating standard cryptographic libraries (OpenSSL, BoringSSL, LibreSSL, GnuTLS,
etc.) unless a specific exclusion or exception applies.

### AI and Model Encryption

AI systems use encryption pervasively:

- **Model-weight storage and transmission** — weights encrypted at rest and in transit
- **API authentication** — TLS/HTTPS for API endpoints
- **Inference endpoints** — TLS termination at the inference layer
- **Federated learning** — cryptographic aggregation protocols
- **Confidential computing** — hardware-level memory encryption (e.g. AMD SEV, Intel TDX)

Each layer that implements cryptographic functionality may independently require classification
analysis. A model distributed in an encrypted container image, served over TLS, with encrypted
API keys, involves multiple distinct encryption items.

!!! note "Encryption scope is item-level, not system-level"
    Each software component or library that provides encryption functionality is classified
    separately. Bundling an uncontrolled AI model with a controlled encryption library does
    not make the model controlled — but it does mean the bundle as a whole requires
    encryption-controls analysis before export.

---

## Licence Exception ENC (§ 740.17)

Licence Exception ENC provides the primary path to export encryption items without a
validated licence. It contains two main categories:

### ENC — Unrestricted Destinations (§ 740.17(a))

Items that qualify as **mass-market** encryption products may be exported to most destinations
without a licence, subject only to annual self-classification reporting. Mass-market items
are those that:

- are widely available from multiple sources in retail channels
- incorporate encryption that is not usable by the purchaser for customisation
- target a general-purpose, non-encryption-specific consumer function

Most commercial SaaS platforms, web browsers, messaging applications, and general-purpose
operating systems incorporating standard TLS/AES functionality can qualify under the mass-
market criteria, though the determination is fact-specific.

### ENC — Government End-Users and Licence Review (§ 740.17(b))

Export of 5D002/5E002 items to **government end-users** in most destinations requires a
30-day licence review under § 740.17(b)(2). Non-government end-users in most countries can
receive these items under § 740.17(b)(1) with annual reporting, subject to country
restrictions (Cuba, Iran, North Korea, Sudan, Syria, and Russia/Belarus under sanctions-
related controls).

!!! warning "Government end-user scope"
    'Government end-user' for § 740.17(b) purposes includes national, state/provincial, and
    local government agencies and their contractors acting in an official capacity. AI
    deployments to public-sector counterparties require government-end-user licence review
    even where the software would otherwise qualify for ENC exception.

---

## Annual Self-Classification Reporting

Exporters relying on Licence Exception ENC must file an **annual self-classification report**
with BIS by 1 February each year, covering all eligible encryption items exported or
transferred (in-country) in the prior calendar year. The report is filed through the BIS
Simplified Network Application Reengineered Re-Design (SNAP-R) system.

Key reporting obligations:

- **Report all ENC-eligible items** exported during the prior year, including SaaS products,
  software downloads, and API-delivered services
- **Report each distinct product** — bundling multiple encryption products into a single line
  item is not permissible
- **Mass-market items (§ 740.17(a))** are reported annually; **non-mass-market items
  (§ 740.17(b))** require a 30-day review before initial export plus annual reporting
- Cloud/SaaS providers delivering encrypted services to foreign users have ongoing reporting
  obligations even where no physical export occurs

---

## Open-Source Software and the Publicly Available Exclusion

### The EAR § 734.7 Exclusion

EAR § 734.7 provides that technology or software is not subject to the EAR if it has been
**made available to the public** in specified ways: through unlimited distribution on the
internet, sale at a retail kiosk, or unrestricted availability from a library or publication,
without restriction on further dissemination.

For encryption software specifically, **EAR § 742.15(b)** creates an additional path: open-
source cryptographic software is not subject to EAR licensing requirements **if it has been
publicly posted** in a manner accessible to the general public and BIS and the ENC Encryption
Request Coordinator have been notified of its internet location.

### Notification Requirement

The BIS notification requirement under § 742.15(b) is a condition precedent to relying on
the open-source encryption exclusion. An open-source project that incorporates encryption
and is posted publicly **must notify BIS** before export (or at the time of first public
posting) by emailing the URL to crypt@bis.gov and enc@nsa.gov. This notification is a one-
time requirement per project (updated notification required if the URL changes materially).

Many open-source projects — including AI frameworks that incorporate TLS, cryptographic
hashing, or secure random-number generation — fail to make this notification and thereby
operate outside the exclusion without realising it.

### What the Exclusion Does NOT Cover

The publicly available exclusion and § 742.15(b) do not exempt:

- Open-source software **combined with proprietary components** that restrict redistribution
- Software posted publicly but with **access controls** (login-required repositories)
- Software developed with **US government funding** under classified programmes
- Software whose **source code** is available but whose **compiled binaries** are restricted

A GitHub repository with public source code but a "non-commercial use only" licence is
not "available to the general public without restriction" for EAR purposes.

---

## Encryption Controls and AI Model Weights

The intersection of encryption controls and AI model-weight export is an emerging compliance
question, particularly where:

1. **Weights are distributed in encrypted containers** — the encrypted container may itself
   be a 5D002 item if it implements encryption for the purpose of controlling access
2. **Inference APIs use novel cryptographic schemes** (e.g. homomorphic encryption for
   private inference) — these may fall under controlled ranges
3. **Confidential AI** (hardware-level memory encryption during inference) — hardware-level
   encryption in the inference accelerator may trigger 5A002 classification

!!! warning "Regulatory currency — model-weight controls"
    The January 2025 AI Diffusion Rule (which introduced ECCN 4E091 for model weights) was
    rescinded on 13 May 2025. Encryption controls under Category 5 Part 2 continue to apply
    independently of the model-weight control status. Do not conflate the two regimes.
    Cross-reference [AI & Advanced Technology Export Controls](ai-advanced-tech-export-controls.md).

---

## Practical Compliance Workflow

1. **Classify each encryption component.** Identify all libraries, modules, and protocols
   implementing cryptographic functionality. Default starting point: ECCN 5D002 (software)
   or 5A002 (hardware). Confirm mass-market eligibility if claiming § 740.17(a).

2. **Determine applicable exception or licence.** Most commercial encryption items qualify
   under Licence Exception ENC. Government end-users require 30-day review under
   § 740.17(b)(2).

3. **File annual self-classification report.** By 1 February each year via SNAP-R. Maintain
   a product register to ensure completeness.

4. **Notify BIS for open-source encryption.** If publishing open-source software with
   encryption, send URL notification to crypt@bis.gov and enc@nsa.gov before or at first
   publication.

5. **Assess encryption controls separately from other CCL classifications.** An AI model
   may be EAR99 for its core functionality but require 5D002 analysis for its encryption
   layer. Both analyses are required; neither substitutes for the other.

6. **Document and retain records.** EAR Part 762 applies; retain classification records,
   annual report filings, and BIS notification correspondence.

---

## Primary Sources

- **EAR § 734.7 — Publicly available technology and software**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-734/section-734.7>

- **EAR § 740.17 — Licence Exception ENC**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-740/section-740.17>

- **EAR § 742.15 — Encryption controls**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-742/section-742.15>

- **EAR Supplement No. 3 to Part 740 — ENC reporting requirements**
  — <https://www.ecfr.gov/current/title-15/chapter-VII/subchapter-C/part-740/appendix-Supplement%20No.%203%20to%20Part%20740>

- **BIS — Encryption items not subject to the EAR**
  — <https://www.bis.gov/encryption>

- **BIS SNAP-R — Annual self-classification reporting portal**
  — <https://snapr.bis.gov>

- **CCL ECCN 5D002 (encryption software)**
  — Supplement No. 1 to Part 774, Category 5 Part 2

- **Baker McKenzie — BIS Updates Reporting Requirements for Mass-Market Encryption &
  Publicly Available Software**
  — <https://sanctionsnews.bakermckenzie.com/bis-updates-reporting-requirements-relating-to-mass-market-encryption-items-and-publicly-available-software-and-also-updates-certain-classifications/>

---

*Last reviewed: June 2026*

---

## Disclaimer

This resource is for informational and academic purposes only and does not constitute legal
advice. All content is compiled exclusively from **publicly available sources** — official
government publications, regulatory texts, legislative materials, press releases, and
open-access analysis. No proprietary, confidential, subscription-only, or privileged material
is reproduced. Always consult qualified export-control and sanctions counsel before taking
any compliance decision.
