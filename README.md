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
> reproduced. Always consult qualified export-control and sanctions counsel
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
  deploy-docs.yml                — builds site → pushes to public docs repo
mkdocs.yml                       — MkDocs Material configuration
CITATION.cff                     — citation metadata
LICENSE                          — proprietary licence
```

---

## Related Repositories

| Repository | Description |
|---|---|
| [AI-regulatory-monitor](https://github.com/felipelago17/AI-regulatory-monitor) | Broader AI regulatory landscape monitoring |
| [Joint-ventures-and-Energy-Trilemma-](https://github.com/felipelago17/Joint-ventures-and-Energy-Trilemma-) | Joint venture structuring under the energy trilemma |
| [Responsible-AI-evaluation](https://github.com/felipelago17/Responsible-AI-evaluation) | Framework for stress-testing AI systems |

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
