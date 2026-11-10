# OpenSanctions — An Open Data Model That Adapts to New Sanctions Targets (Nov 2026)

**Source:** OpenSanctions, *How we've built an open data model that adapts to whatever gets sanctioned next*, 5 November 2026 (no individual author stated).

**Why it is here:** sanctions now designate vessels, aircraft, crypto wallets and infrastructure as well as persons. The article explains how an open, extensible schema handles that, which bears directly on screening design and on how this repository's pipelines should model non-person targets.

> **Source status:** Vendor/project self-description. Design claims (traceability, accuracy gains from open methodology) are the publisher's own and have not been independently tested here.

---

## The Model

- OpenSanctions is built on the **FollowTheMoney (FtM)** data model, which describes people, companies and assets and the relationships between them. FtM began as an investigative-journalism tool and was revised as sanctions changed; it also underpins the Aleph / OpenAleph ecosystem.
- The stack is open source so each screening result can be traced to its source data.
- **Inheritance-based schemata:** e.g. a Vessel is an Asset, and an Asset is a Thing, so new target types (crypto wallets, for instance) can be added without redesigning the model.

## Why Sanctions Targets Changed

Since 2022 designations have moved from oligarchs, companies and banks to supply chains, crypto wallets and physical infrastructure such as ports and refineries. The article points to the EU's 20+ Russia packages — shadow-fleet vessels, third-country trade routes, alternative payment channels and crypto platforms — citing the October 2026 package (about 1,569 military-industrial entities), the 21st package (banks, crypto operators, vessels, refineries) and the 20th (transaction bans on Russian and Indonesian ports and terminals).

## Entities and Fields

| Entity | Identifier / feature | Screening consequence |
|---|---|---|
| **Vessel** | IMO number persists through renames, sales and reflagging; past flags and names retained | Match on IMO, not name; vessel history stays traceable |
| **Airplane** | Serial number, registration, model, build date | Aircraft screened on their own identifiers |
| **Relationships** | Owner, operator, technical manager, classification society linked in one graph, with ownership/control, percentages and start/end dates where available | A hit can be traced outward to the corporate network — supports ownership aggregation work |

## Implications for Screening

1. Vessels, aircraft and other assets are screened as targets **regardless of current ownership**.
2. Graph links let one hit be traced to the wider network (shadow-fleet structures).
3. A shared schema lets entries from different lists be combined and compared.
4. Extensible schemata absorb new designation categories as regulations change.
5. Open methodology allows external review by compliance teams, journalists, regulators and designated parties.

## Relevance to This Repository

- **Ownership aggregation:** percentage and date-bounded ownership edges are the data needed for the [OFAC 50% Rule](../regulations/ofac-ubo-50-percent-rule.md) and the [BIS Affiliates Rule](../regulations/uae/bis-affiliates-rule.md); the Consolidated Screening List alone does not surface constructively listed entities.
- **Shadow fleet and oil:** IMO-based matching and ownership/manager edges map onto [Sanctions — Oil & Energy](../regulations/sanctions-oil-energy.md) and the [Operation Economic Outcast](../cases/2026-08-operation-economic-outcast-iran-shipping.md) case.
- **Method:** see [Screening Methodology](index.md) and [Additional Sources — Monitoring Tools & Databases](../additional-sources.md).

---

## Sources

- OpenSanctions, *How we've built an open data model that adapts to whatever gets sanctioned next*, 5 Nov 2026 — <https://www.opensanctions.org/articles/2026-11-05-open-data-model/>

---

*Note prepared 10 November 2026. Informational only; not legal advice.*
