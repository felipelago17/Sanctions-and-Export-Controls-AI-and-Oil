# Commerce H200 Licensing to China — Approved Licensees with Empty Offices and Restricted-Party Ties (NYT, November 2026)

On 7 November 2026 *The New York Times* (Ana Swanson, Keith Bradsher, Kalley Huang) reported that the US Commerce Department has approved **roughly two dozen Chinese companies** to buy or handle Nvidia's **H200** AI accelerators under the administration's 2026 licensing policy, and that at least two of the approved firms — **New Matrix** (Beijing) and **Maginfra** — have no visible operations at their registered addresses. Several licensees reportedly have ownership links to parties on US restricted-party lists or to the Chinese defence sector.

The story matters less for what it says about Nvidia than for what it says about **licensing as a control**: a case-by-case licence regime is only as good as the end-user vetting behind it. For a UAE-based compliance function, it is also a live illustration of the diligence standard that counterparties in the Gulf AI-infrastructure chain will be held to by US regulators and by Congress.

> **Source and verification status:** The core findings (empty offices; roughly two dozen approvals; ownership links) are NYT reporting based on site visits, corporate registry records and unnamed people familiar with the approvals. Commerce and Nvidia have not published the licensee list. Commerce's response, as reported, is that each licence is weighed for national-security risk; Nvidia's is that the Chinese military has no reason to rely on US technology and that earlier allegations about a related intermediary were "investigated and debunked". The NYT did **not** establish that any H200s reached the Chinese military. Items resting only on press sourcing are labelled below.

---

## Key Facts

- **Policy context:** H200 exports to China are licensable under the administration's 2026 "H200 rule" (case-by-case review, 25 % tariff on the chips, caps per customer). Reported volumes remain small — H200 shipments to China were under 1 % of Nvidia's data-centre revenue in the quarter to July 2026, and Beijing has at times discouraged Chinese buyers from taking US chips.
- **Scale of approvals:** approximately two dozen Chinese firms approved to buy or handle H200s, including large names (Baidu, BYD, Tesla Shanghai reported) alongside small, recently formed integrators. *(press sourcing)*
- **New Matrix:** 17-month-old Beijing company approved to assemble H200s into AI servers; registered address found to be an empty, unfinished unit; owners reported to be tied to a fund (Wise Road) previously blocked by the US on national-security grounds. *(press sourcing)*
- **Maginfra:** second approved server assembler; registered office found deserted in September 2026; described in reporting as an offshoot of Inspur, whose group companies have been Entity-Listed. *(press sourcing)*
- **Other licensees:** the NYT named four licensees with restricted-party or military ties. The paper did not publish the full list. *(press sourcing)*
- **Remote-access thread:** the article links back to the NYT's October 2026 reporting on **Megaspeed**, the Singapore-based data-centre operator under US and Singapore investigation for allegedly giving Chinese customers remote access to restricted Nvidia compute, and to the reported US intelligence assessment of a former Megaspeed executive. Nvidia has denied wrongdoing; Singapore has confirmed an investigation into the company is ongoing.
- **No enforcement action** has been announced against any licensee as of 8 November 2026.

---

## Why This Is a Control Failure (If Accurate)

A BIS licence for an advanced-computing item to a Chinese end user rests on three representations: **who** the end user is (ownership and control), **where** the item will sit, and **what** it will be used for. The NYT findings go to the first two.

| Vetting layer | What should have caught it | What the reporting suggests |
|---|---|---|
| Entity verification | Site visit, utilities/lease evidence, employee headcount, registry age | Registered address empty; company 17 months old; no directory listing |
| Beneficial ownership | Ownership-chain mapping to Entity List / MEU / OFAC lists and their affiliates | Owners reportedly linked to a blocked fund and to an Entity-Listed group |
| End-use plausibility | Does a server-assembly business exist at that scale? Customers? | No visible operations; no disclosed customer base |
| Post-licence monitoring | End-use checks, location verification, reporting | None public; Chip Security Act location-verification mandate not yet law |

