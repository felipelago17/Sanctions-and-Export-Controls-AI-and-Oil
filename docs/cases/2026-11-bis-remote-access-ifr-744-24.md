# BIS Interim Final Rule on Remote Access to Advanced Semiconductors — New § 744.24, Five-Country Licence Requirement, AI Diffusion Rescission (RIN 0694-AK50, November 2026)

On **16 November 2026** the Bureau of Industry and Security (BIS) released an interim final rule (IFR), RIN **0694-AK50**, "Addressing Remote Access to Advanced Semiconductors". The BIS press release is headed "BIS Issues Rule Addressing Remote Access to American Super Intelligence Technology". It says the IFR was written by and at the direction of the Department of the Treasury and the National Security Council, and that it is designed to ensure existing restrictions on sensitive US technology cannot be circumvented through remote computing arrangements involving data centres in third countries.

This is the rule the repository has been anticipating: it converts the "access as the export" thesis into EAR text. It adds an **end-use control on data-centre compute** serving China- and D:5-headquartered customers, imposes a **destination-based licence requirement for five Southeast Asian and Latin American hubs**, and **formally rescinds the January 2025 AI Diffusion Rule**.

> **Source and verification status:** The press release (BIS, 16 Nov 2026) is a primary source. The rule detail below is taken from the BIS "display copy" of the IFR (`rin-0694-ak50.pdf`), which on its face is a **pre-publication draft**: it has no Federal Register citation, and effective-date, comment-date and docket fields are placeholders. The draft contains internal inconsistencies (see below) and the portion reviewed for this note was the first part of a longer document. Treat section numbers, thresholds and dates as **provisional until the Federal Register text is published**. Some secondary outlets date the release 15 November; the BIS press release itself is dated 16 November. *Update 18 Nov 2026:* a Paul Hastings client alert (17 Nov) says Federal Register publication was expected on **19 November 2026**, with the rule effective on publication; section numbers and dates below should be re-checked against that text. The alert is secondary commentary (see the practitioner-commentary section).

---

## Key Provisions (per the BIS display copy)

