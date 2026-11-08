import { ALERT_QUERY_KEYS } from "./apiContract";
import { ENDPOINTS } from "./endpoints";
import { request, withQuery } from "./httpClient";

const QUERY_KEY_BY_FILTER = {
  q: ALERT_QUERY_KEYS.q,
  country: ALERT_QUERY_KEYS.country,
  regulator: ALERT_QUERY_KEYS.regulator,
  from: ALERT_QUERY_KEYS.from,
  to: ALERT_QUERY_KEYS.to,
};

export function searchAlerts({ filters = {}, page, pageSize } = {}, options) {
  const params = {};
  Object.entries(QUERY_KEY_BY_FILTER).forEach(([filter, key]) => {
    if (filters[filter]) params[key] = filters[filter];
  });
  if (page) params[ALERT_QUERY_KEYS.page] = String(page);
  if (pageSize) params[ALERT_QUERY_KEYS.pageSize] = String(pageSize);
  return request(withQuery(ENDPOINTS.alerts, params), options);
}

export function getAlert(recordId, options) {
  return request(ENDPOINTS.alert(recordId), options);
}

export function explainAlert(recordId, options) {
  return request(ENDPOINTS.alertExplanation(recordId), { method: "POST", ...options });
}
