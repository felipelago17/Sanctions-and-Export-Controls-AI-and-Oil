# Sanctions and Export Controls — AI, Advanced Computing & Oil/Energy

> **Access Notice:** This is a private repository. All source code, data
> pipelines, automation workflows, and analytical content are proprietary.
> See [LICENSE](./LICENSE) for terms. To request access, contact
> **fe_lago@yahoo.com.br**.

---

## Public Documentation Site

The rendered documentation is publicly available at:

**<https://felipelago17.github.io/Sanctions-and-Export-Controls-AI-and-Oil-site/>**

The public site is built automatically from this private repository via
GitHub Actions. No source code or proprietary logic is exposed.

---

## About

A curated resource on **US export controls and sanctions** as applied to
artificial intelligence, advanced computing, and the oil/energy sector.

Maintained by **Felipe Villasuso Lago** (AIQ / London South Bank University — LSBU).

> **Disclaimer:** This resource is for informational and academic purposes only
> and does not constitute legal advice. All content is compiled exclusively from
> **publicly available sources** — official government publications, regulatory
> texts, legislative materials, press releases, and open-access analysis.
> No proprietary, confidential, subscription-only, or privileged material is
> reproduced. Entries in the designations register that could not be retrieved
> at the time of indexing are flagged accordingly and based solely on publicly
> stated metadata. Always consult qualified export-control and sanctions counsel
> before taking any compliance decision.

---

## Scope

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
docs/                            — MkDocs source content
regulations/                     — regulatory analysis documents
jurisdictions/                   — designations register by country/year
news/
  digest.md                      — daily auto-updated digest
.github/workflows/
  daily-update.yml               — daily digest scraper (07:00 UTC)
  weekly-update.yml              — weekly digest scraper (Mon 08:00 UTC)
  bis-affiliates-monitor.yml     — weekday 06:00 UTC BIS Affiliates Rule AI monitor + Monday synthesis
  deploy-docs.yml                — builds site → pushes to public docs repo
mkdocs.yml                       — MkDocs Material configuration
CITATION.cff                     — citation metadata
LICENSE                          — proprietary licence
```

---

## Related Repositories

Part of a connected research and monitoring stack on AI governance, export controls, and joint-venture / energy-transition governance:

- **[AI Regulatory Monitor](https://github.com/felipelago17/AI-regulatory-monitor)** — automated tracking of AI, export-control, and sanctions rulemaking (Federal Register triage loop, Anthropic API, Slack alerting).
- **[Responsible-AI-evaluation](https://github.com/felipelago17/Responsible-AI-evaluation)** — evaluation methods and governance frameworks for responsible AI deployment.
- **[Joint Ventures and Energy Trilemma](https://github.com/felipelago17/Joint-ventures-and-Energy-Trilemma-)** — comparative JV governance research (UAE / Norway), CCUS source registers, and the "computational sovereignty" thesis linking compute infrastructure to national energy autonomy.

> Built on MkDocs Material with GitHub Actions for continuous, auditable updates.

---

## Citation

See [CITATION.cff](./CITATION.cff) for formal citation metadata.
The `CITATION.cff` file is also published in the public docs repository
so it remains citable at the public URL.

---

## Intellectual Property

All content in this repository — including source code, data pipelines,
workflow logic, and curated analytical content — is the proprietary
intellectual property of Felipe Villasuso Lago. Unauthorised reproduction
or distribution is strictly prohibited. See [LICENSE](./LICENSE).
