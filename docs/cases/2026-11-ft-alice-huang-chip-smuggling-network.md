# FT Investigation: Alice Huang, Megaspeed and the Corporate Web Behind Nvidia-Chip Smuggling into China (Nov 2026)

A Financial Times investigation reports that **Alice Huang**, a former **Megaspeed** executive at the centre of US inquiries into the Singapore-based Nvidia customer, was connected to a network of companies that moved Nvidia chips to China-based users. The FT says the network included an OEM server partner, an online-gaming group, a Chinese distributor and a Cambodia-based figure whom US authorities link to the sanctioned Prince Group. This note records the reported structure and its compliance lessons, and keeps allegations separate from findings. See the companion note on the [Commerce–DOJ Megaspeed joint statement](2026-11-commerce-doj-megaspeed-joint-statement.md).

> **Source and verification status:** The full article text and four screenshots of the FT's ownership charts were supplied by the user; the FT was not fetched. The pasted text does not show the publication date; it refers to US limits on Chinese access to chips via south-east Asia as announced "this week", which matches the remote-access rule of 16 November (see the [remote-access rule note](2026-11-bis-remote-access-ifr-744-24.md)). Everything is the FT's reporting, based on interviews with more than a dozen people and hundreds of corporate filings; much rests on unnamed sources. **None of it is a finding of wrongdoing by anyone named**, and several parties deny or did not respond. Not legal advice.

---

## What the FT reports

| Element | Reported content |
|---|---|
| Central claim | Alice Huang, a Chinese businesswoman the FT describes as romantically linked to former Nvidia CEO Jensen Huang, had links to a network supplying AI chips that included an alleged Cambodian criminal enterprise. Some US officials suspect she was a Chinese spy; Beijing calls the claim a "smear" |
| Three channels | (1) a group permitted to buy and distribute the chips; (2) customers that pass US-restriction checks; (3) an underground network moving goods into China and money out |
| Channel 1: OEM | The network reached the US through **Inspur**, a large Nvidia server-assembly partner in China. Inspur was added to the Entity List in March 2023 for allegedly assisting the Chinese military, but its part-owned San Jose subsidiary was not, and was renamed **Aivres**. Per one person with direct knowledge, there were internal Nvidia questions about whether Aivres qualified as an OEM partner; Nvidia concluded it met compliance and export-control requirements. Nvidia says it has since restricted sales to Aivres |
| Channel 2: end customer | Nvidia requires at least three years of corporate records and proof that management and owners are not majority Chinese. Inspur's Chinese clients, seeking supply, turned to gaming group **Century Huatong**; the solution was an offshore shell branded as a "neocloud", which became **Megaspeed**, with Alice Huang as a "trusted" outward-facing executive with a clean record |
| Shell history | **7Road International**, the offshore arm of a Shenzhen gaming company, had several years of clean Singapore records; Huang acquired its Singapore unit in 2023 and renamed it. Her husband **Kang Wei** and his fund **Hexi Investment** were early Century Huatong investors and backed a 2020 data-centre project |
| Channel 3: China side | Per the FT, **Hu Xiaowei** (US authorities: "second-in-command" of the Prince Group syndicate; arrested in Japan in summer) filled at least part of the role of moving chips into China. In China, **Shanghai Century Litong** (set up by a Century Huatong subsidiary) was reportedly a key distributor; **Shanghai Century Longteng**, a joint venture between Century Huatong and a vehicle Huang controlled with her sister Huang Yu, founded Litong; Bloomberg reported restricted chips in Longteng-related Shanghai data centres |
| Link to Prince Group | Via Century Huatong's chair **Wang Ji**, majority owner of a now-dissolved Ningxia company (Zhenao Network, dissolved 2017) on which Hu served as a director; another director of that company owns a Chongqing firm that controls gaming entities linked to **Fang Zhizhen**, whom the US has sanctioned for alleged laundering for Prince Group. The FT dates Century Huatong's ties to alleged Prince leadership to about 2015 |
| Trade volume | Declared goods imported from Aivres by Megaspeed's Malaysian subsidiary **Speedmatrix** were about **$4.6bn** between December 2024 and December 2025 (ImportGenius data). An early-2026 Indonesian police raid reportedly found empty server racks at the local Megaspeed subsidiary (Straits Times, as cited by the FT) |
| Layering | Interviewees say the corporate layers masked chip flows and buffered smugglers from end users, some of them China's biggest tech groups. The FT found **no evidence** that Tencent (10.1 % holder in Century Huatong) or Alibaba took part |
| Context | The FT reported last year that at least $1bn of smuggled Nvidia chips were sold in China in three months after H20 controls tightened. Experts quoted say demand unmet by controls creates smuggling, and that pressure on south-east Asia may shift routes elsewhere |

