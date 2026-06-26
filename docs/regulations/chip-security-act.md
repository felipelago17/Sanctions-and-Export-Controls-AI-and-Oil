# Chip Security Act (H.R. 3447 / S. 1705)
## Physical Location Verification as an Export-Control Instrument — Analytical Note

**Bill status (as of 22 Jun 2026):** Passed House Foreign Affairs Committee markup 26 Mar 2026. No floor action or enactment confirmed. Congress.gov returned 403 at automated verification — confirm manually before citing as enacted.

**ECCN anchors:** 3A090, 3A001.z, 4A090, 4A003.z (and successor ECCNs designating advanced computing integrated circuits and accelerators).

> **Disclaimer:** This note is for informational and academic purposes only and does not constitute legal advice. Sources returned 403 (anti-bot/paywall) at automated verification; manual confirmation required before reliance. Interested-party disclosures are provided in Section 4.

---

## 1. Position in the Control Architecture

Current EAR practice secures chip exports at a single chokepoint: the point of export. An H100 (ECCN 3A090) leaves a US port under licence, accompanied by an end-user statement — and BIS has limited real-time visibility into where the chip physically resides thereafter. The Chip Security Act's core mechanism, **Position-Based Location Verification (PBLV)** — hardware-anchored geolocation attestation embedded in covered chips — would close that gap by making chip location machine-readable and reportable on an ongoing basis.

PBLV adds a post-export geographic layer to a regime that already operates on three vectors:

| Vector | Legal basis | Scope | CSA relationship |
|---|---|---|---|
| Export licensing | EAR Part 742; ECCN 3A090 | Point-of-export | Unchanged |
| End-use/end-user checks | EAR §§ 744.11–744.22 | Entity-level | PBLV generates real-time audit trail |
| BIS Affiliates / 50% Rule | EAR § 744.21; IFR 90 FR 47201 | Ownership chain | Complementary — Affiliates Rule handles attribution; PBLV handles geography |

The bill directs Commerce to issue implementing regulations within 180 days of enactment, leaving substantial discretion over covered-chip thresholds, reporting intervals, and enforcement triggers.

---

## 2. Diversion Typology and the PBLV Response

Documented chip-diversion cases cluster around three routes:

**Transshipment via third-country intermediaries.** Chips licensed to a permissive jurisdiction (Singapore, UAE, Turkey) are re-exported to a restricted end-user. This is currently the dominant documented diversion vector. PBLV would, in principle, flag a chip appearing in an undisclosed location and trigger a reporting obligation.

**Front-company end-user statements.** A shell entity with a clean record obtains a licence; beneficial ownership is obscured through multi-tier structures. PBLV does not directly address this vector — a shell company physically in a permitted country can still host the chip at a permitted location. The BIS Affiliates Rule (EAR § 744.21) is the better instrument here.

**Secondary and grey markets.** Chips sold domestically or to allied buyers enter resale channels. Whether PBLV reporting obligations extend to downstream purchasers is ambiguous in the bill's current text.

PBLV is best understood as a **transshipment-detection instrument**: strongest against the first vector, ineffective against the second, and uncertain against the third. It does not displace the Affiliates Rule — it adds a complementary geographic dimension the ownership-chain rule cannot reach.

---

## 3. Feasibility vs. Mandate Tension

The bill's rule of construction prohibiting "kill-switch or geofencing" functionality creates a structural tension: PBLV can identify a misplaced chip but cannot disable or quarantine it. Enforcement remains dependent on BIS's existing administrative tools — denial orders, temporary denial orders, criminal referrals — which operate on weeks-to-months timescales. PBLV is therefore a **detection and evidence instrument**, not a real-time interdiction capability.

Three technical challenges remain unresolved in publicly available materials:

1. **Attestation spoofing.** State-level adversaries can relay false GPS or network-location signals to a firmware attestation module (the component that signs location reports). Hardware security enclaves reduce but do not eliminate this risk. No PBLV specification has been published; the bill delegates the standard to Commerce.

2. **Virtualisation and cloud gap.** A covered chip inside a cloud data centre may serve workloads routed globally, even if the physical chip is in a compliant jurisdiction. The bill does not clearly assign reporting obligations between cloud operator, workload operator, and chip owner for virtualised compute.

3. **Legacy hardware.** Chips manufactured before PBLV firmware becomes mandatory will not be retrofitted. Given the installed base of pre-2026 ECCN 3A090 accelerators, the coverage gap could persist for five or more years post-enactment even if the bill passes promptly.

---

## 4. Interested Parties and Positions

The following organisations have disclosed commercial interests in the CSA's outcome. Their factual claims are not reproduced as established fact; positions are separated from evidence.

**Opposing — chip industry:**

