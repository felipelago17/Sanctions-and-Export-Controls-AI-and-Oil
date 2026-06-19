/**
 * @module classificationEngine
 * @description Classification Engine — STEP 1–5 decision logic for ECCN classification.
 * Each step returns { result, rules_fired: [], citations: [] }.
 * Outputs are indicative and non-binding. Not legal advice.
 * @see 15 CFR Parts 730–774 (Export Administration Regulations)
 */

import { evaluateTrigger, getCountryRisk, screenEntity } from './rulesEngine.js';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — Is the item subject to the EAR?
// EAR § 734 — Scope of the EAR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Determine whether an item is subject to the EAR.
 * @param {object} inputs - User-supplied classification inputs
 * @returns {{subject_to_EAR: boolean, fdpr_flag: boolean, rules_fired: string[], justification: string[], citations: string[]}}
 * @see 15 CFR § 734.3 (Items subject to the EAR)
 * @see 15 CFR § 734.9 (Foreign Direct Product Rule)
 */
export function isSubjectToEAR(inputs) {
  const rules_fired = [];
  const justification = [];
  const citations = [];
  let subject_to_EAR = false;
  let fdpr_flag = false;

  // EAR § 734.3(a)(1) — US-origin items are always subject to the EAR
  if (inputs.origin === 'US') {
    subject_to_EAR = true;
    rules_fired.push('§ 734.3(a)(1) — US-origin item');
    justification.push('Item originates in the United States and is subject to the EAR by origin.');
    citations.push('15 CFR § 734.3(a)(1)');
  }

  // EAR § 734.9 — Foreign Direct Product Rule flag
  // EAR § 734.3(a)(4) — Foreign items incorporating US-controlled content
  if (inputs.contains_us_tech === true) {
    subject_to_EAR = true;
    fdpr_flag = true;
    rules_fired.push('§ 734.3(a)(4) / § 734.9 — Contains US technology (FDPR analysis required)');
    justification.push(
      'Item incorporates US-origin technology or software. This may extend EAR jurisdiction to foreign-produced items ' +
      'under the Foreign Direct Product Rule (§ 734.9). A separate FDPR analysis is required to determine whether ' +
      'non-US-produced components are also subject to the EAR. Do not auto-decide — seek export counsel.'
    );
    citations.push('15 CFR § 734.9 (Foreign Direct Product Rule)', '15 CFR § 734.3(a)(4)');
  }

  // Non-US origin without US tech: may or may not be subject
  if (inputs.origin !== 'US' && !inputs.contains_us_tech) {
    rules_fired.push('§ 734 — Non-US origin, no declared US tech content');
    justification.push(
      'Item is declared as non-US origin with no US technology content. It may still be subject to the EAR ' +
      'if it meets FDPR criteria or was produced using US equipment. Confirm with export counsel.'
    );
    citations.push('15 CFR § 734.3', '15 CFR § 734.4 (de minimis rules)');
    // Cannot confirm subject_to_EAR without further analysis; flag as uncertain
    fdpr_flag = true;
  }

  return { subject_to_EAR, fdpr_flag, rules_fired, justification, citations };
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — ECCN Mapping
// EAR Part 774, Supplement No. 1 (Commerce Control List)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Map inputs to candidate ECCNs using rules from eccn_rules.json.
 * @param {object} inputs - User-supplied classification inputs
 * @param {object} rulesData - The eccn_rules.json data object
 * @returns {{primary_ECCN: string|null, candidates: Array, unverified_rules: string[], confidence: string, rules_fired: string[], citations: string[], ai_flags: string[]}}
 * @see 15 CFR Part 774 Supplement No. 1 (Commerce Control List)
 */
export function mapECCN(inputs, rulesData) {
  const candidates = [];
  const unverified_rules = [];
  const rules_fired = [];
  const citations = [];
  const ai_flags = [];

  if (!rulesData || !Array.isArray(rulesData.eccn_rules)) {
    return {
      primary_ECCN: 'UNDETERMINED',
      candidates: [],
      unverified_rules: ['Rules data not loaded'],
      confidence: 'low',
      rules_fired: [],
      citations: [],
      ai_flags: []
    };
  }

  // ── AI-specific branch checks (always evaluate these) ───────────────────────

  // Model weights flag
  // EAR: 90 FR 4544 (Jan. 15, 2025) — AI Diffusion Rule IFR
  if (inputs.ai_attributes && inputs.ai_attributes.is_model_weights === true) {
    ai_flags.push('MODEL_WEIGHTS_FLAG: Item is or includes AI model weights. Thresholds for EAR control are [TODO] — human review required. See 90 FR 4544 (Jan. 2025).');
    unverified_rules.push('MODEL_WEIGHTS_NOTE — thresholds not populated from current CCL');
    citations.push('90 FR 4544 (Jan. 15, 2025) — AI Diffusion Rule IFR');
  }

  // SaaS/IaaS deemed-export concern
  // EAR § 734.13 — deemed export
  if (inputs.deployment_model && (inputs.deployment_model.includes('cloud') || inputs.deployment_model === 'cloud_IaaS')) {
    ai_flags.push('SAAS_IAAS_FLAG: Cloud/IaaS deployment — deemed-export analysis required for foreign national users. See 15 CFR §§ 734.13–734.16.');
    citations.push('15 CFR § 734.13 (deemed export)');
  }

  // Foreign national access — deemed export
  if (inputs.foreign_national_access === true) {
    ai_flags.push('DEEMED_EXPORT_FLAG: Foreign national access declared. Deemed export to the national\'s home country must be analysed. See 15 CFR §§ 734.13–734.16.');
    citations.push('15 CFR § 734.13–734.16 (deemed export)');
  }

  // Dual-use catch-all
  // EAR § 744.22 — emerging/foundational tech
  if (inputs.ai_attributes && inputs.ai_attributes.intended_use === 'dual_use_concern') {
    ai_flags.push('DUAL_USE_FLAG: Intended use flagged as dual_use_concern — Part 744.22 (emerging/foundational tech) review warranted.');
    citations.push('15 CFR § 744.22 (emerging and foundational technologies)');
  }

  // ── Evaluate ECCN rules ─────────────────────────────────────────────────────
  for (const rule of rulesData.eccn_rules) {
    if (!Array.isArray(rule.triggers)) continue;

    // Skip fallback rules for now — apply at end
    if (rule.logic === 'FALLBACK' || (rule.triggers.length === 1 && rule.triggers[0].operator === 'fallback')) continue;

    let matchScore = 0;
    let totalTriggers = rule.triggers.filter(t => t.operator !== 'fallback' && !t.field.startsWith('_fallback')).length;
    let hasUnverified = !!rule.unverified;
    const triggersMatched = [];
    const triggersUnverified = [];

    for (const trigger of rule.triggers) {
      if (trigger.operator === 'fallback' || trigger.field.startsWith('_fallback')) continue;
      const result = evaluateTrigger(trigger, inputs);
      if (result.matched) {
        matchScore++;
        triggersMatched.push(trigger.label || trigger.field);
      }
      if (result.unverified) {
        hasUnverified = true;
        if (result.note) triggersUnverified.push(result.note);
      }
    }

    // STANDALONE rules (like MODEL_WEIGHTS_NOTE): match if any trigger fires
    if (rule.logic === 'STANDALONE') {
      if (matchScore > 0) {
        candidates.push({
          eccn: rule.eccn,
          short_name: rule.short_name,
          severity: rule.severity || 0,
          unverified: hasUnverified,
          triggers_matched: triggersMatched,
          confidence_override: rule.confidence_override || null,
          control_reason: rule.control_reason,
          citations: rule.citations || []
        });
        rules_fired.push(`${rule.eccn}: STANDALONE match — ${triggersMatched.join(', ')}`);
        if (rule.citations) citations.push(...rule.citations);
        if (hasUnverified) unverified_rules.push(...triggersUnverified, `${rule.eccn} — ${rule.notes || 'unverified threshold'}`);
      }
      continue;
    }

    // AND logic: all non-meta triggers must match
    if (rule.logic === 'AND') {
      if (totalTriggers > 0 && matchScore === totalTriggers) {
        candidates.push({
          eccn: rule.eccn,
          short_name: rule.short_name,
          severity: rule.severity || 0,
          unverified: hasUnverified,
          triggers_matched: triggersMatched,
          control_reason: rule.control_reason,
          citations: rule.citations || []
        });
        rules_fired.push(`${rule.eccn}: AND match — ${triggersMatched.join(', ')}`);
        if (rule.citations) citations.push(...rule.citations);
        if (hasUnverified) unverified_rules.push(...triggersUnverified);
      }
    }
  }

  // Apply EAR99 fallback if no other non-fallback rules matched
  const nonFallbackCandidates = candidates.filter(c => c.eccn !== 'EAR99' && c.eccn !== 'MODEL_WEIGHTS_NOTE');
  if (nonFallbackCandidates.length === 0 && ai_flags.length === 0) {
    const ear99Rule = rulesData.eccn_rules.find(r => r.eccn === 'EAR99');
    if (ear99Rule) {
      candidates.push({
        eccn: 'EAR99',
        short_name: ear99Rule.short_name,
        severity: 0,
        unverified: false,
        triggers_matched: ['No other CCL rule triggered (fallback)'],
        control_reason: 'None',
        citations: ear99Rule.citations || []
      });
      rules_fired.push('EAR99: Fallback — no other CCL rule triggered');
      if (ear99Rule.citations) citations.push(...ear99Rule.citations);
    }
  }

  // Determine primary ECCN (highest severity)
  const sorted = [...candidates].sort((a, b) => (b.severity || 0) - (a.severity || 0));
  const primary = sorted[0] || null;

  // Confidence calculation
  let confidence = 'high';
  if (unverified_rules.length > 0) confidence = 'medium';
  if (
    ai_flags.some(f => f.includes('MODEL_WEIGHTS')) ||
    inputs.fdpr_flag ||
    (inputs.ai_attributes && inputs.ai_attributes.is_model_weights)
  ) confidence = 'low';
  if (primary && primary.confidence_override) confidence = primary.confidence_override;

  return {
    primary_ECCN: primary ? primary.eccn : 'EAR99',
    primary_details: primary || null,
    candidates: sorted,
    unverified_rules,
    confidence,
    rules_fired,
    citations: [...new Set(citations)],
    ai_flags
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — End-Use / End-User Check
// EAR Part 744 — End-User/End-Use Controls
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check end-use and end-user concerns against Part 744 rules.
 * @param {object} inputs - User-supplied classification inputs
 * @param {object} entityScreeningData - The entity_screening.json object
 * @returns {{flags: string[], entity_hits: Array, rules_fired: string[], citations: string[]}}
 * @see 15 CFR § 744.21 (military end-use)
 * @see 15 CFR § 744.22 (emerging/foundational tech)
 * @see 15 CFR § 744.23 (military intelligence)
 */
export function checkEndUse(inputs, entityScreeningData) {
  const flags = [];
  const entity_hits = [];
  const rules_fired = [];
  const citations = [];

  // § 744.21 — Military end-use check
  const militaryKeywords = ['military', 'defence', 'defense', 'armed forces', 'weapons', 'munitions', 'ordnance', 'naval', 'air force', 'army', 'intelligence service', 'ministry of defence', 'ministry of defense', 'PLA', 'People\'s Liberation Army', 'FSB', 'SVR', 'GRU'];
  const descLower = (inputs.description || '').toLowerCase();
  const militaryMatch = militaryKeywords.some(kw => descLower.includes(kw.toLowerCase()));
  if (militaryMatch) {
    flags.push('MILITARY_END_USE: Description contains military-related keywords — § 744.21 licence requirement may apply.');
    rules_fired.push('§ 744.21 — Military end-use keyword match in description');
    citations.push('15 CFR § 744.21 (military end-use/end-user controls)');
  }

  // § 744.22 — AI/advanced computing items trigger emerging tech review
  if (inputs.industry === 'AI' || (inputs.ai_attributes && inputs.ai_attributes.intended_use)) {
    flags.push('EMERGING_TECH: AI/advanced computing item — § 744.22 emerging and foundational technology review warranted.');
    rules_fired.push('§ 744.22 — AI/advanced computing item in scope of emerging technology controls');
    citations.push('15 CFR § 744.22 (emerging and foundational technologies)');
  }

  // § 744.23 — Military intelligence end-use
  const intelKeywords = ['intelligence', 'surveillance', 'reconnaissance', 'signals intelligence', 'SIGINT', 'HUMINT', 'military intelligence'];
  const intelMatch = intelKeywords.some(kw => descLower.includes(kw.toLowerCase()));
  if (intelMatch) {
    flags.push('MILITARY_INTELLIGENCE: Description indicates potential intelligence end-use — § 744.23 may apply.');
    rules_fired.push('§ 744.23 — Military intelligence end-use keyword match');
    citations.push('15 CFR § 744.23 (military-intelligence end-uses)');
  }

  // Entity screening
  const endUsers = inputs.end_users || [];
  const destCountries = inputs.destination_countries || [];

  for (const userName of endUsers) {
    // Try matching against each destination country
    const countriesToTry = destCountries.length > 0 ? destCountries : [null];
    let userHits = [];
    for (const country of countriesToTry) {
      const hits = screenEntity(entityScreeningData, userName, country);
      userHits = [...userHits, ...hits];
    }
    if (userHits.length > 0) {
      entity_hits.push({ input_name: userName, matches: userHits });
      const listTypes = [...new Set(userHits.map(h => h.entry.list_type))];
      flags.push(`ENTITY_HIT: "${userName}" matched on ${listTypes.join(', ')} — licence may be required or transaction may be prohibited.`);
      citations.push('15 CFR Part 744 Supp. 4 (Entity List)', '15 CFR Part 744 Supp. 7 (MEU List)');
    } else {
      entity_hits.push({ input_name: userName, matches: [] });
    }
  }

  return { flags, entity_hits, rules_fired, citations };
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4 — Country Controls
// EAR Part 746 — Embargoes; Part 740 Supplement 1 — Country Groups
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check destination country controls.
 * @param {object} inputs - User-supplied classification inputs
 * @param {object} countryControlsData - The country_controls.json object
 * @returns {{country_flags: Array, embargoed: boolean, rules_fired: string[], citations: string[]}}
 * @see 15 CFR § 746 (Embargoes and Other Special Controls)
 * @see 15 CFR Part 740 Supplement No. 1 (Country Groups)
 */
export function checkCountryControls(inputs, countryControlsData) {
  const country_flags = [];
  const rules_fired = [];
  const citations = [];
  let embargoed = false;

  const destinations = inputs.destination_countries || [];
  if (destinations.length === 0) {
    country_flags.push('No destination country specified — cannot assess country-level controls. Please specify destination(s).');
    return { country_flags, embargoed, rules_fired, citations };
  }

  for (const countryCode of destinations) {
    const { found, data, riskTier } = getCountryRisk(countryControlsData, countryCode);

    if (!found || !data) {
      country_flags.push(`${countryCode}: Country not found in controls snapshot. Consult BIS Country Chart and Part 746 directly.`);
      citations.push('15 CFR Part 746 (Embargoes)', 'BIS Country Chart (Supplement No. 1 to Part 738)');
      continue;
    }

    const flagEntry = { country: countryCode, name: data.name, risk_tier: riskTier, flags: [], part746: data.part746_restrictions || [] };

    // Risk tier 1: comprehensive embargo
    if (riskTier === 1 || data.comprehensive_embargo) {
      embargoed = true;
      flagEntry.flags.push(`EMBARGOED: ${data.name} is subject to a comprehensive US embargo. Virtually all exports prohibited. OFAC and BIS controls apply.`);
      rules_fired.push(`§ 746 — Comprehensive embargo applies to ${countryCode}`);
      citations.push(...(data.part746_restrictions || []));
    }

    // Risk tier 2: targeted severe restrictions
    if (riskTier === 2 && !data.comprehensive_embargo) {
      flagEntry.flags.push(`TARGETED_RESTRICTIONS: ${data.name} — severe targeted restrictions apply (§ 746 / Country Groups D:1, E:2). Licence likely required for NS1/AT1 items.`);
      rules_fired.push(`§ 746 — Targeted restrictions for ${countryCode}`);
      citations.push(...(data.part746_restrictions || []));
    }

    // Advanced computing restriction (China)
    if (data.advanced_computing_restriction) {
      flagEntry.flags.push(`ADVANCED_COMPUTING: ${data.name} — § 746.9 advanced computing and semiconductor controls apply. Items classified 3A090 or 4A090 require licence with likely denial.`);
      rules_fired.push(`§ 746.9 — Advanced computing controls for ${countryCode}`);
      citations.push('15 CFR § 746.9 (China advanced computing controls)');
    }

    // Russia/Belarus specific
    if (data.sanctions_in_effect && data.oil_energy_restriction) {
      flagEntry.flags.push(`ENERGY_SECTOR_CONTROLS: ${data.name} — EAR energy-sector controls apply under § 746.7. OFAC energy-sector sanctions also apply. Separate OFAC analysis required.`);
      citations.push('15 CFR § 746.7 (Russia Sanctions)', 'OFAC Russia Sanctions — Directive 4 (energy sector)');
    }

    // D:1 group membership
    const groups = data.group || [];
    if (groups.includes('D:1')) {
      flagEntry.flags.push(`D:1_COUNTRY: ${data.name} is in Country Group D:1 — NS1 column controls apply. Items with NS1 control reason require licence for D:1 destinations.`);
      citations.push('15 CFR Part 740 Supplement No. 1 (Country Groups)', 'BIS Country Chart NS1 Column');
    }

    // OFAC program note
    if (data.ofac_program) {
      flagEntry.flags.push(`OFAC: ${data.name} — OFAC sanction program(s): ${data.ofac_program}. EAR and OFAC controls are separate and cumulative. OFAC review required independently.`);
      citations.push('31 CFR (OFAC Sanctions Regulations — applicable program)');
    }

    country_flags.push(flagEntry);
  }

  return { country_flags, embargoed, rules_fired, citations: [...new Set(citations)] };
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5 — Licence Logic
// EAR Parts 736, 740, 742, 746
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive an indicative licence determination based on steps 1–4.
 * Output is indicative only — not a legal conclusion.
 * @param {object} step1 - Output of isSubjectToEAR()
 * @param {object} step2 - Output of mapECCN()
 * @param {object} step3 - Output of checkEndUse()
 * @param {object} step4 - Output of checkCountryControls()
 * @param {object} rulesData - The eccn_rules.json data
 * @returns {{indication: string, explanation: string[], licence_exceptions_to_review: string[], rules_fired: string[], citations: string[]}}
 * @see 15 CFR § 736.2 (General Prohibitions)
 * @see 15 CFR Part 740 (Licence Exceptions)
 * @see 15 CFR Part 742 (Control Policy)
 */
export function determineLicenseIndication(step1, step2, step3, step4, rulesData) {
  const explanation = [];
  const rules_fired = [];
  const citations = [];
  let licence_exceptions_to_review = [];
  let indication = 'NLR (No Licence Required — indicative)';

  // Not subject to EAR: out of scope
  if (!step1.subject_to_EAR && !step1.fdpr_flag) {
    indication = 'Potentially Not Subject to EAR — confirm with FDPR analysis';
    explanation.push('Item may not be subject to the EAR based on declared inputs. However, FDPR analysis and de minimis review should be completed before export. This is not a definitive determination.');
    citations.push('15 CFR § 734.3 (subject to EAR)', '15 CFR § 734.9 (FDPR)');
    return { indication, explanation, licence_exceptions_to_review, rules_fired, citations };
  }

  // Embargoed destination — presumption of denial
  if (step4.embargoed) {
    indication = 'Licence Required — Presumption of Denial (indicative)';
    explanation.push('One or more destination countries are subject to comprehensive US embargoes (15 CFR § 746). Exports of virtually all items require a licence, and BIS maintains a general policy of denial. OFAC sanctions may separately prohibit any transactions with the destination.');
    rules_fired.push('§ 746 — Embargoed destination');
    citations.push('15 CFR § 746', '15 CFR § 736.2(b) (General Prohibitions)');
  }

  // Entity List / SDN hit — prohibited or licence required
  const hasEntityHit = step3.entity_hits && step3.entity_hits.some(e => e.matches && e.matches.length > 0);
  if (hasEntityHit) {
    const sdnHits = step3.entity_hits.filter(e => e.matches.some(m => m.entry.list_type === 'sdn'));
    if (sdnHits.length > 0) {
      indication = 'Transaction Potentially Prohibited — SDN Match (indicative)';
      explanation.push('One or more end-users may match OFAC SDN entries. Transactions with SDN-listed parties are generally prohibited regardless of EAR classification. OFAC review is essential and takes precedence over EAR licence analysis.');
      citations.push('31 CFR Part 501 (OFAC enforcement)', 'OFAC SDN List');
    } else {
      if (indication === 'NLR (No Licence Required — indicative)') {
        indication = 'Licence Required — Entity List/MEU Hit (indicative)';
      }
      explanation.push('One or more end-users may match BIS Entity List or MEU List entries. Exports to listed entities generally require a BIS licence with a policy of denial (Entity List) or under § 744.21 (MEU). Verify against current official lists.');
      citations.push('15 CFR Part 744 Supp. 4 (Entity List)', '15 CFR Part 744 Supp. 7 (MEU List)');
    }
  }

  // NS1 or AT1 item to D:1/E:1/E:2 country
  const eccn = step2.primary_ECCN || 'EAR99';
  const isControlled = eccn !== 'EAR99' && eccn !== 'MODEL_WEIGHTS_NOTE';
  const hasCountryFlags = step4.country_flags && step4.country_flags.some(cf => cf.flags && cf.flags.length > 0);

  if (isControlled && hasCountryFlags && !step4.embargoed) {
    if (indication === 'NLR (No Licence Required — indicative)') {
      indication = 'Licence Likely Required — indicative';
    }
    explanation.push(`Candidate ECCN ${eccn} carries NS1 or AT1 controls. Destination country controls (D:1 or targeted restrictions) indicate a licence is likely required. Evaluate applicable licence exceptions.`);
    citations.push('15 CFR § 742.6 (NS controls)', 'BIS Country Chart');
  }

  // Encryption items — ENC exception
  const encEccns = ['5A002', '5D002', '5E002', '5A992', '5D992'];
  if (encEccns.includes(eccn)) {
    licence_exceptions_to_review.push('License Exception ENC (§ 740.17) — verify eligibility; not available for E:1/E:2 countries or Entity List parties');
    citations.push('15 CFR § 740.17 (ENC)');
  }

  // Model weights / AI diffusion — low confidence
  if (step2.ai_flags && step2.ai_flags.some(f => f.includes('MODEL_WEIGHTS'))) {
    if (indication === 'NLR (No Licence Required — indicative)') {
      indication = 'Licence Status Unclear — AI Model Weights (indicative, confidence: low)';
    }
    explanation.push('Item is flagged as AI model weights. Applicable EAR thresholds are [TODO] and regulatory status is unsettled. Human review and counsel review required before any export. Do not rely on this indicative output.');
    citations.push('90 FR 4544 (Jan. 15, 2025) — AI Diffusion Rule IFR');
  }

  // Deemed export flag
  if (step1.fdpr_flag || (step2.ai_flags && step2.ai_flags.some(f => f.includes('DEEMED_EXPORT')))) {
    explanation.push('Deemed-export risk identified. Foreign national access to EAR-controlled software or technology requires the same licence analysis as physical export to the national\'s home country.');
    citations.push('15 CFR § 734.13 (deemed export)');
  }

  // Fallback explanation if NLR
  if (indication === 'NLR (No Licence Required — indicative)') {
    explanation.push('Based on current inputs and snapshot data, no specific licence trigger is identified. However: (1) this is indicative only; (2) Part 744 end-user and end-use controls apply regardless of ECCN; (3) verify end-users against current BIS and OFAC lists; (4) EAR99 items still require a licence for embargoed destinations.');
    citations.push('15 CFR § 736.2 (General Prohibitions)', '15 CFR § 744');
  }

  // Add licence exceptions from candidate ECCNs
  const primaryRule = rulesData && rulesData.eccn_rules ? rulesData.eccn_rules.find(r => r.eccn === eccn) : null;
  if (primaryRule && Array.isArray(primaryRule.license_exceptions)) {
    licence_exceptions_to_review = [...new Set([...licence_exceptions_to_review, ...primaryRule.license_exceptions])];
  }

  explanation.push('REGIME SEPARATION NOTE: This assessment covers the EAR only. OFAC sanctions and ITAR are distinct regulatory regimes requiring separate analysis. A clean EAR result does not mean a transaction is permissible under OFAC or ITAR.');

  return { indication, explanation, licence_exceptions_to_review, rules_fired, citations: [...new Set(citations)] };
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER CLASSIFY — runs all steps
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run the full classification pipeline: Steps 1–5.
 * @param {object} inputs - User-supplied classification inputs
 * @param {object} allData - All loaded data files from rulesEngine.loadAllData()
 * @returns {object} Full classification output schema
 * @see 15 CFR Parts 730–774 (Export Administration Regulations)
 */
export function classify(inputs, allData) {
  const { eccnRules, countryControls, entityScreening } = allData;

  const step1 = isSubjectToEAR(inputs);
  const step2 = mapECCN(inputs, eccnRules);
  const step3 = checkEndUse(inputs, entityScreening);
  const step4 = checkCountryControls(inputs, countryControls);
  const step5 = determineLicenseIndication(step1, step2, step3, step4, eccnRules);

  const hasUnverified = step2.unverified_rules.length > 0;
  let overallConfidence = step2.confidence;
  if (step1.fdpr_flag && overallConfidence === 'high') overallConfidence = 'medium';
  if (hasUnverified && overallConfidence === 'high') overallConfidence = 'medium';

  return {
    _output_version: '1.0',
    _disclaimer: 'This output is indicative and non-binding. It is not legal advice and does not constitute an official BIS classification determination. Always verify with qualified export counsel and official BIS/OFAC resources.',
    inputs_summary: {
      item_type: inputs.item_type,
      industry: inputs.industry,
      origin: inputs.origin,
      deployment_model: inputs.deployment_model,
      destination_countries: inputs.destination_countries,
      foreign_national_access: inputs.foreign_national_access
    },
    step1_subject_to_ear: step1,
    step2_eccn_mapping: step2,
    step3_end_use: step3,
    step4_country_controls: step4,
    step5_licence: step5,
    summary: {
      subject_to_EAR: step1.subject_to_EAR,
      fdpr_flag: step1.fdpr_flag,
      primary_ECCN: step2.primary_ECCN,
      confidence: overallConfidence,
      licence_indication: step5.indication,
      has_unverified_rules: hasUnverified,
      ai_flags: step2.ai_flags,
      entity_hits: step3.entity_hits.filter(e => e.matches.length > 0).map(e => e.input_name),
      embargoed_destination: step4.embargoed
    },
    all_citations: [...new Set([
      ...(step1.citations || []),
      ...(step2.citations || []),
      ...(step3.citations || []),
      ...(step4.citations || []),
      ...(step5.citations || [])
    ])]
  };
}
