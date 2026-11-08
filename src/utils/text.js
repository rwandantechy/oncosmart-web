import { RECORD_ID_PREVIEW_LENGTH } from "../config/ui";
import { ELLIPSIS, FALLBACKS } from "../content/common";

/** Suffixes the regulator name carries in source data but not in the interface. */
const REGULATOR_SUFFIXES = [" (FDA)"];

const MAX_INITIALS = 2;

export function withFallback(value, fallback = FALLBACKS.notProvided) {
  return value || fallback;
}

export function regulatorLabel(sourceOrg, fallback = "") {
  if (!sourceOrg) return fallback;
  return REGULATOR_SUFFIXES.reduce((label, suffix) => label.replace(suffix, ""), sourceOrg);
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function humanizeFieldName(field) {
  return field.replaceAll("_", " ");
}

export function truncateRecordId(recordId) {
  return `${recordId.slice(0, RECORD_ID_PREVIEW_LENGTH)}${ELLIPSIS}`;
}

export function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))].filter(Boolean);
}
