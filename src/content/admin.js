import { ANCHORS, ANCHOR_IDS, ROUTES } from "../config/routes";
import { TIMELINE_MONTHS_VISIBLE } from "../config/ui";

export const OVERVIEW = {
  title: "Research overview",
  icon: "overview",
  warning: {
    strong: "Imported notices",
    text: "This workspace describes imported records, not live safety monitoring.",
    linkLabel: "About these records",
    href: ANCHORS.dataScope,
  },
  loadError: "These records could not be loaded. Please try again shortly.",
  command: {
    regionLabel: "Workspace data status",
    collection: "Last collection",
    imported: "Last import",
    publication: "Latest publication",
    coverage: "Publication coverage",
    status: "File status",
    historicalValue: "Historical",
    pendingNote: "Awaiting validation",
    downloadLabel: "Download CSV",
    downloadingLabel: "Preparing…",
    downloadedLabel: "Downloaded",
    downloadRetryLabel: "Retry download",
    downloadError: "The records could not be downloaded.",
    reviewOpen: "Open review queue",
    reviewClear: "Review queue clear",
    drillHint: "Select a chart value to filter published notices below.",
  },
  metrics: {
    regionLabel: "Key figures",
    cards: [
      { key: "total", label: "Total notices", note: "on file" },
      { key: "regulators", label: "Regulators", note: "reporting agencies" },
      { key: "countries", label: "Countries", note: "named in records" },
    ],
    pendingReview: { label: "Awaiting review", note: "need a decision" },
    incomplete: { label: "Field gaps", note: "lowest completeness" },
    status: {
      label: "Data status",
      historicalValue: "Historical",
      pendingNote: "Awaiting validation",
    },
  },
  timeline: {
    eyebrow: "Activity",
    title: "Notices by month",
    note: `Last ${TIMELINE_MONTHS_VISIBLE} publication months. Click a bar to filter the table.`,
    chartLabel: "Alerts by publication month",
    footnoteRange: (start, end) => ` records · ${start}–${end}.`,
    footnoteNote: "Publication dates, not collection dates.",
  },
  countries: {
    eyebrow: "Geography",
    title: "Countries named in notices",
    note: "Values as written in the source notice. Click the map or a chip to filter.",
    publishedBy: (regulator) => regulator,
  },
  completeness: {
    eyebrow: "Quality",
    title: "Field completeness",
    note: "Share of imported records that carry each field",
    ratio: (valid, total) => `${valid} / ${total}`,
  },
  categories: {
    eyebrow: "Brief",
    title: "Notice categories",
    downloadLabel: "Download records",
    downloadingLabel: "Preparing file…",
    downloadedLabel: "Downloaded",
    downloadRetryLabel: "Try download again",
    downloadError: "The records could not be downloaded.",
    recordCount: (records) => `${records}`,
  },
  products: {
    eyebrow: "Products",
    title: "Most frequent",
    note: "Click a product to filter published notices",
  },
  reviewRail: {
    eyebrow: "Queue",
    title: "Notice review",
    empty: "Nothing waiting for review.",
    cta: "Open review",
    count: (total) => `${total} waiting`,
  },
  scope: {
    id: ANCHOR_IDS.dataScope,
    title: "How to read these notices",
    text:
      "Totals cover every imported notice on file. Charts use publication dates. Collection and import dates show when records were added here, not when a medicine was used.",
  },
  footnote: (collection, imported, publication) =>
    `Last collection: ${collection} · Last import: ${imported} · Latest publication: ${publication}`,
};

