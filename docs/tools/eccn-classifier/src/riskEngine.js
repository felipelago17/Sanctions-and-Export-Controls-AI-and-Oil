/**
 * @module riskEngine
 * @description Aggregate 0-100 risk score with named drivers.
 * Dimensions: ECCN severity (0-30), country risk (0-25),
 * end-user risk (0-20), deployment exposure (0-15), AI dual-use (0-10).
 * @see 15 CFR Part 742 (Control Policy)
 * @see 15 CFR § 746 (Embargoes and Special Controls)
 */

/** ECCN severity weight lookup table */
const ECCN_SEVERITY = {
  'EAR99': 0,
  '5A992': 5,
  '5D992': 5,
  '5A002': 15,
  '5E002': 15,
  '5D002': 20,
  '4D002': 20,
  '3A090': 30,
  '4A090': 30,
  '4E091': 0,       // rescinded 13 May 2025 — no active control; severity 0
  'UNDETERMINED': 20
};

/** Country risk tier to score lookup */
const COUNTRY_TIER_SCORE = { 1: 25, 2: 20, 3: 12, 4: 5 };

/** Risk band thresholds */
const BANDS = [
  { band: 'critical', min: 75, max: 100, color: '#dc2626' },
  { band: 'high',     min: 50, max: 74,  color: '#ea580c' },
  { band: 'medium',   min: 25, max: 49,  color: '#d97706' },
  { band: 'low',      min: 0,  max: 24,  color: '#16a34a' }
];

/**
 * Compute an aggregate risk score (0–100) with dimension breakdown.
 * @param {object} classificationOutput - Output of classify() from classificationEngine
 * @param {object} inputs - User-supplied classification inputs
 * @param {object} countryData - The country_controls.json data object
 * @returns {{score: number, band: string, band_color: string, drivers: Array, country_heat: object, disclaimer: string}}
 * @see 15 CFR Part 742 (Control Policy — risk assessment context)
 */
