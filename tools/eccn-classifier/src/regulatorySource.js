/**
 * @module regulatorySource
 * @description Loads and queries the eCFR snapshot data file.
 * Provides citation helpers and staleness detection.
 * @see docs/tools/eccn-classifier/data/ecfr_snapshot.json
 */

/**
 * Load the eCFR snapshot from the data directory.
 * @param {string} [basePath='./data/'] - Base path relative to index.html
 * @returns {Promise<object>} The ecfr_snapshot.json data object
 * @see 15 CFR Parts 730–774 (Export Administration Regulations)
 */
export async function loadSnapshot(basePath = './data/') {
  const response = await fetch(basePath + 'ecfr_snapshot.json');
  if (!response.ok) throw new Error(`Failed to load ecfr_snapshot.json: ${response.status}`);
  return response.json();
}

/**
 * Get a citation entry from the snapshot for a given CFR section.
 * @param {object} snapshot - The ecfr_snapshot.json object
 * @param {string} cfr_section - e.g. '15 CFR § 734' or '§ 740.17'
 * @returns {object|null} The matching section entry, or null if not found
 */
export function getCitation(snapshot, cfr_section) {
  if (!snapshot || !Array.isArray(snapshot.sections)) return null;
  const needle = cfr_section.toLowerCase().replace(/\s+/g, '').replace(/§/g, '');
  return snapshot.sections.find(s => {
    const haystack = (s.section || '').toLowerCase().replace(/\s+/g, '').replace(/§/g, '');
    return haystack.includes(needle) || needle.includes(haystack.slice(-6));
  }) || null;
}

/**
 * Get the age in days of the snapshot data.
 * @param {object} snapshot - The ecfr_snapshot.json object
 * @returns {number} Number of days since data_current_as_of, or Infinity if unknown
 */
export function getSnapshotAge(snapshot) {
  if (!snapshot || !snapshot._meta || !snapshot._meta.data_current_as_of) return Infinity;
  try {
    const asOf = new Date(snapshot._meta.data_current_as_of);
    const now = new Date();
    const diffMs = now - asOf;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  } catch {
    return Infinity;
  }
}

/**
 * Determine whether a staleness warning should be shown.
 * @param {object} snapshot - The ecfr_snapshot.json object
 * @param {number} [thresholdDays=30] - Number of days before warning
 * @returns {{warning: boolean, age_days: number, as_of_date: string|null}}
 */
export function isStalenessWarningNeeded(snapshot, thresholdDays = 30) {
  const age = getSnapshotAge(snapshot);
  const asOf = (snapshot && snapshot._meta && snapshot._meta.data_current_as_of) || null;
  return {
    warning: age >= thresholdDays,
    age_days: age,
    as_of_date: asOf
  };
}
