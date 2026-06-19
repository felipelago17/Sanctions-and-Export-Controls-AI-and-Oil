# Sanctions and Export Controls — AI, Advanced Computing & Oil/Energy

A curated resource on **US export controls and sanctions** as applied to artificial intelligence, advanced computing, and the oil/energy sector.

Maintained by **Felipe Villasuso Lago** (AIQ / London South Bank University — LSBU).

> **Disclaimer:** This resource is for informational and academic purposes only and does not constitute legal advice. All content is compiled exclusively from **publicly available sources** — official government publications, regulatory texts, legislative materials, press releases, and open-access analysis. No proprietary, confidential, subscription-only, or privileged material is reproduced. Entries in the designations register that could not be retrieved at the time of indexing are flagged accordingly and based solely on publicly stated metadata. Always consult qualified export-control and sanctions counsel before taking any compliance decision.

---

## Scope

This repository collects primary regulatory sources, law-firm analysis, enforcement guidance, and weekly news digests covering:

- Bureau of Industry and Security (BIS) Export Administration Regulations (EAR)
- OFAC sanctions programmes and the 50% / UBO aggregation rule
- AI Diffusion Rule and advanced-computing export controls
- BIS Affiliates Rule (snaps back 10 November 2026)
- Encryption controls and open-source software scope
- Extraterritorial jurisdiction and enforcement
- Sanctions exposure in the oil, gas & energy sector

---

## Repository Structure

```
regulations/
  primary-sources.md             — EAR, AI Diffusion Rule, OFAC, DOJ NSD
  ai-advanced-tech-export-controls.md
  extraterritorial-enforcement.md
  encryption-open-source.md
  ofac-ubo-50-percent-rule.md
  bis-affiliates-rule.md
  sanctions-oil-energy.md
news/
  digest.md                      — weekly auto-updated digest
.github/workflows/
  weekly-update.yml              — Monday 08:00 UTC scraper workflow
  daily-update.yml               — daily 07:00 UTC broad digest scraper
  bis-affiliates-monitor.yml     — weekday 06:00 UTC BIS Affiliates Rule AI monitor + Monday synthesis
mkdocs.yml                       — GitHub Pages (MkDocs) configuration
CITATION.cff
```

---

## Related Repositories

Part of a connected research and monitoring stack on AI governance, export controls, and joint-venture / energy-transition governance:

- **[AI Regulatory Monitor](https://github.com/felipelago17/AI-regulatory-monitor)** — automated tracking of AI, export-control, and sanctions rulemaking (Federal Register triage loop, Anthropic API, Slack alerting).
- **[Sanctions & Export Controls Monitor](https://github.com/felipelago17/Sanctions-and-Export-Controls-AI-and-Oil)** — daily monitoring of BIS, OFAC, Entity List / MEU List / SDN developments, with a standing focus on the BIS Affiliates Rule (50% Rule) and its 10 Nov 2026 reimposition.
- **[Responsible-AI-evaluation](https://github.com/felipelago17/Responsible-AI-evaluation)** — evaluation methods and governance frameworks for responsible AI deployment.
- **[Joint Ventures and Energy Trilemma](https://github.com/felipelago17/Joint-ventures-and-Energy-Trilemma-)** — comparative JV governance research (UAE / Norway), CCUS source registers, and the "computational sovereignty" thesis linking compute infrastructure to national energy autonomy.

> Built on MkDocs Material with GitHub Actions for continuous, auditable updates.

---

## Documentation Site

This repository is published via **MkDocs + GitHub Pages**. After enabling Pages in repository settings (source: `gh-pages` branch), the site will be available at:

```
https://felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil/
```

---

## Citation

See [CITATION.cff](./CITATION.cff) for formal citation metadata.

---

## Disclaimer

This resource is for informational and academic purposes only and does not constitute legal advice. All content is compiled exclusively from **publicly available sources** — official government publications, regulatory texts, legislative materials, press releases, and open-access analysis. No proprietary, confidential, subscription-only, or privileged material is reproduced. Entries in the designations register that could not be retrieved at the time of indexing are flagged accordingly and based solely on publicly stated metadata. Always consult qualified export-control and sanctions counsel before taking any compliance decision.
