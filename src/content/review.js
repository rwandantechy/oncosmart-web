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
      "Product names are matched to the NCI cancer-drug list. Use Approve to publish into the workspace file, or Reject if the notice is incomplete, duplicated, or not useful for oncology practice.",
  },
  loadError: "The review list could not be loaded. Please try again shortly.",
  actionError: "That action could not be completed. Please try again.",
  count: (total) =>
    total === 0
      ? "No notices are waiting."
      : `${total} notice${total === 1 ? "" : "s"} waiting for review.`,
  empty: {
    title: "Nothing waiting",
    body: "New notices that fail automatic checks will appear here after the next collection run.",
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
  refreshLabel: "Refresh list",
  busyLabel: "Updating…",
  openRecordLabel: "Open",
  closeLabel: "Close",
  detailEyebrow: "Notice under review",
  issuesHeading: "Needs attention",
  matchNote:
    "Matched product names come from the official NCI A–Z cancer-drug list. Confirm the original regulator text still describes that medicine.",
  overviewLinkLabel: "Open notice review",
  overviewNote: (total) =>
    `${total} notice${total === 1 ? "" : "s"} waiting for review after the latest collection.`,
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
      "Only oncology-matched notices reach this queue. Approved notices join the file this workspace reads. Rejected notices stay out of that file. Always check the original regulator notice before drawing conclusions.",
  },
};