- **SIA (Semiconductor Industry Association)** contends PBLV imposes unverifiable compliance costs, creates a single-point-of-failure attack surface in the attestation layer, and will disadvantage US chips relative to non-PBLV foreign alternatives. *Disclosure: SIA represents US chipmakers; a PBLV mandate increases their manufacturing and compliance costs directly.*
- **ITI (Information Technology Industry Council)** and **SIIA (Software & Information Industry Association)** raise cloud-deployment complexity and supply-chain overhead. *Disclosure: both represent chip buyers and integrators with interests in reduced regulatory friction.*

**Supporting — verification vendors:**

- **GeoComply, Multibeam, Fortaegis** each provide location-verification or hardware-security technology that PBLV implementation would require at scale. *Disclosure: a federal PBLV mandate represents direct commercial upside for each firm.*

**Notable absence:** NVIDIA's public position was not found in the source set assembled for this note. Given that NVIDIA's H100/H200/B200 products constitute the dominant share of covered ECCN 3A090 chips in the field, its stance on implementation cost and feasibility is material to the policy debate. Verify separately before treating the industry position as uniform.

---

## 5. Computational Sovereignty and Cross-Repository Links

The CSA's geographic-fixity logic intersects with a broader argument — developed in the *[Joint Ventures and Energy Trilemma](https://github.com/felipelago17/Joint-ventures-and-Energy-Trilemma-)* repository — that **compute-geography is becoming legally operative**: the physical location of a chip increasingly matters for export-control, tax, data-sovereignty, and energy-transition purposes simultaneously.

If enacted and implemented, PBLV would transform chip location from a physical fact into a **documented legal fact** — creating a machine-readable record subpoenable in enforcement proceedings. Implications extend to:

- **Deemed-export analysis** (EAR §§ 734.13–734.16): access to a covered chip at a foreign location constitutes a deemed export; PBLV records would directly evidence the location of access.
- **Fable–Mythos case** (`cases/2026-06-anthropic-fable-mythos-deemed-export.md`): if future model-weight transfers are gated on physical chip location, PBLV records become direct evidence in deemed-export determinations involving AI model training.
- **OFAC 50% Rule / BIS Affiliates Rule convergence**: shell structures used to obscure chip-location ownership may simultaneously trigger § 744.21 attribution and OFAC aggregation — requiring parallel analysis under both regimes.

---

## 6. Compliance Takeaways

For organisations currently operating or planning to deploy covered ECCN 3A090, 3A001.z, 4A090, or 4A003.z systems:

1. **Inventory your installed base now.** The first likely compliance obligation post-enactment will be a location-reporting exercise against existing hardware. Companies without chip-serial-number tracking will face a remediation scramble.

2. **Engage the 180-day Commerce rulemaking.** The bill leaves substantial discretion to BIS on covered thresholds, reporting intervals, and enforcement triggers. The comment period is the primary leverage point for shaping implementation scope.

3. **Segregate attestation infrastructure.** If chips report PBLV data to a Commerce-designated registry, that reporting channel becomes a supply-chain attack surface. Security architecture should treat the attestation endpoint as a high-value target.

4. **Do not conflate PBLV with the Affiliates Rule.** A chip physically in a permitted location can still be beneficially owned through a controlled-entity chain that triggers § 744.21. Both the geographic and the ownership-chain analyses are required — neither substitutes for the other.

---

## Open Questions and Watch Terms

| Question | Status |
|---|---|
| Senate path for S. 1705 | Not confirmed out of committee as of 22 Jun 2026 |
| Floor scheduling for H.R. 3447 | Unconfirmed |
| Allied-country carve-outs in bill text | Text review required — automated check returned 403 |
| NVIDIA's public position | Not found in source set |
| Attestation standard (TEE / TPM / novel spec) | Delegated to Commerce rulemaking |
| Cloud-access reporting obligations | Ambiguous in current text |
| Legacy hardware sunset / upgrade mandate | Not addressed in available bill text |

| Watch term | Trigger |
|---|---|
| `PBLV` / `position-based location verification` | Commerce NPRM or interim final rule |
| `H.R. 3447` / `S. 1705` | Floor scheduling, amendment, vote |
| `chip location reporting` | BIS enforcement guidance or FAQ |
| `attestation` + `EAR` | BIS advisory opinion or FAR/DFARS crossover |
| `ECCN 3A090` + `reporting` | New licence condition in BIS decision |

---

*Sources: H.R. 3447 bill text (House Foreign Affairs Committee markup, 26 Mar 2026); S. 1705 companion bill; SIA public comments on PBLV; GeoComply, Multibeam, Fortaegis industry submissions; BIS IFR 90 FR 47201 (BIS Affiliates Rule); EAR §§ 742, 744; 15 CFR §§ 734.13–734.16. All URLs returned 403 at automated verification — confirm manually before citing. Bill status: passed House Foreign Affairs Committee 26 Mar 2026; no floor action or enactment confirmed as of 22 Jun 2026.*
