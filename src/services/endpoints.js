const API = "/api";

export const ENDPOINTS = {
  health: `${API}/health`,
  dataset: `${API}/dataset`,
  alerts: `${API}/alerts`,
  alert: (recordId) => `${API}/alerts/${encodeURIComponent(recordId)}`,
  alertExplanation: (recordId) => `${API}/alerts/${encodeURIComponent(recordId)}/explain`,
  insightsSummary: `${API}/insights/summary`,
  insightsSources: `${API}/insights/sources`,
  insightsTimeline: `${API}/insights/timeline`,
  insightsCompleteness: `${API}/insights/completeness`,
  insightsResearch: `${API}/insights/research`,
  insightsReportCsv: `${API}/insights/report.csv`,
  researchAsk: `${API}/research/ask`,
  authRegister: `${API}/auth/register`,
  authLogin: `${API}/auth/login`,
  authSession: `${API}/auth/me`,
  authPassword: `${API}/auth/password`,
};
