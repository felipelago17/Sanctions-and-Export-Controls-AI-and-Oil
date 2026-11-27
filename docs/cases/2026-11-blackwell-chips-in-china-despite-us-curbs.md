# Case Study: Restricted Nvidia Blackwell Hardware Reaches China (Bloomberg and Other Reporting, Oct 2025 to 27 Nov 2026)

On 27 November 2026 Bloomberg reported that Chinese firms had installed an **Nvidia GB300 (Blackwell Ultra) rack** at a Shanghai data centre project linked to **Alice Huang** and the Megaspeed network, despite US restrictions on the hardware. It is the latest in a series of public reports that Blackwell-generation systems are reaching China through gray-market, leasing and financing channels. This note assembles the **public reporting only** into a timeline, the diversion typologies it shows, and the compliance lessons. Nothing here is a finding by any authority that a named party broke the law.

> **Source and verification status:** All sources are public secondary reporting seen as search excerpts or fetch summaries; the Bloomberg original (video page and article) and the TV segment that prompted this note (a Bloomberg Television caption, "Blackwell chips reach China despite US curbs", 27 Nov 2026) were **not read directly**. Several aggregator pages (Benzinga, Talkesport, Stocktwits, TLDR sites) repeat Bloomberg; they are used only for points that match more than one source. Where sources conflict, the conflict is recorded. Not legal advice.

---

## 1. The 27 November report (Bloomberg, as relayed)

| Item | Reported content |
|---|---|
| Finding | Chinese firms installed a **GB300 NVL72 rack** (72 Blackwell Ultra chips) at the **Yangtze River Delta Project**, a Shanghai data-centre site linked to Alice Huang's network; a second firm, **Shanghai Kezhan**, disclosed in a loan application a **GB200** server at the facility |
| Evidence | Chinese regulatory and lender filings: the rack's serial number was pledged as collateral for a loan of about **96 million yuan (about $14m)** from Shanghai Innovation Bank; Bloomberg matched the serial number in a public warranty database to a rack made by **Gigabyte** (Taiwan). The filings put a unit price of about $264,000 on the item |
| What is not established | **How the hardware reached China**, and whether Megaspeed itself diverted it; Bloomberg says it has no evidence Megaspeed itself sent equipment to the site. Reported owner chain includes **Shanghai Shuoyao** |
| Responses | Gigabyte says it conducts business in compliance with applicable laws; Megaspeed has denied wrongdoing in the wider investigation and did not answer Bloomberg's questions |
| Context | Blackwell exports to China require a US licence and none has been authorised; the President has said he does not want these chips in China. Jensen Huang said in May 2025 that concerns about smuggling were overblown because the systems weigh nearly two tons |

## 2. Timeline of public reports on Blackwell-class diversion

