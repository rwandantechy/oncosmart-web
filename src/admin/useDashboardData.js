import { OVERVIEW } from "../content/admin";
import useAsyncData from "../hooks/useAsyncData";
import {
  getCompleteness,
  getResearch,
  getSources,
  getSummary,
  getTimeline,
} from "../services/insightsService";
import { listPending } from "../services/reviewService";
import { getDataset } from "../services/statusService";

const EMPTY_DASHBOARD = {
  summary: null,
  dataset: null,
  sources: [],
  timeline: { items: [] },
  completeness: [],
  research: null,
  pendingReview: 0,
};

const DASHBOARD_OPTIONS = { initialData: EMPTY_DASHBOARD, errorMessage: OVERVIEW.loadError };

function loadDashboard() {
  return Promise.all([
    getSummary(),
    getDataset(),
    getSources(),
    getTimeline(),
    getCompleteness(),
    getResearch(),
    listPending().catch(() => ({ total: 0 })),
  ]).then(([summary, dataset, sources, timeline, completeness, research, pending]) => ({
    summary,
    dataset,
    sources,
    timeline,
    completeness,
    research,
    pendingReview: pending?.total || 0,
  }));
}

export default function useDashboardData() {
  return useAsyncData(loadDashboard, DASHBOARD_OPTIONS);
}
