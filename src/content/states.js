import { SEARCH } from "./search";

export const SKIP_LINK = {
  label: "Skip to content",
  href: "#main-content",
};

export const MAIN_CONTENT_ID = "main-content";

export const BREADCRUMB = {
  label: "Breadcrumb",
  home: "Home",
};

export const EMPTY_PANEL = {
  timeline: "No publication dates are recorded in these notices.",
  countries: "No country values are recorded in these notices.",
  completeness: "Completeness cannot be calculated until records are imported.",
  categories: "No notice categories are available yet.",
  products: "No product names are recorded in these notices.",
};

export const SEARCH_EMPTY = {
  empty: {
    title: "No notices match this search",
    body: SEARCH.status.noMatches,
  },
  error: {
    title: "Notices could not be loaded",
    body: SEARCH.status.requestFailed,
    retry: "Try again",
  },
  unavailable: {
    title: "Notices are not available",
    body: SEARCH.status.apiUnavailable,
  },
};
