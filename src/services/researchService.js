import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

export function askResearchQuestion(question, options) {
  return request(ENDPOINTS.researchAsk, { method: "POST", body: { question }, ...options });
}
