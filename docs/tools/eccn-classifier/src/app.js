/**
 * @module app
 * @description Main application controller for the ECCN Classifier.
 * Wires up UI tabs, form handling, classification pipeline, and result rendering.
 * All classification outputs are indicative and non-binding.
 * @see docs/tools/eccn-classifier/index.html
 */

import { loadAllData } from './rulesEngine.js';
import { classify } from './classificationEngine.js';
import { computeRiskScore } from './riskEngine.js';
import { screenEntities } from './iddModule.js';
import { mapToFrameworks } from './policyMapper.js';
import { isStalenessWarningNeeded } from './regulatorySource.js';
import { buildAuditRecord, exportAsJSON, printToPDF } from './auditTrail.js';

// ─────────────────────────────────────────────────────────────────────────────
// DEMO INPUTS — worked example (AI SaaS, China destination, cloud)
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_INPUTS = {
  item_type: 'SaaS_IaaS',
  description: 'Cloud-hosted AI inference API providing general-purpose large language model capabilities including text generation, code generation, and analysis. Fine-tuning endpoint available to enterprise customers.',
  industry: 'AI',
  ai_attributes: {
    is_model_weights: false,
    training_compute_flop: null,
    parameter_count: null,
    intended_use: 'dual_use_concern',
    fine_tuning_offered: true
  },
  technical_parameters: {
    chip_perf_density: null,
    chip_node_nm: null,
    encryption: 'AES-256 data-at-rest and TLS 1.3 in-transit'
  },
  deployment_model: 'cloud_IaaS',
  origin: 'US',
  contains_us_tech: true,
  foreign_national_access: true,
  end_users: ['Shenzhen TechCo Ltd', 'Beijing State AI Institute'],
  destination_countries: ['CN']
};

// ─────────────────────────────────────────────────────────────────────────────
// Application state
// ─────────────────────────────────────────────────────────────────────────────

let allData = null;
let lastResult = null;

// ─────────────────────────────────────────────────────────────────────────────
// Initialisation
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  try {
    showLoadingState(true);
    allData = await loadAllData('./data/');
    showLoadingState(false);

    // Check snapshot staleness
    const snapshotMeta = allData.ecfrSnapshot && allData.ecfrSnapshot._meta;
    const stalenessCheck = isStalenessWarningNeeded(allData.ecfrSnapshot, 30);
    if (stalenessCheck.warning) {
      showStalenessWarning(stalenessCheck.as_of_date, stalenessCheck.age_days);
    }

    // Wire up UI
    initTabs();
    initForm();
    initButtons();

    setStatus('Data loaded. Ready to classify.');
  } catch (err) {
    showLoadingState(false);
    showError(`Failed to load regulatory data: ${err.message}. Ensure data files are present in ./data/.`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Tab navigation
// ─────────────────────────────────────────────────────────────────────────────

function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      activateTab(target);
    });
  });
}

function activateTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
}

// ─────────────────────────────────────────────────────────────────────────────
// Form initialisation and input collection
// ─────────────────────────────────────────────────────────────────────────────

function initForm() {
  // Toggle AI attributes section
  const toggleAI = document.getElementById('toggle-ai-attrs');
  const aiSection = document.getElementById('ai-attrs-section');
  if (toggleAI && aiSection) {
    toggleAI.addEventListener('click', () => {
      const hidden = aiSection.style.display === 'none' || aiSection.style.display === '';
      aiSection.style.display = hidden ? 'block' : 'none';
      toggleAI.textContent = hidden ? '▲ AI Attributes' : '▼ AI Attributes (expand)';
    });
    aiSection.style.display = 'none';
  }
}

function collectInputs() {
  const getVal = id => { const el = document.getElementById(id); return el ? el.value : null; };
  const getCheck = id => { const el = document.getElementById(id); return el ? el.checked : false; };
  const getNum = id => { const el = document.getElementById(id); return el && el.value ? Number(el.value) : null; };

  const endUsersRaw = getVal('end-users') || '';
  const endUsers = endUsersRaw.split(',').map(s => s.trim()).filter(Boolean);

  const destRaw = getVal('destination-countries') || '';
  const destinations = destRaw.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);

  return {
    item_type: getVal('item-type') || 'software',
    description: getVal('description') || '',
    industry: getVal('industry') || 'AI',
    ai_attributes: {
      is_model_weights: getCheck('is-model-weights'),
      training_compute_flop: getNum('training-compute'),
      parameter_count: getNum('parameter-count'),
      intended_use: getVal('intended-use') || 'general',
      fine_tuning_offered: getCheck('fine-tuning')
    },
    technical_parameters: {
      chip_perf_density: getNum('chip-perf-density'),
      chip_node_nm: getNum('chip-node-nm'),
      encryption: getVal('encryption') || null
    },
    deployment_model: getVal('deployment-model') || 'on_prem',
    origin: getVal('origin') || 'US',
    contains_us_tech: getCheck('contains-us-tech'),
    foreign_national_access: getCheck('foreign-national-access'),
    end_users: endUsers,
    destination_countries: destinations
  };
}

