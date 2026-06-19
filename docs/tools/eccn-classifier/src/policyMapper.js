/**
 * @module policyMapper
 * @description Maps classification and risk output to relevant policy framework controls.
 * Frameworks: EAR, NIST AI RMF, ISO/IEC 27001, ISO/IEC 42001, ADNOC/G42-style governance.
 * @see policy_frameworks.json for control definitions
 */

/**
 * Map classification and risk outputs to applicable policy framework controls.
 * @param {object} classificationOutput - Output of classify() from classificationEngine
 * @param {object} riskOutput - Output of computeRiskScore() from riskEngine
 * @param {object} policyFrameworks - The policy_frameworks.json data object
 * @returns {{frameworks: Array, mapping_notes: string[]}}
 */
export function mapToFrameworks(classificationOutput, riskOutput, policyFrameworks) {
  const frameworks = [];
  const mapping_notes = [];

  if (!policyFrameworks || !Array.isArray(policyFrameworks.frameworks)) {
    mapping_notes.push('Policy frameworks data not loaded.');
    return { frameworks, mapping_notes };
  }

  const summary = classificationOutput.summary || {};
  const eccn = summary.primary_ECCN || 'EAR99';
  const riskBand = (riskOutput && riskOutput.band) || 'low';
  const riskScore = (riskOutput && riskOutput.score) || 0;
  const isAI = classificationOutput.inputs_summary && classificationOutput.inputs_summary.industry === 'AI';
  const hasEncryption = eccn.includes('5A002') || eccn.includes('5D002') || eccn.includes('5E002') || eccn.includes('5A992') || eccn.includes('5D992');
  const subjectToEAR = summary.subject_to_EAR;
  const hasDualUse = summary.ai_flags && summary.ai_flags.some(f => f.includes('DUAL_USE'));
  const hasModelWeights = summary.ai_flags && summary.ai_flags.some(f => f.includes('MODEL_WEIGHTS'));
  const isHighRisk = riskBand === 'high' || riskBand === 'critical';
  const isCloud = classificationOutput.inputs_summary &&
    (classificationOutput.inputs_summary.deployment_model || '').includes('cloud');

  for (const framework of policyFrameworks.frameworks) {
    // Determine relevance
    let include = false;
    const triggeredControls = [];

    if (framework.id === 'EAR' && subjectToEAR) {
      include = true;
      // All EAR controls are relevant if subject to EAR
      for (const control of (framework.relevant_controls || [])) {
        const triggered_by_match = evaluateControlTriggers(control.triggered_by, {
          subjectToEAR, eccn, isAI, hasEncryption, summary, isCloud
        });
        triggeredControls.push({
          id: control.id,
          title: control.title,
          description: control.description,
          triggered_by: control.triggered_by,
          relevance: triggered_by_match ? 'direct' : 'contextual',
          citation: control.citation
        });
      }
    }

    if (framework.id === 'NIST_AI_RMF' && isAI) {
      include = true;
      for (const control of (framework.relevant_controls || [])) {
        triggeredControls.push({
          id: control.id,
          title: control.title,
          description: control.description,
          triggered_by: control.triggered_by,
          relevance: 'direct',
          citation: control.citation
        });
      }
    }

    if (framework.id === 'ISO_27001' && hasEncryption) {
      include = true;
      for (const control of (framework.relevant_controls || [])) {
        const relevance = control.triggered_by && control.triggered_by.some(t =>
          (t.includes('encryption') && hasEncryption) ||
          (t.includes('ai') && isAI) ||
          (t.includes('cloud') && isCloud)
        ) ? 'direct' : 'contextual';
        triggeredControls.push({
          id: control.id || control.annex,
          title: control.title,
          description: control.description,
          triggered_by: control.triggered_by,
          relevance,
          citation: control.citation
        });
      }
    }

    if (framework.id === 'ISO_42001' && isAI) {
      include = true;
      for (const control of (framework.relevant_controls || [])) {
        triggeredControls.push({
          id: control.id || control.clause,
          title: control.title,
          description: control.description,
          triggered_by: control.triggered_by,
          relevance: 'direct',
          citation: control.citation
        });
      }
    }

    if (framework.id === 'ADNOC_G42_GOVERNANCE' && isHighRisk) {
      include = true;
      for (const control of (framework.relevant_controls || [])) {
        triggeredControls.push({
          id: control.id,
          title: control.title,
          description: control.description,
          triggered_by: control.triggered_by,
          relevance: 'contextual',
          citation: control.citation
        });
      }
      mapping_notes.push('G42/ADNOC framework included due to high/critical risk score. This is an illustrative framework, not an official standard.');
    }

    if (include) {
      frameworks.push({
        framework_id: framework.id,
        name: framework.name,
        version: framework.version,
        issuing_authority: framework.issuing_authority,
        relevant_controls: triggeredControls
      });
    }
  }

  if (frameworks.length === 0) {
    mapping_notes.push('No specific framework mappings triggered by current inputs. EAR Part 744 general end-user controls still apply.');
  }

  return { frameworks, mapping_notes };
}

/**
 * Evaluate whether a control's trigger list matches current context.
 * @param {string[]} triggers - Array of trigger keywords
 * @param {object} context - Classification context flags
 * @returns {boolean}
 */
function evaluateControlTriggers(triggers, context) {
  if (!Array.isArray(triggers)) return false;
  return triggers.some(t => {
    if (t.includes('EAR') || t.includes('ear')) return context.subjectToEAR;
    if (t.includes('encrypt')) return context.hasEncryption;
    if (t.includes('ai') || t.includes('AI')) return context.isAI;
    if (t.includes('cloud') || t.includes('saas')) return context.isCloud;
    if (t.includes('fdpr') || t.includes('FDPR')) return context.summary && context.summary.fdpr_flag;
    if (t.includes('entity_list')) return context.summary && context.summary.entity_hits && context.summary.entity_hits.length > 0;
    return false;
  });
}
