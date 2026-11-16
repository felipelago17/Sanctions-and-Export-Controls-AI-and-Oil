# BIS Interim Final Rule on Remote Access to Advanced Semiconductors — New § 744.24, Five-Country Licence Requirement, AI Diffusion Rescission (RIN 0694-AK50, November 2026)

On **16 November 2026** the Bureau of Industry and Security (BIS) released an interim final rule (IFR), RIN **0694-AK50**, "Addressing Remote Access to Advanced Semiconductors". The BIS press release is headed "BIS Issues Rule Addressing Remote Access to American Super Intelligence Technology". It says the IFR was written by and at the direction of the Department of the Treasury and the National Security Council, and that it is designed to ensure existing restrictions on sensitive US technology cannot be circumvented through remote computing arrangements involving data centres in third countries.

This is the rule the repository has been anticipating: it converts the "access as the export" thesis into EAR text. It adds an **end-use control on data-centre compute** serving China- and D:5-headquartered customers, imposes a **destination-based licence requirement for five Southeast Asian and Latin American hubs**, and **formally rescinds the January 2025 AI Diffusion Rule**.

> **Source and verification status:** The press release (BIS, 16 Nov 2026) is a primary source. The rule detail below is taken from the BIS "display copy" of the IFR (`rin-0694-ak50.pdf`), which on its face is a **pre-publication draft**: it has no Federal Register citation, and effective-date, comment-date and docket fields are placeholders. The draft contains internal inconsistencies (see below) and the portion reviewed for this note was the first part of a longer document. Treat section numbers, thresholds and dates as **provisional until the Federal Register text is published**. Some secondary outlets date the release 15 November; the BIS press release itself is dated 16 November.

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

## Contested and Unverified Items

- **Draft status:** The display copy is a pre-publication draft; final text, section numbers and dates may differ.
- **Internal inconsistencies flagged in the draft:** (i) whether the § 744.24(e) KYC obligation falls on the transferor (regulatory text) or the recipient (preamble); (ii) whether the commercial-recommender carve-out is a true exclusion (preamble) or conditional on a BIS submission (text); (iii) the press release's "significant volume" language versus the specific 12,000,000 aggregate TPP test.
- **Undefined terms:** "Remote access" and "knowledge" are not defined in the portion reviewed; the "Super Intelligence" terminology replaces "AI" in the draft.
- **Release date:** BIS press release dated 16 Nov 2026; some secondary sources say 15 Nov.
- **Secondary commentary:** Press characterisations (e.g. of motivations or political context) are not relied on here.

---

## Sources

- BIS, "BIS Issues Rule Addressing Remote Access to American Super Intelligence Technology", press release, 16 Nov 2026 (Office of Congressional and Public Affairs): <https://media.bis.gov/press-release/bis-issues-rule-addressing-remote-access-american-super-intelligence-technology>
- BIS, display copy of the interim final rule "Addressing Remote Access to Advanced Semiconductors", RIN 0694-AK50: <https://www.bis.gov/media/documents/rin-0694-ak50.pdf>
- Secondary summaries cross-checked against the rule text: FourWeekMBA; shiftdelete.net; ai-tldr.dev; MLQ.ai (Nov 2026)

**Related pages in this repository**

- [US AI-Chip Export Legislation Tracker](../regulations/us-ai-chip-export-legislation-tracker.md)
- [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md)
- [AI Diffusion Rule / ECCN 4E091 Status](2026-11-ai-diffusion-rule-4e091-status.md)
- [Commerce H200 Licensing to China — Empty-Office Licensees](2026-11-nyt-h200-china-licensees-vetting.md)
- [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md)

---

*Case note prepared 16 November 2026 from the BIS press release and display copy. Informational only; not legal advice. Update on Federal Register publication (effective date, comment deadline, final section numbering), any BIS FAQs, and UAE-specific guidance.*