function populateForm(inputs) {
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  const setCheck = (id, val) => { const el = document.getElementById(id); if (el) el.checked = !!val; };

  setVal('item-type', inputs.item_type);
  setVal('description', inputs.description);
  setVal('industry', inputs.industry);
  setVal('deployment-model', inputs.deployment_model);
  setVal('origin', inputs.origin);
  setCheck('contains-us-tech', inputs.contains_us_tech);
  setCheck('foreign-national-access', inputs.foreign_national_access);

  if (inputs.ai_attributes) {
    setCheck('is-model-weights', inputs.ai_attributes.is_model_weights);
    setVal('training-compute', inputs.ai_attributes.training_compute_flop);
    setVal('parameter-count', inputs.ai_attributes.parameter_count);
    setVal('intended-use', inputs.ai_attributes.intended_use);
    setCheck('fine-tuning', inputs.ai_attributes.fine_tuning_offered);
  }
  if (inputs.technical_parameters) {
    setVal('chip-perf-density', inputs.technical_parameters.chip_perf_density);
    setVal('chip-node-nm', inputs.technical_parameters.chip_node_nm);
    setVal('encryption', inputs.technical_parameters.encryption);
  }
  setVal('end-users', (inputs.end_users || []).join(', '));
  setVal('destination-countries', (inputs.destination_countries || []).join(', '));

  // Show AI attrs section
  const aiSection = document.getElementById('ai-attrs-section');
  const toggleAI = document.getElementById('toggle-ai-attrs');
  if (aiSection) aiSection.style.display = 'block';
  if (toggleAI) toggleAI.textContent = '▲ AI Attributes';
}

// ─────────────────────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────────────────────

function initButtons() {
  const classifyBtn = document.getElementById('btn-classify');
  if (classifyBtn) classifyBtn.addEventListener('click', runClassification);

  const demoBtn = document.getElementById('btn-demo');
  if (demoBtn) demoBtn.addEventListener('click', loadDemo);

  const exportBtn = document.getElementById('btn-export-json');
  if (exportBtn) exportBtn.addEventListener('click', handleExportJSON);

  const printBtn = document.getElementById('btn-print');
  if (printBtn) printBtn.addEventListener('click', printToPDF);
}

function loadDemo() {
  populateForm(DEMO_INPUTS);
  setStatus('Demo inputs loaded. Click "Classify" to run.');
}

async function runClassification() {
  if (!allData) {
    showError('Data not loaded. Reload the page and try again.');
    return;
  }

  const inputs = collectInputs();

  try {
    setStatus('Running classification…');
    const classifyBtn = document.getElementById('btn-classify');
    if (classifyBtn) { classifyBtn.disabled = true; classifyBtn.textContent = 'Classifying…'; }

    // Run pipeline
    const classificationOutput = classify(inputs, allData);
    const riskOutput = computeRiskScore(classificationOutput, inputs, allData.countryControls);
    const iddOutput = screenEntities(allData.entityScreening, inputs.end_users, inputs.destination_countries);
    const policyOutput = mapToFrameworks(classificationOutput, riskOutput, allData.policyFrameworks);
    const snapshotMeta = allData.ecfrSnapshot && allData.ecfrSnapshot._meta;
    const auditRecord = buildAuditRecord(inputs, classificationOutput, riskOutput, iddOutput, policyOutput, snapshotMeta);

    lastResult = { inputs, classificationOutput, riskOutput, iddOutput, policyOutput, auditRecord };

    // Render all panels
    renderResults(classificationOutput);
    renderRiskDashboard(riskOutput);
    renderIDD(iddOutput);
    renderAuditTrail(auditRecord);

    // Unlock result tabs
    document.querySelectorAll('.tab-btn[data-requires-result]').forEach(b => b.removeAttribute('disabled'));

    // Auto-advance to Results tab
    activateTab('results');
    setStatus('Classification complete.');

    if (classifyBtn) { classifyBtn.disabled = false; classifyBtn.textContent = 'Classify'; }
  } catch (err) {
    const classifyBtn = document.getElementById('btn-classify');
    if (classifyBtn) { classifyBtn.disabled = false; classifyBtn.textContent = 'Classify'; }
    showError(`Classification error: ${err.message}`);
    console.error(err);
  }
}