export function computeRiskScore(classificationOutput, inputs, countryData) {
  const drivers = [];
  const country_heat = {};

  // ── Dimension 1: ECCN Severity (0–30) ──────────────────────────────────────
  // primary_ECCN is null when no CCL rule matched (no_rule_matched / flagged_for_review)
  const primaryECCN = (classificationOutput.summary && classificationOutput.summary.primary_ECCN) || null;
  const matchStatus = (classificationOutput.summary && classificationOutput.summary.match_status) || 'no_rule_matched';
  const eccnLookup = primaryECCN ? (ECCN_SEVERITY[primaryECCN] !== undefined ? ECCN_SEVERITY[primaryECCN] : ECCN_SEVERITY['UNDETERMINED']) : 0;
  // flagged_for_review (e.g. model weights with rescinded 4E091) gets partial severity for risk scoring
  const eccnScore = matchStatus === 'flagged_for_review' && !primaryECCN ? 15 : eccnLookup;
  drivers.push({
    dimension: 'ECCN Severity',
    score: eccnScore,
    max: 30,
    eccn: primaryECCN,
    rationale: !primaryECCN && matchStatus === 'flagged_for_review'
      ? `No primary ECCN (flagged_for_review — e.g. model weights, 4E091 rescinded). Partial severity applied for risk scoring. Human review required.`
      : eccnScore === 0
        ? `${primaryECCN || 'no_rule_matched'}: No active CCL control — lowest ECCN risk tier. Part 744 and Part 746 controls still apply.`
        : `${primaryECCN}: Carries ${eccnScore}/30 severity weight based on NS/AT control level and dual-use potential.`,
    citation: '15 CFR Part 774 Supplement No. 1 (CCL)'
  });

  // ── Dimension 2: Country Risk (0–25) ────────────────────────────────────────
  const destinations = (inputs.destination_countries || []);
  let maxCountryScore = 0;
  let highestRiskCountry = null;

  for (const code of destinations) {
    const upperCode = code.toUpperCase();
    let riskTier = 4;
    let countryName = code;

    if (countryData && countryData.countries && countryData.countries[upperCode]) {
      const data = countryData.countries[upperCode];
      riskTier = data.risk_tier || 4;
      countryName = data.name || code;
    }

    const tierScore = COUNTRY_TIER_SCORE[riskTier] || 5;
    country_heat[upperCode] = { score: tierScore, tier: riskTier, name: countryName };

    if (tierScore > maxCountryScore) {
      maxCountryScore = tierScore;
      highestRiskCountry = countryName;
    }
  }

  if (destinations.length === 0) {
    maxCountryScore = 5; // Unknown destination — treat as minimal risk for scoring; still flag
    drivers.push({
      dimension: 'Country Risk',
      score: 5,
      max: 25,
      rationale: 'No destination country specified. Score set to minimal. Country controls cannot be assessed.',
      citation: '15 CFR § 746 (Embargoes); BIS Country Chart'
    });
  } else {
    drivers.push({
      dimension: 'Country Risk',
      score: maxCountryScore,
      max: 25,
      rationale: `Highest-risk destination: ${highestRiskCountry || destinations[0]} (tier ${Object.values(country_heat).find(c => c.score === maxCountryScore)?.tier || 'N/A'}).` +
        ` Score based on BIS Country Group membership and Part 746 restrictions.`,
      citation: '15 CFR § 746 (Embargoes); 15 CFR Part 740 Supplement No. 1 (Country Groups)'
    });
  }

  // ── Dimension 3: End-User Risk (0–20) ───────────────────────────────────────
  let endUserScore = 0;
  let endUserRationale = 'No entity hits identified in snapshot. Note: snapshot is not a live screen.';

  const entityHits = (classificationOutput.step3_end_use && classificationOutput.step3_end_use.entity_hits) || [];
  let hasSdn = false;
  let hasEntityList = false;
  let hasMeu = false;
  let hasStateOwned = false;

  for (const hit of entityHits) {
    if (!hit.matches || hit.matches.length === 0) continue;
    for (const match of hit.matches) {
      const lt = match.entry.list_type;
      if (lt === 'sdn') hasSdn = true;
      if (lt === 'entity_list') hasEntityList = true;
      if (lt === 'meu') hasMeu = true;
      if (lt === 'state_owned_energy') hasStateOwned = true;
    }
  }

  if (hasSdn) {
    endUserScore = 20;
    endUserRationale = 'SDN match detected — transaction potentially prohibited. Score: 20/20.';
  } else if (hasEntityList) {
    endUserScore = 20;
    endUserRationale = 'Entity List match detected — licence required with policy of denial. Score: 20/20.';
  } else if (hasMeu) {
    endUserScore = 18;
    endUserRationale = 'Military End-User (MEU) match detected — § 744.21 licence required. Score: 18/20.';
  } else if (hasStateOwned) {
    endUserScore = 10;
    endUserRationale = 'State-owned energy entity identified — enhanced due diligence required. Score: 10/20.';
  } else if (entityHits.length > 0) {
    endUserScore = 5;
    endUserRationale = 'End-users declared but not matched in snapshot (unscreened against live lists). Score: 5/20.';
  }

  drivers.push({
    dimension: 'End-User Risk',
    score: endUserScore,
    max: 20,
    rationale: endUserRationale,
    citation: '15 CFR Part 744 Supp. 4 (Entity List); Supp. 7 (MEU List); 31 CFR Part 594 (OFAC SDN)'
  });

  // ── Dimension 4: Deployment Exposure (0–15) ─────────────────────────────────
  let deploymentScore = 0;
  const deploymentModel = (inputs.deployment_model || '').toLowerCase();
  const foreignAccess = inputs.foreign_national_access === true;

  if ((deploymentModel.includes('cloud') || deploymentModel === 'cloud_iaas') && foreignAccess) {
    deploymentScore = 15;
    drivers.push({
      dimension: 'Deployment Exposure',
      score: 15,
      max: 15,
      rationale: 'Cloud/IaaS deployment with declared foreign national access — maximum deemed-export exposure. Score: 15/15.',
      citation: '15 CFR § 734.13 (deemed export); 15 CFR § 734.13–734.16'
    });
  } else if (deploymentModel.includes('cloud') || deploymentModel === 'cloud_iaas') {
    deploymentScore = 10;
    drivers.push({
      dimension: 'Deployment Exposure',
      score: 10,
      max: 15,
      rationale: 'Cloud/IaaS deployment — deemed-export risk present. Foreign national access controls must be verified. Score: 10/15.',
      citation: '15 CFR § 734.13 (deemed export)'
    });
  } else if (deploymentModel === 'hybrid') {
    deploymentScore = 5;
    drivers.push({
      dimension: 'Deployment Exposure',
      score: 5,
      max: 15,
      rationale: 'Hybrid deployment — partial cloud exposure. Deemed-export risk depends on cloud component. Score: 5/15.',
      citation: '15 CFR § 734.13 (deemed export)'
    });
  } else {
    deploymentScore = 0;
    drivers.push({
      dimension: 'Deployment Exposure',
      score: 0,
      max: 15,
      rationale: 'On-premises deployment — lowest deployment exposure score. Physical access controls still required. Score: 0/15.',
      citation: '15 CFR § 734.13 (deemed export)'
    });
  }

  // ── Dimension 5: AI Dual-Use (0–10) ─────────────────────────────────────────
  let aiScore = 0;
  let aiRationale = 'No specific AI dual-use concern identified.';
  const aiAttrs = inputs.ai_attributes || {};
  const intendedUse = aiAttrs.intended_use || 'general';
  const isModelWeights = aiAttrs.is_model_weights === true;
  const fineTuning = aiAttrs.fine_tuning_offered === true;

  if (intendedUse === 'dual_use_concern' && isModelWeights) {
    aiScore = 10;
    aiRationale = 'Dual-use concern + model weights — highest AI dual-use risk. Score: 10/10.';
  } else if (intendedUse === 'dual_use_concern') {
    aiScore = 7;
    aiRationale = 'Dual-use concern flagged — § 744.22 emerging tech review warranted. Score: 7/10.';
  } else if (fineTuning) {
    aiScore = 5;
    aiRationale = 'Fine-tuning capability offered — additional due diligence on end-user access to model internals. Score: 5/10.';
  } else {
    aiScore = 0;
    aiRationale = 'General-purpose AI — no specific dual-use flag. EAR Part 744 still applies. Score: 0/10.';
  }

  drivers.push({
    dimension: 'AI Dual-Use',
    score: aiScore,
    max: 10,
    rationale: aiRationale,
    citation: '15 CFR § 744.22 (emerging/foundational technologies); 90 FR 4544 (AI Diffusion Rule IFR)'
  });

  // ── Aggregate ────────────────────────────────────────────────────────────────
  const rawScore = eccnScore + maxCountryScore + endUserScore + deploymentScore + aiScore;
  const score = Math.min(100, Math.max(0, rawScore));
  const bandEntry = BANDS.find(b => score >= b.min && score <= b.max) || BANDS[BANDS.length - 1];

  return {
    score,
    band: bandEntry.band,
    band_color: bandEntry.color,
    drivers,
    country_heat,
    disclaimer: 'Risk score is indicative and for triage only. It does not substitute for legal analysis, BIS CCATS determination, or OFAC sanctions compliance review.'
  };
}