| Element | Provision |
|---|---|
| **New § 744.24 — data-centre end-use control** | Licence required to export, reexport or transfer (in-country) listed items with **knowledge** they are destined for a data centre providing access to **more than 12,000,000 aggregate TPP** (single site or "linked data centres") to or for companies headquartered in, or with an ultimate parent in, **Macau or Country Group D:5** |
| **Covered items** | ECCNs 3A001.z; 3A090 (except .c); 4A003.z, 4A004.z, 4A005.z; 4A090; 5A002.z, 5A004.z, 5A992.z; plus related software and technology |
| **"For an entity"** | Reaches a non-D:5 customer that trains or supplies models to a D:5 company; headquarters-based text treats an entity as the user where it is purchaser or the primary remote user (>50 % of data-centre compute) |
| **Linked data centres** | Digitally linked infrastructure that shares resources, balances workloads and replicates data counts together, not only physically linked sites |
| **KYC / red flags** | Foreign data centres expected to run KYC on direct or indirect Macau/D:5 ownership or control; refusal or inability to provide information is a red flag that presumptively establishes knowledge unless resolved before the transaction |
| **De minimis** | Cannot be relied on for incorporated or commingled US-origin items where knowledge of a prohibited end use exists anywhere in the chain |
| **"Is informed" process** | BIS may notify persons or destinations that a licence is required; State or the National Security Advisor may flag high-risk destinations, and Commerce must act within 10 days if it deems appropriate |
| **Licence exceptions** | None overcomes the § 744.24 prohibition, except as BIS notes; § 740.2(a)(9)(ii) limits the exceptions available for covered items (TMP, NAC/ACA, RPL, GOV, TSU, HBM, ACM) |
| **Licensing policy** | Case-by-case for § 744.24 |
| **Five-country requirement (§ 742.6(a)(6)(iii)(A)(1))** | Licence required to or within **Indonesia, Malaysia, Singapore, Thailand and Brazil**; more countries can be added in consultation with State or the NSA; case-by-case review weighing the destination's export-control effectiveness and enforcement coordination |
| **US-headquartered carve-out** | No licence needed for an end user headquartered in (or ultimate parent in) the **United States**, if the exporter files **§ 743.10 monthly reports** (due the first business day of the following month) |
| **D:1/D:4/D:5 requirement (§ 742.6(a)(6)(iii)(A)(2))** | Licence required to or within D:1, D:4, D:5 (excluding A:5/A:6 destinations and the UAE, except as provided in the UAE rule cited in the draft and approved UAE entities in supp. no. 8 to part 740); China/Macau: case-by-case below TPP 21,000 and DRAM bandwidth 6,500 GB/s, otherwise presumption of denial; other D:1/D:4 and UAE: presumption of approval |
| **Headquarters-based controls (§ 744.23(a)(3)(i))** | Licence required for covered items sent outside D:1/D:4/D:5 for a Macau/D:5-headquartered entity (e.g. a PRC cloud provider's third-country data centre); conforming change reflects a 31 May 2026 BIS enforcement guidance |
| **Fabs and OSATs** | Presumptions for IC designers in D:1, D:4, D:5 or the five countries can no longer be overcome (Note 1 to 3A090.a); non-approved/authorised designers presumed to be 3A090.a |
| **Commercial recommender carve-out** | Tools "exclusively designed and exclusively used" to rank or recommend commercial items; excludes generative systems; conditioned on submission to BIS |
| **Transition** | En-route shipments: complete within 30 days of publication; operators already serving D:5/Macau customers: licence within 90 days of the effective date |
| **Effective / comments** | Effective on Federal Register publication; comments due 60 days after publication (dates not yet fixed in the display copy) |

### Rescission of the AI Diffusion Rule

The draft removes ECCN **4E091** and the model-weights FDP rule (§ 734.9(l)), Red Flag 28, § 748.3(f) and the "Model Weights" definition; removes the country tiers and Data Center VEU; rescinds the worldwide RS licence in favour of the targeted requirements above; and removes **License Exceptions AIA (§ 740.27) and LPP (§ 740.29)**. The worldwide advanced-computing FDP rule (§ 734.9(h)(2)(i)) is **retained**. See the [4E091 status note](2026-11-ai-diffusion-rule-4e091-status.md), which should now be read as superseded on the rescission point once the rule is published.

---

## Why It Matters

1. **Remote access becomes a licensable event by regulation, not statute.** The gap described in the [legislation tracker](../regulations/us-ai-chip-export-legislation-tracker.md) (compute rented in Singapore or Malaysia by a Chinese customer fell outside the EAR) is closed administratively, using a knowledge-based end-use control rather than waiting for the Remote Access Security Act. The Megaspeed fact pattern in the [H200 licensee note](2026-11-nyt-h200-china-licensees-vetting.md) is the obvious policy backdrop.
2. **Headquarters, not location, is the trigger.** A data centre anywhere is caught if it serves a Macau/D:5-headquartered customer above the TPP threshold; ownership mapping of customers is therefore the compliance core, consistent with the [50 % rule analysis](../regulations/ofac-ubo-50-percent-rule.md) and the [Affiliates Rule](../regulations/uae/bis-affiliates-rule.md).
3. **Knowledge standard with a presumption.** Refusal or inability to supply ownership information presumptively establishes knowledge: KYC on compute customers is effectively mandatory for operators wanting to stay outside § 744.24.
4. **Hub-country licensing.** The five-country requirement targets perceived diversion routes. The UAE is treated differently in the draft (presumption of approval and a reference to the July 2026 UAE rule), which matters for Gulf AI-infrastructure projects.

---

## Relevance to UAE and Gulf Compliance Functions

- **UAE position:** The draft carves the UAE out of the (A)(2) requirement except as provided in the UAE rule and approved entities listed in supplement no. 8 to part 740, and applies a presumption of approval. Confirm against the Federal Register text which UAE entities and transactions fall inside that carve-out.
- **Gulf operators with Chinese-headquartered tenants:** Compute provided to a China/Macau-headquartered tenant above the aggregate-TPP threshold (including via linked sites) is within § 744.24 even if the operator is non-US and the chips are already in place; the 90-day licence window for existing service arrangements will matter.
- **Customer onboarding:** Add ultimate-parent headquarters and >50 % remote-use tests to KYC for GPU-cloud and colocation customers; document resolution of any refusal to provide ownership data before the transaction.
- **Model-training customers:** A non-D:5 customer training or supplying models to a D:5 company can still bring the arrangement within "for an entity".
- **Supply chain:** Server OEMs and distributors shipping to Singapore, Malaysia, Indonesia, Thailand or Brazil for onward use should model licence requirements and § 743.10 reporting for US-headquartered end users.

---

## Practitioner commentary — Paul Hastings client alert (17 November 2026)

Paul Hastings LLP (Ghavi, Gonzalez, Kleiner, Dang, Hutchison), "US Department of Commerce Issues Regulations to Restrict Remote Cloud Access", reads the same IFR (described as a 131-page rule). It is **secondary commentary**, not a primary source; its points are recorded as the firm's reading, and where it adds to or sharpens the display-copy summary above:

| Point | Paul Hastings reading |
|---|---|
| Timing | Effective immediately on Federal Register publication, expected 19 Nov 2026; 60-day comment period; en-route shipments exempt if completed within 30 days of publication |
| Threshold scale | The firm estimates 12,000,000 aggregate TPP is roughly **98 GB300 GPUs**; applies whether the compute sits in one data centre or in linked sites |
| Reach | Because the control depends on an export, it effectively reaches **overseas data centres only**, not US-based ones |
| "Running" models | The control covers compute used to train or "run" models; the IFR does not define "running" or say whether **token/API services** count |
| "For an entity" | Read broadly: transactions on behalf of a D:5 entity, including where it is purchaser or primary remote user (>50 % of compute); also non-D:5 customers (e.g. a European company) training or supplying models to a D:5 company |
| Commercial recommender exception | Allowed only after a submission to the **End User Review Committee** describing the company, the compute and diligence showing exclusive recommender use (reads the text as conditional) |
| KYC | Applies to data centres, **foreign foundries and chip exporters**; refusal or inability to provide ownership information is a red flag that presumptively establishes knowledge unless resolved before the transaction |
| Is-informed | BIS may notify specific persons, or publish in the Federal Register, that a licence is required for diversion risk, including military-intelligence end uses or users in China, Russia and other countries; State and the National Security Advisor may flag high-risk destinations, which the firm sees as bringing other agencies into a Commerce-run process |
| Five-country licensing | Indonesia, Malaysia, Singapore, Thailand and Brazil, plus any country the Secretary designates; case-by-case, weighing the destination's export-control regime and enforcement cooperation with BIS |
| US-headquartered exemption | Conditioned on a monthly report by the first business day of the following month, with party details and roles, ultimate destinations, and ECCN, SKU, TPP and quantity |
| Enforcement posture | Violators are encouraged to consider a **voluntary self-disclosure** |
| Existing operators | Data centres already serving D:5 customers above the threshold need a licence within 90 days of the effective date or risk losing the ability to procure advanced computing items |
| Terminology | The IFR uses "super intelligence" (SI) in place of "AI", consistent with Executive Order 14434; D:5 is described as 22 arms-embargoed countries including China |

**Who the firm says is affected:** data-centre operators (including in Europe and Asia), cloud and neocloud providers and hyperscalers, Chinese customers, Southeast Asian operators hosting Chinese-headquartered customers, investment funds with data-centre exposure, financial institutions and AI developers.

**Practical takeaways (firm's):** (1) US data centres are not directly covered but may tighten policies toward Chinese customers; (2) overseas operators above the threshold should assess licensing and consider early engagement with regulators; (3) review offtake and capacity contracts for whether the rule is a regulatory-change event; (4) strengthen KYC on ownership and control, especially where restructuring might be used to avoid the rule; (5) watch for further licence requirements or is-informed notices.

**Reading against this note:** the alert is consistent with the display-copy summary on the thresholds, KYC presumption, five-country list and transition periods. It resolves the commercial-recommender point toward "conditional on submission" and flags two gaps the draft leaves open ("running" and API services). It does not address the KYC-obligation-holder inconsistency noted below.

---

## Contested and Unverified Items

- **Draft status:** The display copy is a pre-publication draft; final text, section numbers and dates may differ.
- **Internal inconsistencies flagged in the draft:** (i) whether the § 744.24(e) KYC obligation falls on the transferor (regulatory text) or the recipient (preamble); (ii) whether the commercial-recommender carve-out is a true exclusion (preamble) or conditional on a BIS submission (text); (iii) the press release's "significant volume" language versus the specific 12,000,000 aggregate TPP test.
- **Undefined terms:** "Remote access" and "knowledge" are not defined in the portion reviewed; the "Super Intelligence" terminology replaces "AI" in the draft.
- **Release date:** BIS press release dated 16 Nov 2026; some secondary sources say 15 Nov.
- **"Running" and API services:** per Paul Hastings, the IFR does not define "running" a model or say whether token/API access is covered; unresolved until Federal Register text and any BIS FAQs.
- **Federal Register date:** publication expected 19 Nov 2026 per Paul Hastings; not yet confirmed from the Federal Register.
- **Secondary commentary:** Press characterisations (e.g. of motivations or political context) are not relied on here.

---

## Sources

- BIS, "BIS Issues Rule Addressing Remote Access to American Super Intelligence Technology", press release, 16 Nov 2026 (Office of Congressional and Public Affairs): <https://media.bis.gov/press-release/bis-issues-rule-addressing-remote-access-american-super-intelligence-technology>
- BIS, display copy of the interim final rule "Addressing Remote Access to Advanced Semiconductors", RIN 0694-AK50: <https://www.bis.gov/media/documents/rin-0694-ak50.pdf>
- Secondary summaries cross-checked against the rule text: FourWeekMBA; shiftdelete.net; ai-tldr.dev; MLQ.ai (Nov 2026)
- Paul Hastings LLP, "US Department of Commerce Issues Regulations to Restrict Remote Cloud Access", client alert, 17 Nov 2026: <https://www.paulhastings.com/thought-leadership/us-department-of-commerce-issues-regulations> (secondary; read via a fetch summary, not line by line)

**Related pages in this repository**

- [US AI-Chip Export Legislation Tracker](../regulations/us-ai-chip-export-legislation-tracker.md)
- [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md)
- [AI Diffusion Rule / ECCN 4E091 Status](2026-11-ai-diffusion-rule-4e091-status.md)
- [Commerce H200 Licensing to China — Empty-Office Licensees](2026-11-nyt-h200-china-licensees-vetting.md)
- [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md)

---

*Case note prepared 16 November 2026 from the BIS press release and display copy; Paul Hastings commentary added 18 November 2026. Informational only; not legal advice. Update on Federal Register publication (effective date, comment deadline, final section numbering), any BIS FAQs, and UAE-specific guidance.*
