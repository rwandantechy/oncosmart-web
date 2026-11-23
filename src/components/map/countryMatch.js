/** Map Natural Earth / world-atlas names ↔ source_country values in our notices. */

const GEO_ALIASES = {
  "united states": "United States of America",
  "united states of america": "United States of America",
  usa: "United States of America",
  us: "United States of America",
  canada: "Canada",
  nigeria: "Nigeria",
  ghana: "Ghana",
  india: "India",
  spain: "Spain",
  taiwan: "Taiwan",
  "taiwan (province of china)": "Taiwan",
};

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

/** Canonical Natural Earth name for a source_country string. */
export function geoNameForCountry(country) {
  const key = normalize(country);
  return GEO_ALIASES[key] || country;
}

/**
 * Build lookup: Natural Earth name → { country, records }.
 * `rows` are `{ country, records }` or insight source rows.
 */
export function buildCountryIndex(rows = []) {
  const index = new Map();
  rows.forEach((row) => {
    const country = row.country || row.country_in_source_record || "";
    if (!country) return;
    const records = Number(row.records) || 0;
    const geoName = geoNameForCountry(country);
    const current = index.get(geoName);
    if (current) {
      current.records += records;
    } else {
      index.set(geoName, { country, records });
    }
  });
  return index;
}

export function recordsForGeo(index, geoName) {
  return index.get(geoName)?.records || 0;
}

export function sourceCountryForGeo(index, geoName) {
  return index.get(geoName)?.country || "";
}
