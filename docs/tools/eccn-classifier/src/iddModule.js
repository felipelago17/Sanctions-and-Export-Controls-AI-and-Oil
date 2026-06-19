/**
 * @module iddModule
 * @description Identification, Detection, and Diligence (IDD) Module.
 * Screens declared end-users and destination countries against
 * the point-in-time entity screening snapshot.
 * NOT a live sanctions screen — see disclaimer below.
 * @see 15 CFR Part 744 Supplement No. 4 (Entity List)
 * @see 15 CFR Part 744 Supplement No. 7 (MEU List)
 * @see 31 CFR Part 501 (OFAC enforcement framework)
 */

import { screenEntity } from './rulesEngine.js';

const DISCLAIMER = 'Screening against point-in-time snapshot — NOT a live sanctions screen and does not replace BIS/OFAC verification or a licensed screening provider. Entity List, SDN List, and MEU List are updated frequently. Always verify against current official government lists before any export, reexport, or transfer.';

/**
 * Screen end-users and destination countries for risk flags.
 * @param {object} entityScreening - The entity_screening.json object
 * @param {string[]} endUsers - Array of end-user names to screen
 * @param {string[]} destinationCountries - Array of ISO2 country codes
 * @returns {{entities: Array, ofac_flags: Array, high_risk_countries: string[], overall_idd_flag: string, snapshot_date: string, disclaimer: string, demo_mode: boolean}}
 * @see 15 CFR § 744.21 (military end-use)
 * @see 15 CFR Part 764 (Enforcement — prohibited parties)
 */
export function screenEntities(entityScreening, endUsers, destinationCountries) {
  const entities = [];
  const ofac_flags = [];
  const high_risk_countries = [];
  let hasHighRisk = false;
  let hasElevated = false;

  const snapshotDate = (entityScreening && entityScreening._meta && entityScreening._meta.data_current_as_of) || 'unknown';

  // DEMO gate: set demo_mode if any entity entry has synthetic: true
  const demo_mode = !!(
    entityScreening &&
    Array.isArray(entityScreening.entities) &&
    entityScreening.entities.some(e => e.synthetic === true)
  );

  // Embargoed / high-risk country codes (E:1 / E:2 from country controls)
  const embargoedCodes = new Set(['IR', 'KP', 'CU', 'SY']);
  const severeRestriction = new Set(['RU', 'BY', 'CN']);

  for (const country of (destinationCountries || [])) {
    const code = country.toUpperCase();
    if (embargoedCodes.has(code)) {
      high_risk_countries.push({ code, risk: 'EMBARGOED', note: 'E:1 country — comprehensive embargo. All exports require a licence (policy of denial).' });
      hasHighRisk = true;
    } else if (severeRestriction.has(code)) {
      high_risk_countries.push({ code, risk: 'SEVERE_RESTRICTIONS', note: 'E:2 / D:1 / targeted restrictions country — heightened scrutiny for NS1/AT1 items and advanced computing.' });
      hasElevated = true;
    }
  }

  for (const userName of (endUsers || [])) {
    const userResult = {
      input_name: userName,
      match_found: false,
      matches: [],
      overall_match_confidence: null,
      list_types_hit: [],
      notes: [],
      requires_enhanced_dd: false
    };

    // Screen against all destination countries (plus no-country)
    const countriesToScreen = destinationCountries && destinationCountries.length > 0
      ? [...destinationCountries, null]
      : [null];

    const allMatches = [];
    const seenNames = new Set();

    for (const country of countriesToScreen) {
      const hits = screenEntity(entityScreening, userName, country);
      for (const hit of hits) {
        const key = hit.entry.name + '|' + hit.entry.list_type;
        if (!seenNames.has(key)) {
          seenNames.add(key);
          allMatches.push(hit);
        }
      }
    }

    if (allMatches.length > 0) {
      userResult.match_found = true;
      userResult.matches = allMatches.map(m => ({
        matched_entry: m.entry.name,
        aliases: m.entry.aliases,
        country: m.entry.country,
        list_type: m.entry.list_type,
        match_confidence: m.confidence,
        match_type: m.matchType,
        eccn_impact: m.entry.eccn_impact,
        notes: m.entry.notes,
        source_url: m.entry.source_url,
        as_of_date: m.entry.as_of_date,
        verified: m.entry.verified,
        enhanced_due_diligence: m.entry.enhanced_due_diligence || false
      }));

      // Derive overall confidence (take highest)
      const confidencePriority = ['exact', 'partial+country', 'partial'];
      const bestConfidence = confidencePriority.find(c => allMatches.some(m => m.confidence === c)) || allMatches[0].confidence;
      userResult.overall_match_confidence = bestConfidence;

      const listTypes = [...new Set(allMatches.map(m => m.entry.list_type))];
      userResult.list_types_hit = listTypes;

      if (listTypes.includes('sdn')) {
        // OFAC SDN hits are a separate sanctions flag — not merged into EAR verdict
        const sdnMatches = allMatches.filter(m => m.entry.list_type === 'sdn');
        for (const sdnHit of sdnMatches) {
          ofac_flags.push({
            input_name: userName,
            matched_entry: sdnHit.entry.name,
            country: sdnHit.entry.country,
            match_confidence: sdnHit.confidence,
            synthetic: sdnHit.entry.synthetic || false,
            note: 'OFAC SDN match: Transaction potentially prohibited under OFAC regulations independently of EAR classification. Seek legal counsel immediately.',
            source_url: sdnHit.entry.source_url
          });
        }
        userResult.notes.push('OFAC SDN flag raised (see OFAC Sanctions section). OFAC and EAR are distinct regimes — an SDN match is an independent prohibition separate from the EAR ECCN verdict.');
        hasHighRisk = true;
      }
      if (listTypes.includes('entity_list')) {
        userResult.notes.push('Entity List match: Licence required for all EAR-controlled items; policy of denial typically applies. Verify against current BIS Entity List.');
        hasHighRisk = true;
      }
      if (listTypes.includes('meu')) {
        userResult.notes.push('MEU List match: § 744.21 licence required for items intended for military end-use in listed countries.');
        hasHighRisk = true;
      }
      if (listTypes.includes('state_owned_energy')) {
        userResult.notes.push('State-owned energy entity: Enhanced due diligence required. Military-civil fusion risk; check for subsidiary-level Entity List/SDN entries.');
        userResult.requires_enhanced_dd = true;
        if (!hasHighRisk) hasElevated = true;
      }
    } else {
      userResult.notes.push('No match found in snapshot. This does NOT confirm the entity is clear — snapshot is not exhaustive and is not a live screen.');
    }

    entities.push(userResult);
  }

  let overall_idd_flag;
  if (hasHighRisk) {
    overall_idd_flag = 'high_risk';
  } else if (hasElevated) {
    overall_idd_flag = 'elevated';
  } else {
    overall_idd_flag = 'clear';
  }

  return {
    entities,
    ofac_flags,
    high_risk_countries,
    overall_idd_flag,
    snapshot_date: snapshotDate,
    demo_mode,
    disclaimer: `Screening against point-in-time snapshot dated ${snapshotDate}. ${DISCLAIMER}`
  };
}
