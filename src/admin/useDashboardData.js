import { OVERVIEW } from "../content/admin";
import useAsyncData from "../hooks/useAsyncData";
import {
  getCompleteness,
  getResearch,
  getSources,
  getSummary,
  getTimeline,
} from "../services/insightsService";
import { getDataset } from "../services/statusService";

const EMPTY_DASHBOARD = {
  summary: null,
  dataset: null,
  sources: [],
  timeline: { items: [] },
  completeness: [],
  research: null,
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
  ]).then(([summary, dataset, sources, timeline, completeness, research]) => ({
    summary,
    dataset,
    sources,
    timeline,
    completeness,
    research,
  }));
}

export default function useDashboardData() {
  return useAsyncData(loadDashboard, DASHBOARD_OPTIONS);
}
