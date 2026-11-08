import { ROUTES } from "../config/routes";

export const SEARCH = {
  trustStrip: {
    text: "Official notices from selected regulators",
    linkLabel: "How this works",
    href: ROUTES.learn,
  },
  hero: {
    eyebrow: "MEDICINE SAFETY SEARCH",
    heading: "Search medicine alerts.",
    intro:
      "Look up a medicine or product name to find official notices, understand the key facts, and open the original source.",
  },
  recent: {
    eyebrow: "RECENT NOTICES",
    heading: "Recently published notices",
  },
  results: {
    eyebrow: "SEARCH RESULTS",
    headingSuffix: "notices",
    regionLabel: "Notices",
    resetLabel: "Show recent notices",
  },
  form: {
    fieldId: "medicine",
    fieldLabel: "Medicine or product name",
    placeholder: "Search a medicine or product name",
    clearLabel: "Clear search",
    submitLabel: "Search",
  },
  suggestions: {
    label: "Try a search:",
    terms: ["Herceptin", "Cyclophosphamide", "Lanreotide"],
  },
  status: {
    empty: "Enter a medicine or product name to search.",
    loading: "Updating…",
    recent: "Latest notices, newest first.",
    found: (total) => `${total} notice${total === 1 ? "" : "s"} found.`,
    noMatches:
      "We couldn't find an alert in the sources and dates covered here. This does not confirm that a medicine is safe or authentic.",
    requestFailed: "Notices could not be loaded. Please try again shortly.",
    apiUnavailable:
      "Search is unavailable right now. Please try again shortly.",
  },
  card: {
    countryPrefix: "Country: ",
    missingProduct: "Product name not provided in source data",
    missingReason: "Reason not provided in source data",
    detailsLabel: "View details",
    detailsLoadingLabel: "Loading…",
    sourceLabel: "View original notice",
    sourceGlyph: "↗",
  },
  explanation: {
    eyebrow: "ALERT SUMMARY",
    heading: "What happened?",
    closeLabel: "Close",
    pending: "Preparing the summary from this record…",
    whyHeading: "Why does it matter?",
    nextHeading: "What should I know or do next?",
    limitationsSummary: "What this alert doesn't confirm",
    technicalSummary: "Technical details",
    sourceLinkLabel: (regulator) => `View original ${regulator} notice →`,
    genericRegulator: "regulatory",
    failed: {
      provider: "unavailable",
      what_happened: "The alert summary is unavailable right now.",
      why_it_matters: "The original notice remains available below.",
      what_to_do_next:
        "Review the original notice or speak with a pharmacist or healthcare professional.",
      limitations: ["The summary service did not return an explanation."],
    },
  },
};

export const TECHNICAL_DETAIL_FIELDS = [
  { label: "Product", field: "product_name" },
  { label: "Manufacturer", field: "manufacturer" },
  { label: "Distributor", field: "distributor" },
  { label: "Reason", field: "reason" },
  { label: "Additional information", field: "more_info", onlyWhenPresent: true },
];
