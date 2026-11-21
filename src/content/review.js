import { ANCHORS } from "../config/routes";

export const REVIEW = {
  title: "Notice review",
  icon: "review",
  compactLabel: "Review",
  warning: {
    strong: "Needs a closer look",
    text: "These notices passed the oncology product match but failed automatic quality checks. Approve only when the record looks complete and clinically relevant.",
    linkLabel: "About these records",
    href: ANCHORS.dataScope,
  },
  hero: {
    heading: "Notices waiting for review",
    intro:
      "Filter the queue, open a notice to edit fields, then Approve to publish or Reject to keep it out of the workspace file.",
  },
  loadError: "The review list could not be loaded. Please try again shortly.",
  actionError: "That action could not be completed. Please try again.",
  saveError: "Those edits could not be saved. Please try again.",
  count: (total, filtered) => {
    if (total === 0) return "No notices are waiting.";
    if (filtered) {
      return `${total} notice${total === 1 ? "" : "s"} match these filters.`;
    }
    return `${total} notice${total === 1 ? "" : "s"} waiting for review.`;
  },
  empty: {
    title: "Nothing waiting",
    body: "New notices that fail automatic checks will appear here after the next collection run.",
  },
  emptyFiltered: {
    title: "No matches",
    body: "No waiting notices match these filters. Clear filters to see the full queue.",
  },
  filters: {
    regionLabel: "Filter notices waiting for review",
    search: { label: "Find a product or issue", placeholder: "e.g. Azacitidine or sterility" },
    country: { label: "Country value", anyOption: "All countries" },
    regulator: { label: "Reporting regulator", anyOption: "All regulators" },
    from: { label: "Published from" },
    to: { label: "Published to" },
    issue: { label: "Needs attention", anyOption: "All issues" },
    clearLabel: "Clear filters",
  },
  tableHeadings: [
    "Publication",
    "Matched product",
    "Needs attention",
    "Country",
    "Reporting regulator",
  ],
  missingProduct: "Product not named",
  missingReason: "Reason not provided",
  missingCountry: "Country not stated",
  noIssues: "No listed issues — review the full notice before deciding.",
  actionsHeading: "Actions",
  approveLabel: "Approve",
  rejectLabel: "Reject",
  editLabel: "Edit",
  saveLabel: "Save changes",
  refreshLabel: "Refresh list",
  busyLabel: "Updating…",
  openRecordLabel: "Open",
  closeLabel: "Close",
  detailEyebrow: "Notice under review",
  issuesHeading: "Needs attention",
  editHeading: "Correct notice fields",
  matchNote:
    "Matched product names come from the official NCI A–Z cancer-drug list. Confirm the original regulator text still describes that medicine.",
  overviewLinkLabel: "Open notice review",
  overviewNote: (total) =>
    `${total} notice${total === 1 ? "" : "s"} waiting for review after the latest collection.`,
  fields: {
    product_name: "Matched product",
    reason: "Reason",
    source_country: "Country value",
    publish_date: "Publication date",
    manufacturer: "Manufacturer",
    distributor: "Distributor",
    more_info: "Additional source information",
  },
  issueLabels: {
    "missing product_name": "Product name is missing",
    "missing reason": "Reason is missing",
    "missing publish_date": "Publication date is missing",
    "publish_date must match PIPELINE_DATE_PATTERN": "Publication date is not a full calendar date",
    "duplicate record_id": "This notice looks like a duplicate",
  },
  issueLabel(issue) {
    return this.issueLabels[issue] || issue;
  },
  scope: {
    id: "review-scope",
    title: "About these records",
    text:
      "Only oncology-matched notices reach this queue. Edit fields if the match needs correction. Approved notices join the file this workspace reads. Rejected notices stay out of that file. Always check the original regulator notice before drawing conclusions.",
  },
};
