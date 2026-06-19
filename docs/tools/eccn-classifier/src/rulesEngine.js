/**
 * @module rulesEngine
 * @description Loads all JSON data files and provides low-level query functions
 * used by classificationEngine and other modules.
 * @see 15 CFR Part 774 (Commerce Control List)
 * @see 15 CFR § 734 (Subject to EAR)
 */

/**
 * Load all classifier data files from the given base path.
 * @param {string} [basePath='./data/'] - Base path relative to index.html
 * @returns {Promise<{eccnRules: object, countryControls: object, entityScreening: object, policyFrameworks: object, ecfrSnapshot: object}>}
 */
export async function loadAllData(basePath = './data/') {
  const files = ['eccn_rules.json', 'country_controls.json', 'entity_screening.json', 'policy_frameworks.json', 'ecfr_snapshot.json'];
  const results = await Promise.all(
    files.map(f =>
      fetch(basePath + f)
        .then(r => { if (!r.ok) throw new Error(`Failed to load ${f}: ${r.status}`); return r.json(); })
    )
  );
  return {
    eccnRules: results[0],
    countryControls: results[1],
    entityScreening: results[2],
    policyFrameworks: results[3],
    ecfrSnapshot: results[4]
  };
}

/**
 * Return ECCN rules applicable to a given item type.
 * @param {object} rules - The eccn_rules.json object
 * @param {string} itemType - e.g. 'software', 'hardware', 'SaaS_IaaS'
 * @returns {Array<object>} Filtered ECCN rule entries
 * @see 15 CFR Part 774 Supplement No. 1 (CCL)
 */
export function getRulesForItemType(rules, itemType) {
  if (!rules || !Array.isArray(rules.eccn_rules)) return [];
  return rules.eccn_rules.filter(rule => {
    if (!Array.isArray(rule.triggers)) return false;
    return rule.triggers.some(trigger => {
      if (trigger.field === 'item_type') {
        if (trigger.operator === 'equals') return trigger.value === itemType;
        if (trigger.operator === 'in') return Array.isArray(trigger.value) && trigger.value.includes(itemType);
      }
      // Include rules with no item_type trigger (apply to all)
      return false;
    });
  });
}

/**
 * Evaluate a single rule trigger against the inputs object.
 * Returns match result with optional unverified flag.
 * @param {object} trigger - A trigger object from eccn_rules.json
 * @param {object} inputs - User-supplied classification inputs
 * @returns {{matched: boolean, unverified: boolean, note: string|null}}
 * @see 15 CFR Part 774 (CCL trigger evaluation)
 */
export function evaluateTrigger(trigger, inputs) {
  if (!trigger || !trigger.field || !trigger.operator) {
    return { matched: false, unverified: false, note: 'Invalid trigger definition' };
  }

  // Special fallback trigger — always false during normal evaluation (applied last)
  if (trigger.operator === 'fallback') {
    return { matched: false, unverified: false, note: 'Fallback trigger — evaluated separately' };
  }

  // Resolve the field value using dot notation
  const fieldValue = resolveField(inputs, trigger.field);

  switch (trigger.operator) {
    case 'equals':
      return { matched: fieldValue === trigger.value, unverified: !!trigger.unverified, note: null };

    case 'in':
      if (!Array.isArray(trigger.value)) {
        return { matched: false, unverified: false, note: 'Trigger "in" value is not an array' };
      }
      return { matched: trigger.value.includes(fieldValue), unverified: !!trigger.unverified, note: null };

    case 'not_null':
      return { matched: fieldValue !== null && fieldValue !== undefined && fieldValue !== '', unverified: !!trigger.unverified, note: null };

    case 'keyword_match': {
      if (!Array.isArray(trigger.value)) {
        return { matched: false, unverified: false, note: 'Trigger keyword_match value is not an array' };
      }
      if (typeof fieldValue !== 'string') {
        return { matched: false, unverified: !!trigger.unverified, note: null };
      }
      const lowerField = fieldValue.toLowerCase();
      const matched = trigger.value.some(kw => lowerField.includes(kw.toLowerCase()));
      return { matched, unverified: !!trigger.unverified, note: null };
    }

    case 'above_threshold': {
      // If the threshold value contains '[TODO]', mark as unverified and return not matched
      if (typeof trigger.value === 'string' && trigger.value.includes('[TODO')) {
        return {
          matched: false,
          unverified: true,
          note: `Threshold not populated — verify from current CCL. Trigger: ${trigger.label || trigger.field}`
        };
      }
      const numericValue = Number(fieldValue);
      const threshold = Number(trigger.value);
      if (isNaN(numericValue) || isNaN(threshold)) {
        return { matched: false, unverified: !!trigger.unverified, note: 'Non-numeric value for above_threshold comparison' };
      }
      return { matched: numericValue > threshold, unverified: !!trigger.unverified, note: null };
    }

    default:
      return { matched: false, unverified: false, note: `Unknown operator: ${trigger.operator}` };
  }
}

