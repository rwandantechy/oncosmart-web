export const RECORDS_PAGE_SIZE = 8;
export const RECORD_ID_PREVIEW_LENGTH = 12;

// Mirrors the question length accepted by the API in apps/api/app.py.
export const RESEARCH_QUESTION_MAX_LENGTH = 1000;

// Used only if the export response omits a filename of its own.
export const REPORT_FILENAME = "everydosematters-research-records.csv";

export const TIMELINE_MONTHS_VISIBLE = 12;
export const TOP_PRODUCTS_VISIBLE = 6;

export const BAR_CHART = {
  maxHeightPx: 132,
  minHeightPx: 12,
};

/** Trims the leading century from an ISO month label, so 2026-03 reads as 26-03. */
export const MONTH_LABEL_OFFSET = 2;

export const SCROLL_INTO_VIEW_OPTIONS = { behavior: "smooth", block: "start" };

export const PUBLIC_NOTICE_PAGE_SIZE = 8;
export const SEARCH_DEBOUNCE_MS = 280;

export const SEARCH_PHASES = {
  recent: "recent",
  loading: "loading",
  results: "results",
  empty: "empty",
  error: "error",
  unavailable: "unavailable",
};

export const DOWNLOAD_STATES = {
  idle: "idle",
  working: "working",
  done: "done",
  failed: "failed",
};

export const SKELETON_LINES = {
  card: 3,
  panel: 5,
  table: 6,
};
