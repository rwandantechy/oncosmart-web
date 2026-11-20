import { ANCHORS } from "../config/routes";

export const REVIEW = {
  title: "Notice review",
  icon: "review",
  compactLabel: "Review",
  warning: {
    strong: "Needs a closer look",
    text: "These notices did not pass automatic checks. Approve them only after you are satisfied with the record.",
    linkLabel: "About these records",
    href: ANCHORS.dataScope,
  },
  hero: {
    heading: "Notices waiting for review",
    intro:
      "Each row shows what is missing or unclear. Approving adds the notice to the approved file used by this workspace.",
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
  tableHeadings: ["Publication", "Product", "Needs attention", "Reporting regulator"],
  missingProduct: "Product not named",
  missingReason: "Reason not provided",
  approveLabel: "Approve",
  rejectLabel: "Reject",
  busyLabel: "Updating…",
  openSourceLabel: "Open original notice",
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
      "Approved notices join the file this workspace reads. Rejected notices stay out of that file. Always check the original regulator notice before drawing conclusions.",
  },
};
