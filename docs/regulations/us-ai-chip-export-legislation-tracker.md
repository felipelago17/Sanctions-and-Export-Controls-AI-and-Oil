# US AI-Chip Export Legislation Tracker — MATCH, Remote Access Security, Chip Security and AI OVERWATCH Acts

> **Status as of 8 November 2026.** None of the four bills is law. Three (MATCH, Chip Security, AI OVERWATCH) are carried in the **Senate FY2027 NDAA manager's amendment**; the Remote Access Security Act has passed the House and is a candidate NDAA rider. The FY2027 NDAA is headed to **conference in the lame-duck session**; the House passed its bill on 22 July 2026 and a Senate cloture vote failed on 14 July 2026. The FY2026 NDAA (signed 18 Dec 2025) dropped comparable chip provisions in conference, so survival is not assured. Anything not enacted dies sine die on **3 January 2027**.

> **Update (12 Nov 2026) — administrative track:** The Information reports that Commerce is **finalising a rule** to stop Chinese AI firms remotely accessing advanced AI chips in third-country data centres. If issued, it would be the regulatory route to the same gap RASA addresses by statute. See [BIS remote-access rule](#bis-remote-access-rule-reported-nov-2026) below.

This page consolidates the four AI-hardware export-control bills that recur in the FY2027 NDAA debate, with bill numbers, committee votes and the mechanism each would add to the Export Control Reform Act (ECRA). It replaces the scattered references in [AI & Advanced Technology](ai-advanced-tech-export-controls.md) and [Chip Security Act (PBLV)](chip-security-act.md) as the single status page; those pages hold the substantive analysis.

---

## At a Glance

| Bill | Numbers (119th) | Mechanism | House status | Senate status | NDAA vehicle |
|---|---|---|---|---|---|
| **Remote Access Security Act** | H.R. 2683 / S. 3519 | Adds "remote access" to the ECRA definition of controlled activity — cloud/IaaS access to controlled items becomes licensable; BIS may license and penalise | **Passed House 369–22, 12 Jan 2026** (suspension); referred to Senate Banking | Pending in Banking | Proposed Senate amendment; not in House text |
| **AI OVERWATCH Act** | H.R. 6875 / S. 4456 | Codifies the H200-rule framework; treats top-tier AI chip exports to countries of concern like arms sales — licence required (no blanket approvals), Commerce certification to Congress, **30-day congressional review / disapproval window** modelled on AECA; Senate version shortens the ban window on top-tier chips from 24 to 18 months | HFAC approved **42–2**, 21 Jan 2026 | In manager's amendment (Banks) | Senate manager's amendment |
| **Chip Security Act** | H.R. 3447 / S. 1705 | Location verification ("PBLV") for advanced AI chips; exporter reporting of diversion; see [dedicated analysis](chip-security-act.md) | HFAC approved **42–0**, 26 Mar 2026 | In manager's amendment (Cotton) | Senate manager's amendment |
| **MATCH Act** (Multilateral Alignment of Technology Controls on Hardware) | H.R. 8170 / S. 4281 | Statutory, country-wide controls on covered semiconductor manufacturing equipment (SME) — including DUV immersion lithography — and servicing/support for named Chinese "covered facilities" (SMIC, Huawei, Hua Hong, CXMT, YMTC and affiliates); requires Commerce/State to press allied supplier countries (Netherlands, Japan) to align, with escalating US measures (incl. FDPR-style extension) if they do not; grandfathers pre-existing non-Chinese-owned fabs in China | HFAC approved **36–8**, 22 Apr 2026 (substitute text softened some provisions) | S. 4281 (Ricketts / Kim); Banking markup urged June 2026 | Senate manager's amendment |

Bill numbers for MATCH, OVERWATCH, Chip Security and RASA are as stated in the FDD Action coalition letter of 17 June 2026; confirm on Congress.gov before citing in filings.

---

## What Each Bill Changes — Compliance View

### Remote Access Security Act (RASA)

- **Gap addressed:** BIS has not treated provision of cloud compute as an export; a Chinese customer renting H100/Blackwell capacity in Singapore, Malaysia or the UAE is outside EAR licensing even though the same chips could not be shipped to it. The Megaspeed matter (see the [H200 licensee case note](../cases/2026-11-nyt-h200-china-licensees-vetting.md)) is the reference fact pattern.
- **Mechanism:** amends ECRA §§ 1742, 1753, 1754 and 1760 so that "remote access" by a foreign person to items subject to US jurisdiction sits alongside export, re-export and in-country transfer. BIS would then write the implementing rule — scope, thresholds and KYC obligations are left to regulation.
- **Compliance consequence:** IaaS/co-location providers become licensing subjects. Expect a know-your-customer regime for compute access analogous to the 2024 proposed IaaS KYC rule, and licence conditions on GPU clusters in third countries. Predecessor H.R. 8152 passed the House by voice vote in September 2024 and died in the Senate.

### AI OVERWATCH Act

- **Gap addressed:** export decisions on the most capable chips are purely executive. The bill borrows the Arms Export Control Act model: notification to Congress and a joint-resolution-of-disapproval window.
- **Mechanism:** (i) codifies the administration's existing restrictions on the top tier; (ii) requires a specific licence — prohibiting blanket or general approvals — for advanced AI chips to countries of concern; (iii) requires Commerce to certify that a licensed export will not undermine US supply or foundry capacity, violate end-user/end-use controls, or facilitate unauthorised remote access; (iv) 30-day congressional review. Senate text reportedly shortens the top-tier ban window from two years to 18 months.
- **Compliance consequence:** longer licence timelines for China-bound advanced compute; licence conditions on remote access become explicit; certification language gives Congress a hook for oversight letters to licensees.

### Chip Security Act

Covered in depth at [Chip Security Act (PBLV)](chip-security-act.md). Key point for this page: it addresses **geography**, not **ownership** — a shell entity in a permitted location passes location verification. Pair with the Affiliates Rule.

### MATCH Act

- **Gap addressed:** US SME controls are unilateral in practice; ASML, Nikon, Canon and Tokyo Electron can still sell DUV immersion tools and servicing that US firms cannot. China was roughly a third of ASML's 2025 revenue.
- **Mechanism:** moves SME controls from BIS discretion into statute; names covered Chinese facilities and their affiliates; sets a review-and-align process with allied supplier countries and authorises extension of US controls (including to foreign-produced items) where allies do not align within the statutory window. House substitute text softened the original mandatory design toward a report-then-apply sequence with exemptions for existing non-Chinese-owned fabs.
- **Compliance consequence (Gulf):** indirect — the Gulf is not an SME market — but the allied-alignment mechanism is the template Congress would likely reuse for AI-chip diversion routes through third countries. The MOFCOM response (warning of "severe disruption" to supply chains) and China's draft AI/technology export list (comment deadline 15 Nov 2026) are the countermeasure track to watch.
- **Critique on record:** R Street characterises the bill as industrial policy for US toolmakers; CSIS flags transatlantic friction because EU member states retain national export-control competence.

---

## Timeline

| Date | Event |
|---|---|
| 9 Sep 2024 | House passes predecessor Remote Access Security Act (H.R. 8152, 118th) by voice vote; dies in Senate |
| 7 Apr 2025 | H.R. 2683 (RASA) introduced (Lawler); HFAC reports 51–0 |
| May 2025 | H.R. 3447 Chip Security Act introduced; S. 1705 companion (Cotton) |
| Dec 2025 | S. 3519 RASA Senate companion introduced |
| 18 Dec 2025 | FY2026 NDAA signed **without** the AI-chip export provisions sought by advocates |
| 12 Jan 2026 | **House passes RASA 369–22** under suspension |
| 21 Jan 2026 | HFAC approves AI OVERWATCH Act 42–2 |
| 26 Mar 2026 | HFAC approves Chip Security Act 42–0 |
| Apr 2026 | MATCH Act introduced (House: Baumgartner / Moolenaar; Senate: Ricketts / Kim) |
| 22 Apr 2026 | HFAC approves MATCH Act 36–8 in the largest export-control markup on record (20+ bills); MOFCOM warns of supply-chain disruption |
| 17 Jun 2026 | FDD Action-led coalition letter urges all four (plus a fifth measure) be included in the FY2027 NDAA |
| 14 Jul 2026 | Senate NDAA (S. 4784) cloture fails; manager's amendment reported to carry MATCH, Chip Security and AI OVERWATCH (§§ 6040, 6081–6086, 6243 per FDD guide) |
| 22 Jul 2026 | House passes its FY2027 NDAA |
| 1 Oct 2026 | FY2027 begins without an NDAA |
| 3 Nov 2026 | US midterms — Democrats take both chambers (effective 3 Jan 2027); lame-duck conference is the window |
| 7 Nov 2026 | NYT H200 licensee story renews pressure for statutory constraints |
| Nov 2026 | The Information reports Commerce is finalising a rule barring Chinese AI firms from remote access to advanced chips in overseas data centres (two unnamed sources; text not published) |

---

## BIS Remote-Access Rule (reported Nov 2026)

- **Report:** *The Information* (Leo Schwartz, Nov 2026) says the Commerce Department is **finalising a rule** that would stop Chinese AI companies from remotely accessing advanced AI chips housed in data centres in other countries, citing two people familiar with the process. The article is paywalled; only the summary was reviewed. Tags indicate Nvidia, Singapore, Megaspeed and BIS leadership are covered.
- **Background:** in August 2026 the same outlet reported a draft aimed at Chinese rental of Nvidia GPU capacity in third countries such as Thailand and Singapore, with a draft possibly shared with trade groups from September. The EAR have governed the physical chip, not remote access; BIS advisory opinions (2009, 2011, 2014) treated cloud providers as not being exporters.
- **Open question — authority:** export-control practitioners have questioned whether BIS can enforce a remote-access prohibition without statutory change (the premise of RASA). Watch whether the rule is framed as an end-use/end-user control, a licence requirement on providers, or an extension of the 2024 IaaS KYC proposal.
- **Compliance consequence (provisional):** GPU cloud and co-location operators outside China (Singapore, Malaysia, Thailand, UAE and GCC hosts) should anticipate KYC and customer-nationality controls on advanced-compute tenants. **Text not yet published; confirm against the Federal Register or BIS release before relying on scope.**
- **Interaction with RASA:** if issued, the rule gives the NDAA conference a reason either to codify authority (attach RASA) or to leave the issue to BIS.

---

## Related Developments — Week of 3–8 November 2026

- **BIS Affiliates Rule suspension extended** to **10 January 2027** by final rule filed 5 Nov (Federal Register publication 9 Nov 2026), matching the extended US–China trade truce. Snap-back now 10 Jan 2027 absent further action. See [BIS Affiliates Rule](uae/bis-affiliates-rule.md).
- **China — MOFCOM draft Measures on Dual-use Items Export Control Investigation** (30 Oct 2026): formalises investigation powers under the 2024 Dual-use Items Regulations — a step toward enforcement parity with BIS. Pair with the draft AI/technology export list (comment deadline 15 Nov 2026).
- **BIS renews Temporary Denial Order against Rossiya Airlines** (3 Nov 2026; FR 5 Nov) for a further year, to 3 Nov 2027.
- **OFAC** — Iran automotive and rail sectors designated under E.O. 13902; FAQ 831 amended; A7 network designated as a transnational criminal organisation (October actions, analysed 3 Nov 2026).
- **BIS — suppressors move from USML to CCL** effective 20 Nov 2026 (noted for completeness; not AI-relevant).

---

## What to Watch

1. **Conference text.** Whether all three Senate-amendment bills survive, and whether RASA is attached. Past conferences stripped similar language.
2. **BIS remote-access rule.** Publication form (interim final rule vs NPRM), scope, KYC/provider obligations, any licence exception for allied hosts, and the statutory-authority basis. Is-informed letters or Entity List action on Megaspeed remain fallback administrative steps.
3. **120th Congress reintroduction.** With Democratic majorities from January 2027, expect reintroduction of RASA and OVERWATCH with oversight-heavy framing; filibuster arithmetic is unchanged.
4. **Allied response to MATCH.** Dutch and Japanese government statements; any ASML guidance on China servicing.

---

## Sources

- FDD Action, coalition letter and press release, 17 Jun 2026; FDD Action, *Critical Defense Priorities for the FY27 NDAA* (resource guide)
- House Foreign Affairs Committee press release, "Chairman Mast, HFAC, Advances MATCH Act" (Apr 2026)
- MATCH Act texts: House introduced text (Goodlander office PDF, Apr 2026); Senate discussion draft HLA26393 (Ricketts office)
- Crowell & Moring via Mondaq, "House Passes Remote Access Security Act", 19 Jan 2026; H.R. 2683 engrossed text (govinfo)
- Office of Sen. Jim Banks, "Sen. Banks secures AI OVERWATCH Act in Senate NDAA", 15 Jul 2026
- Leo Schwartz, "Commerce Department Finalizing Long-Awaited AI Remote Access Rule", *The Information*, Nov 2026 (paywalled; summary only) — https://www.theinformation.com/articles/commerce-department-finalizing-long-awaited-ai-remote-access-rule
- Tom's Hardware, "New US export controls reportedly target Chinese access to remote AI servers" (28 Aug 2026), relaying *The Information*'s August report
- Foundation for American Innovation, "Strengthening the U.S. Export Control Regime" (coalition letter to House leadership)
- CNAS Insights, "Matching Policy to Strategy: The Bill to Control Chipmaking Equipment"; CSIS, "New Momentum, Old Problems: Transatlantic Export Control Considerations"; R Street, "The MATCH Act Is Industrial Policy Dressed as National Security"
- eeNews Europe, "MATCH Act targets chip tool exports to China"; NBC News, "Bill to ban sale of key AI chipmaking equipment to China introduced in House"; TNW on MOFCOM response
- Reed Smith, *Trade Compliance Resource Hub*, "Congress returns: National security and trade provisions to watch in the FY2027 NDAA", 2 Nov 2026
- Baker McKenzie Sanctions & Export Controls blog; Kharon; MLex — Affiliates Rule extension (5–6 Nov 2026); Akin *OverRuled* update 6 Nov 2026 (Rossiya TDO)

---

*Tracker created 8 November 2026. Informational only; not legal advice. Bill numbers and vote counts drawn from secondary sources listed above — verify against Congress.gov before external citation.*