/**
 * Resolve a dot-notation field path from the inputs object.
 * e.g. resolveField(inputs, 'ai_attributes.is_model_weights')
 * @param {object} obj - The object to resolve from
 * @param {string} path - Dot-separated field path
 * @returns {*} The value at the path, or undefined
 */
function resolveField(obj, path) {
  if (!obj || !path) return undefined;
  // Skip internal/meta fields
  if (path.startsWith('_')) return undefined;
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

/**
 * Look up risk information for a destination country.
 * @param {object} countryControls - The country_controls.json object
 * @param {string} countryCode - ISO 2-letter country code
 * @returns {{found: boolean, data: object|null, riskTier: number}}
 * @see 15 CFR Part 740 Supplement No. 1 (Country Groups)
 * @see 15 CFR § 746 (Embargoes)
 */
export function getCountryRisk(countryControls, countryCode) {
  if (!countryControls || !countryControls.countries) {
    return { found: false, data: null, riskTier: 4 };
  }
  const code = (countryCode || '').toUpperCase();
  const data = countryControls.countries[code] || null;
  if (!data) return { found: false, data: null, riskTier: 4 };
  return { found: true, data, riskTier: data.risk_tier || 4 };
}

/**
 * Screen an entity name and country against the entity screening snapshot.
 * Returns all matches found.
 * @param {object} entityScreening - The entity_screening.json object
 * @param {string} entityName - Name to screen
 * @param {string} [country] - Optional ISO2 country code
 * @returns {Array<{entry: object, matchType: string, confidence: string}>}
 * @see 15 CFR Part 744 Supplement No. 4 (Entity List)
 * @see 15 CFR Part 744 Supplement No. 7 (MEU List)
 */
export function screenEntity(entityScreening, entityName, country) {
  if (!entityScreening || !Array.isArray(entityScreening.entities)) return [];
  if (!entityName) return [];

  const nameLower = entityName.trim().toLowerCase();
  const matches = [];

  for (const entry of entityScreening.entities) {
    let confidence = null;
    let matchType = null;

    // Exact name match (case-insensitive)
    if (entry.name.toLowerCase() === nameLower) {
      confidence = 'exact';
      matchType = 'exact_name';
    }
    // Alias match
    else if (Array.isArray(entry.aliases)) {
      const aliasMatch = entry.aliases.find(a => a.toLowerCase() === nameLower);
      if (aliasMatch) {
        confidence = 'exact';
        matchType = 'alias';
      }
    }
    // First-word match (e.g. "Huawei" matches "Huawei Technologies Co., Ltd.")
    if (!confidence) {
      const firstWord = nameLower.split(/\s+/)[0];
      if (firstWord.length >= 4 && entry.name.toLowerCase().startsWith(firstWord)) {
        confidence = 'partial';
        matchType = 'first_word';
      }
      // Also check if input starts with first word of entry name
      if (!confidence) {
        const entryFirstWord = entry.name.toLowerCase().split(/\s+/)[0];
        if (entryFirstWord.length >= 4 && nameLower.startsWith(entryFirstWord)) {
          confidence = 'partial';
          matchType = 'first_word';
        }
      }
    }

    if (confidence) {
      // Boost confidence if country also matches
      if (country && entry.country && entry.country.toUpperCase() === country.toUpperCase()) {
        if (confidence === 'partial') confidence = 'partial+country';
      }
      matches.push({ entry, matchType, confidence });
    }
  }

  return matches;
}