function handleExportJSON() {
  if (!lastResult) { alert('Run a classification first.'); return; }
  const json = exportAsJSON(lastResult.auditRecord);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `eccn-audit-${lastResult.auditRecord.session_id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — Results tab
// ─────────────────────────────────────────────────────────────────────────────

function renderResults(output) {
  const panel = document.getElementById('panel-results');
  if (!panel) return;

  const s = output.summary || {};
  const confidenceClass = { high: 'badge-green', medium: 'badge-yellow', low: 'badge-red' }[s.confidence] || 'badge-grey';
  const licenceClass = s.licence_indication && s.licence_indication.includes('NLR') ? 'badge-green'
    : s.licence_indication && s.licence_indication.includes('Prohibited') ? 'badge-red' : 'badge-orange';

  let html = `
    <div class="result-card result-summary">
      <div class="result-row">
        <div class="result-field">
          <span class="field-label">Subject to EAR</span>
          <span class="badge ${s.subject_to_EAR ? 'badge-orange' : 'badge-green'}">${s.subject_to_EAR ? 'Yes' : 'No / Uncertain'}</span>
        </div>
        ${s.fdpr_flag ? `<div class="result-field"><span class="field-label">FDPR Flag</span><span class="badge badge-orange">Review Required</span></div>` : ''}
        <div class="result-field">
          <span class="field-label">Candidate ECCN</span>
          <span class="badge badge-eccn">${esc(s.primary_ECCN || 'UNDETERMINED')}</span>
        </div>
        <div class="result-field">
          <span class="field-label">Confidence</span>
          <span class="badge ${confidenceClass}">${esc(s.confidence || '—')}</span>
        </div>
      </div>
      <div class="result-row">
        <div class="result-field full-width">
          <span class="field-label">Indicative Licence Assessment</span>
          <span class="badge ${licenceClass} badge-large">${esc(s.licence_indication || '—')}</span>
        </div>
      </div>
      ${s.embargoed_destination ? `<div class="alert alert-red"><strong>Embargoed destination identified.</strong> Licence required — presumption of denial. OFAC review also required independently.</div>` : ''}
      ${s.has_unverified_rules ? `<div class="alert alert-amber"><strong>Unverified rules triggered.</strong> One or more classification rules contain [TODO] thresholds not yet populated from the live CCL. Confidence is limited. Human review required.</div>` : ''}
    </div>

    <div class="regime-note">
      <strong>Regime separation:</strong> This assessment covers EAR only. OFAC sanctions and ITAR are distinct regimes requiring separate analysis. A result under EAR does not determine status under OFAC or ITAR.
    </div>`;

  // AI Flags
  if (s.ai_flags && s.ai_flags.length > 0) {
    html += `<div class="result-card">
      <h3 class="card-title">AI-Specific Flags</h3>
      <ul class="flag-list">
        ${s.ai_flags.map(f => `<li class="flag-item flag-amber">${esc(f)}</li>`).join('')}
      </ul>
    </div>`;
  }

  // Step-by-step accordion
  html += `<h3 class="section-title">Classification Steps</h3>`;

  const steps = [
    { key: 'step1_subject_to_ear', label: 'Step 1 — Subject to EAR (§ 734)', data: output.step1_subject_to_ear },
    { key: 'step2_eccn_mapping', label: 'Step 2 — ECCN Mapping (CCL, Part 774)', data: output.step2_eccn_mapping },
    { key: 'step3_end_use', label: 'Step 3 — End-Use / End-User (Part 744)', data: output.step3_end_use },
    { key: 'step4_country_controls', label: 'Step 4 — Country Controls (§ 746)', data: output.step4_country_controls },
    { key: 'step5_licence', label: 'Step 5 — Licence Indication', data: output.step5_licence }
  ];

  for (const step of steps) {
    if (!step.data) continue;
    const stepId = `step-${step.key}`;
    html += `
      <details class="step-accordion" open>
        <summary class="step-summary">${esc(step.label)}</summary>
        <div class="step-body">
          ${renderStepData(step.key, step.data)}
        </div>
      </details>`;
  }

  // Citations table
  if (output.all_citations && output.all_citations.length > 0) {
    html += `
      <div class="result-card citations-card">
        <h3 class="card-title">Citations</h3>
        <table class="citations-table">
          <thead><tr><th>Citation</th><th>Source</th></tr></thead>
          <tbody>
            ${output.all_citations.map(c => `
              <tr>
                <td>${esc(c)}</td>
                <td>${makeCitationLink(c)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  }

  panel.innerHTML = html;
}

function renderStepData(key, data) {
  let html = '';
  if (data.rules_fired && data.rules_fired.length > 0) {
    html += `<div class="step-rules"><strong>Rules fired:</strong><ul>${data.rules_fired.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>`;
  }
  if (data.justification && data.justification.length > 0) {
    html += `<div class="step-justification">${data.justification.map(j => `<p>${esc(j)}</p>`).join('')}</div>`;
  }
  if (data.explanation && data.explanation.length > 0) {
    html += `<div class="step-justification">${data.explanation.map(e => `<p>${esc(e)}</p>`).join('')}</div>`;
  }
  if (data.flags && data.flags.length > 0) {
    html += `<ul class="flag-list">${data.flags.map(f => `<li class="flag-item flag-amber">${esc(f)}</li>`).join('')}</ul>`;
  }
  if (data.unverified_rules && data.unverified_rules.length > 0) {
    html += `<div class="alert alert-amber"><strong>Unverified:</strong><ul>${data.unverified_rules.map(u => `<li>${esc(u)}</li>`).join('')}</ul></div>`;
  }
  if (data.candidates && data.candidates.length > 0) {
    html += `<div class="candidates"><strong>Candidate ECCNs:</strong><ul>`;
    for (const c of data.candidates) {
      html += `<li><span class="badge badge-eccn">${esc(c.eccn)}</span> ${esc(c.short_name || '')} — severity: ${c.severity}/30${c.unverified ? ' <span class="badge badge-red">unverified</span>' : ''}</li>`;
    }
    html += `</ul></div>`;
  }
  if (data.country_flags && data.country_flags.length > 0) {
    for (const cf of data.country_flags) {
      if (typeof cf === 'string') {
        html += `<p class="flag-item flag-amber">${esc(cf)}</p>`;
      } else if (cf.flags) {
        html += `<div class="country-block"><strong>${esc(cf.name || cf.country)}</strong> (Risk Tier ${cf.risk_tier || '?'})`;
        if (cf.flags.length > 0) {
          html += `<ul>${cf.flags.map(f => `<li class="flag-item flag-${cf.risk_tier === 1 ? 'red' : 'amber'}">${esc(f)}</li>`).join('')}</ul>`;
        }
        if (cf.part746 && cf.part746.length > 0) {
          html += `<p class="citation-inline">Applicable restrictions: ${cf.part746.map(r => esc(r)).join('; ')}</p>`;
        }
        html += `</div>`;
      }
    }
  }
  if (data.licence_exceptions_to_review && data.licence_exceptions_to_review.length > 0) {
    html += `<div class="exceptions"><strong>Licence exceptions to review:</strong><ul>${data.licence_exceptions_to_review.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>`;
  }
  if (!html) html = '<p class="muted">No output for this step.</p>';
  return html;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — Risk Dashboard tab
// ─────────────────────────────────────────────────────────────────────────────

function renderRiskDashboard(riskOutput) {
  const panel = document.getElementById('panel-risk');
  if (!panel) return;

  const score = riskOutput.score || 0;
  const band = riskOutput.band || 'low';
  const color = riskOutput.band_color || '#16a34a';

  let html = `
    <div class="risk-header">
      <div class="risk-score-dial" style="--dial-color: ${color}">
        <div class="risk-score-number" style="color: ${color}">${score}</div>
        <div class="risk-score-label">/ 100</div>
        <div class="risk-band-badge badge" style="background: ${color}; color: white">${band.toUpperCase()}</div>
      </div>
      <div class="risk-score-desc">
        <p>Aggregate risk score across five dimensions. Score is indicative — for triage only.</p>
        <p class="muted">${esc(riskOutput.disclaimer || '')}</p>
      </div>
    </div>

    <div class="result-card">
      <h3 class="card-title">Risk Drivers</h3>
      <table class="risk-table">
        <thead><tr><th>Dimension</th><th>Score</th><th>Max</th><th>Rationale</th><th>Citation</th></tr></thead>
        <tbody>
          ${(riskOutput.drivers || []).map(d => `
            <tr>
              <td><strong>${esc(d.dimension)}</strong></td>
              <td><span class="risk-score-cell" style="color: ${scoreColor(d.score, d.max)}">${d.score}</span></td>
              <td class="muted">${d.max}</td>
              <td>${esc(d.rationale)}</td>
              <td class="citation-cell"><small>${esc(d.citation || '')}</small></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  if (riskOutput.country_heat && Object.keys(riskOutput.country_heat).length > 0) {
    html += `
      <div class="result-card">
        <h3 class="card-title">Country Risk Heat</h3>
        <div class="country-heat-grid">
          ${Object.entries(riskOutput.country_heat).map(([code, data]) => `
            <div class="country-heat-tile" style="border-color: ${COUNTRY_TIER_COLOR(data.tier)}">
              <div class="country-code">${esc(code)}</div>
              <div class="country-name">${esc(data.name || code)}</div>
              <div class="country-tier" style="color: ${COUNTRY_TIER_COLOR(data.tier)}">Tier ${data.tier} — ${data.score}/25</div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  panel.innerHTML = html;
}

function COUNTRY_TIER_COLOR(tier) {
  return { 1: '#dc2626', 2: '#ea580c', 3: '#d97706', 4: '#16a34a' }[tier] || '#6b7280';
}

function scoreColor(score, max) {
  const pct = max ? score / max : 0;
  if (pct >= 0.75) return '#dc2626';
  if (pct >= 0.5) return '#ea580c';
  if (pct >= 0.25) return '#d97706';
  return '#16a34a';
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — IDD Screening tab
// ─────────────────────────────────────────────────────────────────────────────

function renderIDD(iddOutput) {
  const panel = document.getElementById('panel-idd');
  if (!panel) return;

  const flagColors = { high_risk: '#dc2626', elevated: '#d97706', clear: '#16a34a' };
  const flagColor = flagColors[iddOutput.overall_idd_flag] || '#6b7280';

  let html = `
    <div class="result-card">
      <div class="idd-header">
        <div class="idd-overall" style="color: ${flagColor}">
          <strong>Overall IDD Flag: ${(iddOutput.overall_idd_flag || 'unknown').replace('_', ' ').toUpperCase()}</strong>
        </div>
        <div class="idd-snapshot-date muted">Snapshot date: ${esc(iddOutput.snapshot_date || 'unknown')}</div>
      </div>
      <div class="alert alert-amber idd-disclaimer">
        <strong>Disclaimer:</strong> ${esc(iddOutput.disclaimer || '')}
      </div>
    </div>`;

  // High-risk countries
  if (iddOutput.high_risk_countries && iddOutput.high_risk_countries.length > 0) {
    html += `
      <div class="result-card">
        <h3 class="card-title">High-Risk Destination Countries</h3>
        <ul class="idd-country-list">
          ${iddOutput.high_risk_countries.map(c => `
            <li class="idd-country-item">
              <span class="badge ${c.risk === 'EMBARGOED' ? 'badge-red' : 'badge-orange'}">${esc(c.risk)}</span>
              <strong>${esc(c.code)}</strong> — ${esc(c.note)}
            </li>`).join('')}
        </ul>
      </div>`;
  }

  // Per-entity results
  html += `<h3 class="section-title">Entity Screening Results</h3>`;
  for (const entity of (iddOutput.entities || [])) {
    const hasMatch = entity.match_found;
    const borderColor = hasMatch ? '#dc2626' : '#d1d5db';
    html += `
      <div class="result-card entity-card" style="border-left: 4px solid ${borderColor}">
        <div class="entity-header">
          <strong>${esc(entity.input_name)}</strong>
          ${hasMatch
            ? `<span class="badge badge-red">MATCH FOUND</span>`
            : `<span class="badge badge-green">No match in snapshot</span>`}
        </div>`;

    if (hasMatch) {
      html += `<div class="entity-confidence muted">Overall match confidence: ${esc(entity.overall_match_confidence || '—')}</div>`;
      for (const match of (entity.matches || [])) {
        const listColors = { entity_list: '#dc2626', meu: '#ea580c', sdn: '#7f1d1d', state_owned_energy: '#d97706' };
        const lc = listColors[match.list_type] || '#6b7280';
        html += `
          <div class="match-block" style="border-left: 3px solid ${lc}">
            <div><strong>${esc(match.matched_entry)}</strong> <span class="badge" style="background:${lc};color:white">${esc(match.list_type)}</span> <span class="muted">(${esc(match.match_type)} match)</span></div>
            <div class="muted">${esc(match.eccn_impact || '')}</div>
            <div class="match-note"><small>${esc(match.notes || '')}</small></div>
            ${match.source_url ? `<div><small><a href="${esc(match.source_url)}" target="_blank" rel="noopener">Source list ↗</a></small></div>` : ''}
            ${!match.verified ? `<div><span class="badge badge-yellow">Unverified snapshot entry</span></div>` : ''}
          </div>`;
      }
    }

    if (entity.notes && entity.notes.length > 0) {
      html += `<ul class="entity-notes">${entity.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>`;
    }
    html += `</div>`;
  }

  if (!iddOutput.entities || iddOutput.entities.length === 0) {
    html += `<p class="muted">No end-users were entered for screening.</p>`;
  }

  panel.innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER — Audit Trail tab
// ─────────────────────────────────────────────────────────────────────────────

function renderAuditTrail(auditRecord) {
  const panel = document.getElementById('panel-audit');
  if (!panel) return;

  const html = `
    <div class="audit-controls">
      <button class="btn btn-secondary" id="btn-export-json">Download JSON</button>
      <button class="btn btn-secondary" id="btn-print">Print / Save as PDF</button>
    </div>
    <div class="audit-meta result-card">
      <div class="audit-row"><span class="field-label">Session ID</span> <code>${esc(auditRecord.session_id)}</code></div>
      <div class="audit-row"><span class="field-label">Timestamp</span> ${esc(auditRecord.timestamp)}</div>
      <div class="audit-row"><span class="field-label">Tool Version</span> ${esc(auditRecord.tool_version)}</div>
    </div>
    <div class="result-card">
      <h3 class="card-title">Disclaimer</h3>
      <ul class="disclaimer-list">
        ${(auditRecord.disclaimer || []).map(d => `<li>${esc(d)}</li>`).join('')}
      </ul>
    </div>
    <div class="result-card">
      <h3 class="card-title">Full Audit Record (JSON)</h3>
      <pre class="audit-json">${esc(JSON.stringify(auditRecord, null, 2))}</pre>
    </div>`;

  panel.innerHTML = html;

  // Re-wire buttons inside the newly rendered HTML
  const exportBtn = panel.querySelector('#btn-export-json');
  if (exportBtn) exportBtn.addEventListener('click', handleExportJSON);
  const printBtn = panel.querySelector('#btn-print');
  if (printBtn) printBtn.addEventListener('click', printToPDF);
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Escape HTML to prevent XSS */
function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Generate a deep link for a CFR citation */
function makeCitationLink(citation) {
  if (!citation) return '—';
  const cfr = citation.match(/15 CFR §§?\s*([\d.]+)/);
  if (cfr) {
    const section = cfr[1].replace('.', '/section-');
    const part = cfr[1].split('.')[0];
    const url = `https://www.ecfr.gov/current/title-15/subtitle-B/chapter-VII/subchapter-C/part-${part}${cfr[1].includes('.') ? '/section-' + cfr[1] : ''}`;
    return `<a href="${url}" target="_blank" rel="noopener">eCFR ↗</a>`;
  }
  if (citation.includes('FR ')) {
    return `<a href="https://www.federalregister.gov" target="_blank" rel="noopener">Federal Register ↗</a>`;
  }
  return '—';
}

function showLoadingState(loading) {
  const loader = document.getElementById('loading-indicator');
  if (loader) loader.style.display = loading ? 'block' : 'none';
}

function showError(msg) {
  const errEl = document.getElementById('error-banner');
  if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
  else alert(msg);
}

function showStalenessWarning(asOfDate, ageDays) {
  const el = document.getElementById('staleness-warning');
  if (el) {
    el.textContent = `Regulatory data snapshot is more than 30 days old (last updated: ${asOfDate || 'unknown'}, ${ageDays} days ago). Run scripts/refresh_rules.py or trigger the refresh-rules workflow to update.`;
    el.style.display = 'block';
  }
}

function setStatus(msg) {
  const el = document.getElementById('status-bar');
  if (el) el.textContent = msg;
}