| Date | Report | Source (tier 3 unless stated) |
|---|---|---|
| Jul 2025 | FT: at least **$1bn** of Nvidia chips, with **B200** the most sought-after, smuggled in about three months after H20 controls tightened; sold as ready-made racks. Nvidia: "no evidence of any AI chip diversion" | FT via The Register, Tom's Hardware |
| Nov–Dec 2025 | The Information (via Bloomberg): Blackwell chips reportedly smuggled to DeepSeek through countries that allowed their sale, using phantom data centres; Nvidia called this "far-fetched" | Bloomberg, Tom's Hardware |
| Feb 2026 | A senior US official told Reuters that **DeepSeek** trained its next model on Blackwell chips, possibly clustered in Inner Mongolia, a likely export-control violation; DeepSeek and Beijing dispute the framing | Reuters via Deccan Herald, Finviz |
| Apr 2026 | Reuters: **B300** servers sell for about **$1m** in China, nearly double the US list price, after smuggling crackdowns; Nvidia says the B300 is restricted | Reuters via Yahoo, TNW |
| Aug 2026 | Taiwan reportedly indicted nine people over illegal **B300** exports to China; a related case involves an Nvidia manager | BornCity, Notebookcheck (secondary) |
| 1 Oct 2026 | Bloomberg: **Semi-Tech Leasing**, a state-linked lessor, financed more than 700 servers (over 3bn yuan, about $420m) for Glory View/Hongjing since Aug 2025, including **32 Asus B300** systems; Nvidia says it is investigating with partners; the lessor later refiled censored records | Bloomberg via Finimize, AI Weekly, TFTC |
| Oct 2026 | Security firm Lava reportedly found 32 **B300** units on **China Telecom's** network; physical location undetermined | Wccftech, Tom's Hardware, BornCity |
| 10–12 Nov 2026 | Bloomberg: **Moonshot AI** appears to have leased 32 **B300** servers (contract signed Aug 2026 with Super Micro, stored in Qingyang, Gansu; valued at 432m yuan, about 350 % above US prices); the owner **Lingmeixin** and lender **Beijing Zhongguancun Bank** are named in the filing; references to Moonshot were removed after Bloomberg inquired; Moonshot denies any relationship with Lingmeixin | Seoul Economic Daily (AI-translated Korean) |
| Nov 2026 | Forensic analysis by a former OpenAI engineer claims DeepSeek, Moonshot, MiniMax and Ant Group models carry Blackwell training signatures, indicating thousands of GPUs; the authors say this does not show where chips were located | The Register, Wccftech |
| Nov 2026 | Bloomberg (via TNW): Malaysian trade records show Megaspeed imported at least **17,544 GB300** chips (about $787m) in Nov 2025, after Nvidia says it cut Megaspeed off in June 2025; Nvidia's count of Megaspeed units sold through partners reportedly ran 50,000 short; not independently verified | TNW |
| 16 Nov 2026 | **Commerce and DOJ** joint statement: Megaspeed investigation (opened 2024), DOJ leading a criminal probe; Nvidia put Megaspeed on its no-sell list in June 2025 | Tier 2 via SCMP, Mothership (see the [joint-statement note](2026-11-commerce-doj-megaspeed-joint-statement.md)) |
| 27 Nov 2026 | Bloomberg: GB300 rack at the Shanghai site (section 1) | Bloomberg via aggregators |

**Update (23 Nov 2026): Entity List action.** Secondary reporting (Unite.ai, Sentisight and others) says BIS filed a final rule (Federal Register document 2026-23999) on public inspection on 23 Nov, scheduled for publication on 25 Nov, adding Megaspeed International Pte. Ltd. and six affiliates in Singapore, Malaysia and Thailand to the Entity List. Reported terms: licence required for all items subject to the EAR; presumption of denial; a 30-day savings clause for shipments already en route. This supersedes the earlier FT (10 Nov) and Bessent (13 Nov) reports that Commerce had not listed it. **The Federal Register or BIS text was not read**; confirm before relying on it. Megaspeed denies wrongdoing.

## 3. Diversion typologies shown

1. **Financing as a trace.** Leasing and bank-loan filings in China's credit registry, which list serial numbers, models and storage locations, are producing the main public evidence (Semi-Tech, Moonshot, Shanghai site). Lenders and lessors are an under-used compliance checkpoint.
2. **Warranty and serial-number tracing.** A public warranty database tied a serial number to an OEM manufacturer, showing that OEM-level records can prove origin without Nvidia's cooperation.
3. **OEM and integrator layer.** Racks built by Gigabyte, Asus and Super Micro appear in the chain; the question for OEMs is end-customer verification, not just first-sale screening (compare the FT account in the [Alice Huang note](2026-11-ft-alice-huang-chip-smuggling-network.md)).
4. **Remote access and training signatures.** Model-weight forensics and cloud rental suggest use without physical diversion; this is what the 16 Nov remote-access rule ([note](2026-11-bis-remote-access-ifr-744-24.md)) targets.
5. **Price signals.** Multiples of 2x to 4.5x US prices are consistent with restricted supply and are a red flag for any buyer or lessor.