The front-company pattern — a clean, newly incorporated entity obtaining a licence while ownership sits elsewhere — is exactly the vector the [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md) was built to address by attribution, and the one the [Chip Security Act's](../regulations/chip-security-act.md) location verification does **not** address (a shell physically in a permitted country still passes a geography test). Both instruments are currently in limbo: the Affiliates Rule remains suspended to **10 January 2027** and the Chip Security Act is pending in the FY2027 NDAA conference.

---

## Legislative and Policy Reaction

The story landed in the middle of the FY2027 NDAA end-game and has been picked up by advocates of four pending bills — the **MATCH Act**, **Remote Access Security Act**, **Chip Security Act** and **AI OVERWATCH Act** — as evidence that administrative discretion over advanced-chip licensing needs statutory constraint. Status of each bill is maintained on the [US AI-Chip Export Legislation Tracker](../regulations/us-ai-chip-export-legislation-tracker.md).

Commentary circulating among US export-control practitioners (LinkedIn, 7 November 2026) framed the immediate asks as: (i) BIS to use **is-informed letters** to close the remote-access gap pending a rule; (ii) Megaspeed to be added to the **Entity List**; (iii) a licensing policy of denial for further H200 sales to China; (iv) Congress to carry all four bills in the NDAA. These are advocacy positions, not announced policy; they are recorded here because they indicate where congressional pressure on BIS is likely to go in the lame-duck session.

---

## Relevance to UAE and Gulf Compliance Functions

1. **The vetting bar is now public.** Any Gulf entity receiving advanced compute under a US licence or a validated-end-user arrangement should assume that its own end-user file — lease, headcount, ownership chart, customer list — will be judged against the New Matrix facts. "Registered address + clean screening hit" is no longer a defensible standard for a counterparty that will touch controlled compute.
2. **Ownership-chain mapping is the differentiator.** The links alleged by the NYT were discoverable from corporate registries. A screening programme that stops at name-matching the direct counterparty would have cleared both firms. See the [screening methodology](../screening/index.md) and the [OFAC/BIS 50 % analysis](../regulations/ofac-ubo-50-percent-rule.md).
3. **Remote access is the next licence condition.** If the Remote Access Security Act (already House-passed 369–22) is enacted via the NDAA, "remote access" becomes an export under ECRA. Cloud and co-location providers in the UAE serving non-resident customers should model KYC on compute access now, not after the rule.
4. **Expect is-informed letters before rules.** BIS's fastest instrument is a letter imposing licence requirements on named parties or transactions. UAE providers with Chinese-linked tenants are a plausible recipient class.

---

## Contested and Unverified Items

- The size and composition of the approved list (two dozen; specific names) — press sourcing only; Commerce has not published it.
- Whether any H200s have in fact been delivered to New Matrix or Maginfra — not established.
- Ownership characterisations (Wise Road; Inspur) — from registry research reported by the NYT; not confirmed by the companies.
- The US intelligence assessment concerning the former Megaspeed executive — reported by NYT and others; Singapore's Ministry of Home Affairs has disputed one element of the account (that Singapore investigated her personally) while confirming the corporate investigation.

---

## Sources

- *The New York Times*, "U.S. Cleared Nvidia Chips to Chinese Firms With Empty Offices and Troubling Ties", 7 Nov 2026 (Swanson, Bradsher, Huang)
- Secondary coverage summarising the NYT findings: The Verge; MLQ.ai (8 Nov 2026); shiftdelete.net; FourWeekMBA (7 Nov 2026)
- Megaspeed background: Financial World, "Nvidia scrutiny highlights blind spots in US controls on AI computing" (Nov 2026); Tom's Hardware; Yahoo Finance (Huang statement on GPU count at Megaspeed)
- Legislative context: FDD Action coalition letter, 17 Jun 2026; Reed Smith, "Congress returns: National security and trade provisions to watch in the FY2027 NDAA", 2 Nov 2026

**Related pages in this repository**

- [US AI-Chip Export Legislation Tracker](../regulations/us-ai-chip-export-legislation-tracker.md)
- [AI & Advanced Technology Export Controls](../regulations/ai-advanced-tech-export-controls.md)
- [Chip Security Act (PBLV)](../regulations/chip-security-act.md)
- [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md)
- [GPU Smuggling — Case Summaries](../enforcements/case-summaries/gpu-smuggling/index.md)

---

*Case note prepared 8 November 2026. Informational only; not legal advice. Update on any Commerce statement on the licensee list, Entity List action concerning Megaspeed, or NDAA conference text.*
