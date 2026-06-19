/**
 * @module auditTrail
 * @description Builds, formats, and exports audit records for ECCN classification sessions.
 * The audit record captures inputs, all classification steps, risk scoring, IDD results,
 * and policy mappings in a reproducible, exportable format.
 * @see 15 CFR § 762 (Recordkeeping for EAR compliance)
 */

/**
 * Generate a simple random session ID (UUID v4 format, client-side).
 * @returns {string} A random UUID string
 */
function generateSessionId() {
  // Use crypto.randomUUID if available, otherwise fall back to Math.random
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Build a complete audit record for a classification session.
 * @param {object} inputs - User-supplied classification inputs
 * @param {object} classificationOutput - Output of classify()
 * @param {object} riskOutput - Output of computeRiskScore()
 * @param {object} iddOutput - Output of screenEntities()
 * @param {object} policyOutput - Output of mapToFrameworks()
 * @param {object} snapshotMeta - The _meta block from any data file (for data versioning)
 * @returns {object} Complete audit record
 * @see 15 CFR § 762 (EAR recordkeeping requirements)
 */
export function buildAuditRecord(inputs, classificationOutput, riskOutput, iddOutput, policyOutput, snapshotMeta) {
  const timestamp = new Date().toISOString();
  const session_id = generateSessionId();

  // Collect steps fired with rules and citations
  const steps_fired = [
    {
      step: 'STEP 1 — Subject to EAR (15 CFR § 734)',
      rules: (classificationOutput.step1_subject_to_ear && classificationOutput.step1_subject_to_ear.rules_fired) || [],
      outcome: {
        subject_to_EAR: classificationOutput.step1_subject_to_ear && classificationOutput.step1_subject_to_ear.subject_to_EAR,
        fdpr_flag: classificationOutput.step1_subject_to_ear && classificationOutput.step1_subject_to_ear.fdpr_flag
      },
      justification: (classificationOutput.step1_subject_to_ear && classificationOutput.step1_subject_to_ear.justification) || [],
      citations: (classificationOutput.step1_subject_to_ear && classificationOutput.step1_subject_to_ear.citations) || []
    },
    {
      step: 'STEP 2 — ECCN Mapping (15 CFR Part 774, Supplement No. 1)',
      rules: (classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.rules_fired) || [],
      outcome: {
        primary_ECCN: classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.primary_ECCN,
        confidence: classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.confidence,
        candidates: classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.candidates
      },
      unverified_rules: (classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.unverified_rules) || [],
      ai_flags: (classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.ai_flags) || [],
      citations: (classificationOutput.step2_eccn_mapping && classificationOutput.step2_eccn_mapping.citations) || []
    },
    {
      step: 'STEP 3 — End-Use/End-User (15 CFR Part 744)',
      rules: (classificationOutput.step3_end_use && classificationOutput.step3_end_use.rules_fired) || [],
      outcome: {
        flags: (classificationOutput.step3_end_use && classificationOutput.step3_end_use.flags) || [],
        entity_hits: (classificationOutput.step3_end_use && classificationOutput.step3_end_use.entity_hits) || []
      },
      citations: (classificationOutput.step3_end_use && classificationOutput.step3_end_use.citations) || []
    },
    {
      step: 'STEP 4 — Country Controls (15 CFR § 746)',
      rules: (classificationOutput.step4_country_controls && classificationOutput.step4_country_controls.rules_fired) || [],
      outcome: {
        embargoed: classificationOutput.step4_country_controls && classificationOutput.step4_country_controls.embargoed,
        country_flags: classificationOutput.step4_country_controls && classificationOutput.step4_country_controls.country_flags
      },
      citations: (classificationOutput.step4_country_controls && classificationOutput.step4_country_controls.citations) || []
    },
    {
      step: 'STEP 5 — Licence Indication (15 CFR Parts 736, 740, 742, 746)',
      rules: (classificationOutput.step5_licence && classificationOutput.step5_licence.rules_fired) || [],
      outcome: {
        indication: classificationOutput.step5_licence && classificationOutput.step5_licence.indication,
        explanation: classificationOutput.step5_licence && classificationOutput.step5_licence.explanation,
        licence_exceptions_to_review: classificationOutput.step5_licence && classificationOutput.step5_licence.licence_exceptions_to_review
      },
      citations: (classificationOutput.step5_licence && classificationOutput.step5_licence.citations) || []
    }
  ];

  // Data versions
  const data_versions = {
    eccn_rules: (snapshotMeta && snapshotMeta.data_current_as_of) || 'unknown',
    entity_screening: (iddOutput && iddOutput.snapshot_date) || 'unknown',
    ecfr_snapshot: (snapshotMeta && snapshotMeta.data_current_as_of) || 'unknown'
  };

  return {
    _record_type: 'ECCN_CLASSIFICATION_AUDIT',
    session_id,
    timestamp,
    tool_version: '1.0.0',
    tool_url: window.location.href,

    inputs: JSON.parse(JSON.stringify(inputs || {})), // deep copy

    steps_fired,

    overall_result: {
      subject_to_EAR: classificationOutput.summary && classificationOutput.summary.subject_to_EAR,
      fdpr_flag: classificationOutput.summary && classificationOutput.summary.fdpr_flag,
      primary_ECCN: classificationOutput.summary && classificationOutput.summary.primary_ECCN,
      confidence: classificationOutput.summary && classificationOutput.summary.confidence,
      licence_indication: classificationOutput.summary && classificationOutput.summary.licence_indication,
      ai_flags: classificationOutput.summary && classificationOutput.summary.ai_flags,
      entity_hits: classificationOutput.summary && classificationOutput.summary.entity_hits,
      embargoed_destination: classificationOutput.summary && classificationOutput.summary.embargoed_destination
    },

    risk_assessment: {
      score: riskOutput && riskOutput.score,
      band: riskOutput && riskOutput.band,
      drivers: riskOutput && riskOutput.drivers,
      country_heat: riskOutput && riskOutput.country_heat
    },

    idd_screening: {
      overall_flag: iddOutput && iddOutput.overall_idd_flag,
      entities_screened: iddOutput && iddOutput.entities,
      high_risk_countries: iddOutput && iddOutput.high_risk_countries,
      disclaimer: iddOutput && iddOutput.disclaimer
    },

    policy_frameworks: policyOutput && policyOutput.frameworks,

    data_versions,

    all_citations: classificationOutput.all_citations || [],

    disclaimer: [
      'This audit record is produced by an automated triage tool and is NOT legal advice.',
      'It does not constitute an official BIS ECCN classification or OFAC compliance determination.',
      'Definitive classification requires review under the EAR and, where appropriate, a BIS CCATS determination.',
      'Screening data are point-in-time snapshots and are NOT live sanctions screens.',
      'EAR and OFAC are distinct regulatory regimes — a result under one does not determine status under the other.',
      'ITAR screening is not addressed by this tool.',
      'Retain this record in accordance with 15 CFR § 762 (EAR recordkeeping) — minimum 5 years from transaction date.'
    ]
  };
}

/**
 * Serialize an audit record to a formatted JSON string.
 * @param {object} record - Output of buildAuditRecord()
 * @returns {string} Formatted JSON string
 */
export function exportAsJSON(record) {
  return JSON.stringify(record, null, 2);
}

/**
 * Trigger browser print dialog to allow Save as PDF.
 * The print CSS in classifier.css controls what is visible in print.
 * @see classifier.css @media print
 */
export function printToPDF() {
  window.print();
}