## 4. Compliance lessons

- **Screening beyond the first sale.** Nvidia's block list for Megaspeed (June 2025) did not stop reported later imports through other channels; blocking a customer is not blocking its network or financing chain. Treat "blocked" as a trigger to monitor affiliates, trading partners and fund flows.
- **Trade-data reconciliation.** Compare declared imports to observed capacity (empty racks reported at an Indonesian Megaspeed unit; sealed servers seen during a 2024 site check per an early report).
- **Warranty and RMA data.** Serial numbers recorded for warranty, repair or financing can be matched across the chain; build serial-level traceability into resale contracts.
- **Contract clauses.** Require end-use and location certifications, audit rights, and notice of onward transfer or pledge of hardware as collateral.
- **Lender diligence.** Banks and lessors financing GPU servers should require licence evidence for restricted models.

### Relevance to UAE and Gulf compliance functions

- Gulf operators holding Blackwell-class systems under US authorisations should expect **serial-level audits** and be able to show location, custody and no pledge or transfer to Chinese-linked parties. Reporting names Gulf and South-East Asian data centres as rental routes (Seoul Economic Daily summary of Alibaba and ByteDance leasing, as an allegation).
- Rental of capacity to Chinese-headquartered customers falls within the remote-access rule's 12,000,000 TPP test and its KYC expectations.
- Where a UAE entity buys through OEMs or integrators, confirm the integrator's ownership chain and recent trade history, not just its Nvidia partner status.

---

## Contested and unverified items

- Bloomberg's original was not read; details come from aggregators and may be imprecise (figures: 96m yuan, about $14m; unit price about $264,000).
- Whether Megaspeed, its affiliates or others diverted the Shanghai hardware: **unestablished**.
- The Entity List action on Megaspeed (23 Nov, document 2026-23999): consistent across secondary sources; primary text not read.
- The 17,544 GB300 import figure and the 50,000-unit shortfall: reported by Bloomberg via TNW, unverified.
- The forensic "signature" analysis: authors state it shows access to hardware, not its location or any violation.
- Moonshot, Gigabyte, Super Micro, Asus and the lenders each deny or have not commented as noted; none is shown to have breached law.

---

## Sources

- Bloomberg, "Blackwell Chips Found at Alice Huang-Linked China Site" (video), 27 Nov 2026: <https://www.bloomberg.com/news/videos/2026-11-27/blackwell-chips-found-at-alice-huang-linked-china-site-video> (summary only)
- Benzinga, 27 Nov 2026: <https://www.benzinga.com/markets/prediction-markets/26/11/63672242/nvidia-blackwell-china-smuggling-huang>; Talkesport, 27 Nov 2026: <https://www.talkesport.com/business/nvidia-blackwell-gb300-shanghai-data-centre-megaspeed-loan-collateral/>; Stocktwits and The Factum (aggregators of Bloomberg)
- Seoul Economic Daily, 12 Nov 2026 (Moonshot lease): <https://en.sedaily.com/world/2026/11/12/banned-blackwell-chips-reach-china-through-gray-market>
- Finimize / AI Weekly / TFTC on Semi-Tech Leasing, Oct 2026
- The Next Web on Megaspeed imports; Reuters via Yahoo (B300 prices, 30 Apr 2026); Reuters via Deccan Herald (DeepSeek, Feb 2026); The Register (FT $1bn report, Jul 2025; forensic analysis Nov 2026); Tom's Hardware (DeepSeek smuggling reports; Lava/China Telecom via Wccftech)
- FT via AI Weekly and Digital Today (Entity List delay, 10 Nov 2026); Bloomberg Government (Bessent, 13 Nov 2026)
- Commerce–DOJ joint statement via SCMP and Mothership, 16–17 Nov 2026

*Case study prepared 27 November 2026. Informational only; not legal advice.*
