# Regulatory Visuals & Decision Tools

Interactive diagrams for navigating US export controls and sanctions frameworks. All diagrams are rendered in-browser via Mermaid.

---

## Regulatory Timeline: AI & Energy Sanctions (2022–2026)

```mermaid
timeline
    title Key US Export Controls & Sanctions Events
    section 2022
        Oct 7 : BIS Advanced Computing Rule
              : First GPU/chip ECCN controls (3A090)
              : Entity List — Yangtze Memory, CXMT
    section 2023
        Oct 17 : "October 17" Rule Update
               : Expanded chip controls, updated TPP thresholds
               : Huawei Mate 60 Pro triggers review
    section 2024
        Jan–Dec : AI governance debates intensify
                : Proposed AI Diffusion Rule published Dec 2024
    section 2025
        Jan 15 : AI Diffusion Rule — Interim Final Rule
               : Three-tier country framework enacted
               : New ECCNs for AI model weights
        May    : AI Diffusion Rule officially paused
               : BIS elevates compliance guidance regardless
        Oct    : BIS Affiliates Rule enacted
               : 50% Rule extended to Entity List & MEU List
    section 2026
        Jun    : Repository established — AIQ / LSBU
        Nov 10 : ⚠️ BIS Affiliates Rule snap-back date
```

---

## AI Hardware Export: Compliance Decision Tree

```mermaid
flowchart TD
    A([AI Hardware / Software / Technology]) --> B{Subject to EAR?}
    B -- "Open source,\npublicly available,\nno US-person control" --> C([✅ Not subject to EAR])
    B -- Yes --> D{Determine ECCN}
    D -- EAR99 --> C
    D -- "3A090\nAdvanced chips\n≥ TPP threshold" --> E{Destination country tier?}
    D -- "5E002\nEncryption technology" --> F{Mass-market eligible?}
    D -- "4E001 / 5D002\nSoftware" --> G{End-use / end-user check}
    E -- "Tier 1\nUS allies" --> H([✅ Licence exception\nauthorized — report])
    E -- "Tier 2\nGeneral commercial" --> I{Data Centre\nValidated End User?}
    E -- "Tier 3\nEmbargo / restricted" --> J([❌ Licence required\nPolicy of denial])
    I -- Yes DCVEU --> H
    I -- No --> K([📋 Licence application\nrequired])
    F -- Yes --> L([✅ Section 740.17 ENC\nAnnual reporting])
    F -- No --> M([📋 ENC review\nor licence needed])
    G --> N{Entity List\nMEU List\nUVL check?}
    N -- Listed or\naffiliate of listed --> J
    N -- Clean --> O([✅ Proceed with\nstandard due diligence])

    style C fill:#16a34a,color:#fff
    style H fill:#16a34a,color:#fff
    style L fill:#16a34a,color:#fff
    style O fill:#16a34a,color:#fff
    style J fill:#dc2626,color:#fff
    style K fill:#d97706,color:#fff
    style M fill:#d97706,color:#fff
```

---

## OFAC 50% Rule: Ownership Aggregation Chains

The diagram below illustrates how SDN restrictions flow through ownership structures — including cases where no single SDN holds ≥ 50% alone.

```mermaid
graph TD
    SDN1["🔴 SDN Entity A\n(e.g. sanctioned bank)"]
    SDN2["🔴 SDN Entity B\n(e.g. state oil company)"]

    SDN1 -->|"owns 60%"| Sub1["⛔ Subsidiary X\nBLOCKED — 60% ≥ 50%"]
    SDN1 -->|"owns 30%"| JV["Joint Venture Co."]
    SDN2 -->|"owns 25%"| JV
    JV   -->|"30% + 25% = 55%\naggregate ≥ 50%"| JV_BLOCKED["⛔ Joint Venture Co.\nBLOCKED — aggregate rule"]
    Sub1 -->|"owns 80%"| GC["⛔ Grandchild Entity\nBLOCKED — indirect chain"]
    SDN1 -->|"owns 40%"| Safe["✅ Holding Co.\nNOT blocked — 40% < 50%\n(verify no other SDN stake)"]

    style SDN1 fill:#dc2626,color:#fff
    style SDN2 fill:#dc2626,color:#fff
    style Sub1 fill:#ef4444,color:#fff
    style JV_BLOCKED fill:#ef4444,color:#fff
    style GC fill:#ef4444,color:#fff
    style Safe fill:#16a34a,color:#fff
    style JV fill:#f97316,color:#fff
```

> **Key rule:** Aggregation applies even where no single SDN holds ≥ 50% alone. Always trace full ownership chains and add up all SDN-held stakes. See [OFAC FAQ 1521](./regulations/ofac-ubo-50-percent-rule.md).

---

## BIS Affiliates Rule: Scope Diagram

```mermaid
graph LR
    EL["Entity List Party\nor MEU List Party"]
    UVL["Unverified List\nor MIEU Party"]

    EL -->|"owns ≥ 50%\n(direct or indirect)"| AF1["⛔ Affiliate A\nLicence required\n(policy of denial)"]
    EL -->|"aggregate ≥ 50%\nwith other EL parties"| AF2["⛔ Affiliate B\nAggregation applies"]
    UVL -->|"owns ≥ 50%"| AF3["⚠️ Affiliate C\nHeightened scrutiny"]
    AF1 -->|"owns ≥ 50%"| AF4["⛔ Sub-affiliate\nChain extends downstream"]

    SNAPBACK["⚠️ Snap-back:\n10 Nov 2026\nUnless extended"]

    style EL fill:#dc2626,color:#fff
    style UVL fill:#f97316,color:#fff
    style AF1 fill:#ef4444,color:#fff
    style AF2 fill:#ef4444,color:#fff
    style AF3 fill:#f59e0b,color:#fff
    style AF4 fill:#ef4444,color:#fff
    style SNAPBACK fill:#7c3aed,color:#fff
```

---

## Russian Oil Price Cap: Compliance Chain

```mermaid
graph TD
    Cargo["Russian Crude Oil\n(seaborne)"] --> Ship["Tanker\n(any flag)"]
    Ship --> Svc["Services Chain"]

    Svc --> Owner["Shipowner"]
    Svc --> Charter["Charterer"]
    Svc --> Broker["Broker"]
    Svc --> Insurer["P&I Club / Insurer"]
    Svc --> Bank["Trade Finance Bank"]

    Cap["G7 Price Cap\nUSD 60/bbl crude\nUSD 45/bbl fuel oil\nUSD 100/bbl premium"]

    Owner -->|"Must attest price\n≤ cap at sale"| Cap
    Charter --> Cap
    Broker --> Cap
    Insurer --> Cap
    Bank --> Cap

    Cap -->|"Price > cap\nor no attestation"| Sanction["⛔ SDN designation\nof vessel / operator\nOFAC enforcement"]
    Cap -->|"Price ≤ cap\n+ valid attestation"| OK["✅ Services\npermitted"]

    style Sanction fill:#dc2626,color:#fff
    style OK fill:#16a34a,color:#fff
    style Cap fill:#1d4ed8,color:#fff
```

---

*Diagrams rendered with [Mermaid](https://mermaid.js.org/). Source: `docs/visuals.md`.*
