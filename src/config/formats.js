export const DATE_LOCALE = "en-US";
export const DATE_TIME_ZONE = "UTC";

export const DATE_OPTIONS = {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: DATE_TIME_ZONE,
};

export const DATE_TIME_OPTIONS = {
  ...DATE_OPTIONS,
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
};

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const EMBEDDED_ISO_DATE_PATTERN = /\b\d{4}-\d{2}-\d{2}(?:T[^ .]+)?\b/g;