### Responses reported

- **Nvidia:** placed Megaspeed and a subsidiary on its block list in 2025; does not sell to them and does not approve OEM sales naming them; restricted sales to Aivres.
- **Megaspeed:** did not respond; has said it "conducts legitimate and lawful business".
- **Prince Group:** says Hu never worked for it and that US allegations are unsupported; denies an illicit network and the aircraft-smuggling allegation.
- **Tencent:** says it is a minority investor with no connection to or knowledge of the alleged activities. Alibaba, Inspur, Aivres, Century Huatong, 7Road, Century Litong and Century Longteng did not respond; Alice Huang and Kang Wei did not respond.

---

## Why it matters for sanctions and export-control practice

1. **Entity List gaps at the subsidiary level.** A listed parent's non-listed, part-owned US subsidiary kept trading after a rename; the case shows why screening must look through ownership and renaming, not just names. Compare the [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md).
2. **"Clean shell" end customers.** Nvidia's checks (three years of records, non-Chinese ownership) were met by a shell with a clean-record predecessor and a trusted front executive. Records-age and nationality-of-owners tests can be satisfied by design; beneficial-control, financing and downstream-flow evidence matter more.
3. **Trade-data red flags.** Billions in declared imports into a Malaysian subsidiary, set against reportedly empty racks in an Indonesian one, is the kind of mismatch between shipments and observable capacity that a post-shipment check should catch.
4. **Money-laundering overlap.** Gaming groups and in-game items as value-transfer channels connect export-control diversion to AML typologies; combined sanctions, export-control and AML screening is needed.
5. **Rule response.** The remote-access rule's KYC-on-data-centre expectations and its five-country licence requirement (Malaysia, Singapore, Indonesia, Thailand, Brazil) address this route. The FT quotes an analyst warning that routes may move to other countries; that is opinion, not a finding.

### Relevance to UAE and Gulf compliance functions

- Gulf data-centre and cloud operators buying Nvidia systems through OEM or integrator channels should verify the **end customer's ultimate control and the integrator's ownership chain**, and record how an OEM's own compliance conclusion was tested.
- Treat unexplained gaps between purchased capacity and observed capacity, or customers whose history is a recently renamed offshore vehicle, as escalation triggers.
- Check whether any Chinese-linked party has used the operator's capacity indirectly, in light of the new knowledge standard for data-centre diligence.

---

## Contested and unverified items

- **Personal and espionage claims:** the romantic-relationship description and the suspicion of espionage are the FT's reporting or attributed to unnamed US officials; Beijing denies the latter. Nothing here is verified.
- **Unnamed sources:** much of the network narrative rests on people with knowledge of the matter; filings establish ownership links but not intent or knowledge.
- **Chart readings:** the FT's ownership charts (Alice Huang, her sister and husband, Hexi Investment, Longteng Intelligence, Century Longteng, Century Litong, Century Huatong, Wang Ji's 10.4 % stake, Longrui Information, 7Road Technology, Zhenao Network at 51 %, Prince Group) have several unlabelled boxes; percentages are recorded here only where the box and arrow were legible, and the full structure should be taken from the FT original.
- **Publication date:** not shown in the pasted text.
- **Relationship to the official statement:** the Commerce–DOJ statement and this report cover overlapping facts; the FT's account goes beyond the official timeline and is not confirmed by it.
- **Aivres and OEM status:** Nvidia's internal conclusion is reported from one person with direct knowledge; Nvidia's own statement says only that it restricted sales.

---

## Sources

- Financial Times, "Alice Huang's links to the chip underworld", Nov 2026 (full text and chart screenshots supplied by the user; not fetched; the FT's terms restrict redistribution, so only short paraphrase is used here). Link: <https://www.ft.com/content/f3ad8a81-3890-4a8a-8853-ff0a94b08ba9>

**Related pages in this repository**

- [Commerce–DOJ Megaspeed Joint Statement](2026-11-commerce-doj-megaspeed-joint-statement.md)
- [BIS Remote-Access Interim Final Rule](2026-11-bis-remote-access-ifr-744-24.md)
- [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md)

*Case note prepared 22 November 2026. Informational only; not legal advice.*
