import { REPORT_FILENAME } from "../config/ui";
import { saveFile } from "../utils/download";
import { ENDPOINTS } from "./endpoints";
import { request, requestFile } from "./httpClient";

export const getSummary = (options) => request(ENDPOINTS.insightsSummary, options);
export const getSources = (options) => request(ENDPOINTS.insightsSources, options);
export const getTimeline = (options) => request(ENDPOINTS.insightsTimeline, options);
export const getCompleteness = (options) => request(ENDPOINTS.insightsCompleteness, options);
export const getResearch = (options) => request(ENDPOINTS.insightsResearch, options);

/** The export is token-protected, so it is fetched rather than linked to. */
export async function downloadReport(options) {
  const { blob, filename } = await requestFile(ENDPOINTS.insightsReportCsv, options);
  saveFile(blob, filename || REPORT_FILENAME);
}