export const RECORDS_REVIEW = {
  eyebrow: "Records",
  title: "Published notices",
  searchAllLabel: "Search all notices",
  searchAllHref: ROUTES.home,
  filters: {
    regionLabel: "Filter research records",
    search: { label: "Find a product or issue", placeholder: "e.g. Herceptin or counterfeit" },
    country: { label: "Country value", anyOption: "All countries" },
    regulator: { label: "Reporting regulator", anyOption: "All regulators" },
    from: { label: "Published from" },
    to: { label: "Published to" },
    clearLabel: "Clear filters",
  },
  updatingLabel: "Updating records…",
  recordCount: (total, filtered) =>
    `${total} record${total === 1 ? "" : "s"} match${filtered ? " these filters" : ""}.`,
  pageRange: (first, last, total) => `${first}–${last} of ${total}`,
  tableHeadings: ["Publication", "Product", "Country value", "Reporting regulator"],
  missingReason: "Reason not provided",
  reviewLabel: "Review",
  emptyLabel: "No records match these filters.",
  pagination: {
    regionLabel: "Record pages",
    previousLabel: "Previous",
    nextLabel: "Next",
    status: (page, pageCount) => `Page ${page} of ${pageCount}`,
  },
  detail: {
    eyebrow: "ALERT RECORD",
    titleId: "record-detail-title",
    missingTitle: "Untitled alert",
    closeLabel: "Close record details",
    missingReason: "Reason not provided in the imported record.",
    additionalHeading: "Additional source information",
    missingAdditional: "No additional information was imported for this record.",
    sourceLinkLabel: "Open original regulator notice",
    closeButtonLabel: "Close",
  },
  listError: "Filtered records could not be loaded.",
  detailError: "This record could not be opened.",
};

export const RECORD_DETAIL_FIELDS = [
  { label: "Publication date", field: "publish_date", format: "date" },
  { label: "Country value", field: "source_country" },
  { label: "Reporting regulator", field: "source_org" },
  { label: "Manufacturer", field: "manufacturer" },
  { label: "Distributor", field: "distributor" },
  { label: "Collected", field: "scraped_at", format: "dateTime" },
  { label: "Source ID", field: "source_id" },
  { label: "Record ID", field: "record_id" },
];

export const ASSISTANT = {
  title: "Research assistant",
  icon: "assistant",
  warning: {
    strong: "Imported notices",
    text: "Answers come from notices already on file, not from live safety monitoring.",
    linkLabel: "About these records",
    href: ANCHORS.assistantScope,
  },
  hero: {
    heading: "Ask about these medicine notices",
    intro:
      "Questions are answered from the notices on file. Each answer shows what it can and cannot tell you.",
  },
  status: {
    checking: "Checking",
    ready: "Ready",
    snapshot: "Notices only",
    groundedNote: "Answers stay inside the notices on file.",
    readOnlyNote: "Answers stay inside the notices on file.",
    availableClass: "available",
    fallbackClass: "fallback",
    checkingClass: "checking",
  },
  welcome: {
    startersLabel: "Try a question",
  },
  suggestions: [
    "What are the latest available notices?",
    "Which regulators published the most notices?",
    "Which countries are named in the notices?",
  ],
  fallbackSuggestions: [
    "Which products appear most often in the records?",
    "How many notices came from each regulator?",
    "What publication dates do these notices cover?",
  ],
  answer: {
    fromNotices: "From the notices",
    groundedNote: "Limited to the notices on file",
    evidenceLabel: "Based on",
    limitationsLabel: "Limits",
    helpHeading: "Try one of these questions",
  },
  typingLabel: "Looking through the notices",
  actions: {
    startOver: "Start over",
    edit: "Edit",
    remove: "Remove",
    stop: "Stop",
    clearDraft: "Clear",
  },
  composer: {
    placeholder: "Ask about a medicine or notice…",
    fieldLabel: "Ask about a medicine or notice",
    sendLabel: "Ask",
    disclaimer: "Check the original notice before drawing conclusions.",
  },
  unreachableAnswer: {
    answer: "An answer could not be prepared just now. Please try again.",
    limitations: ["No answer was returned for this question."],
  },
  scope: {
    id: ANCHOR_IDS.assistantScope,
    title: "About these records",
    text:
      "Answers are limited to the notices already on file. They are not clinical advice. They cannot tell you how common a problem is, whether a medicine caused it, or whether a medicine is safe.",
  },
};
