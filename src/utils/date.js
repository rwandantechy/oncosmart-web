import {
  DATE_LOCALE,
  DATE_OPTIONS,
  DATE_TIME_OPTIONS,
  EMBEDDED_ISO_DATE_PATTERN,
  ISO_DATE_PATTERN,
} from "../config/formats";
import { FALLBACKS } from "../content/common";

function parse(value) {
  return ISO_DATE_PATTERN.test(value) ? new Date(`${value}T00:00:00Z`) : new Date(value);
}

export function formatDate(value) {
  if (!value) return FALLBACKS.dateNotProvided;
  const date = parse(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(DATE_LOCALE, DATE_OPTIONS).format(date);
}

export function formatDateTime(value) {
  if (!value) return FALLBACKS.dateNotProvided;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatDate(value);
  return new Intl.DateTimeFormat(DATE_LOCALE, DATE_TIME_OPTIONS).format(date);
}

/** Rewrites ISO dates embedded in generated prose into the display format. */
export function humanizeText(value) {
  return String(value ?? "").replace(EMBEDDED_ISO_DATE_PATTERN, (date) => formatDate(date));
}

export const DATE_FORMATTERS = {
  date: formatDate,
  dateTime: formatDateTime,
};
