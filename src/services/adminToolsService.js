import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

export function fetchAdminTools({ signal, defaultError } = {}) {
  return request(ENDPOINTS.adminTools, { signal, defaultError });
}

export function runAdminTool(toolId, { signal, defaultError } = {}) {
  return request(ENDPOINTS.adminToolRun(toolId), {
    method: "POST",
    signal,
    defaultError,
  });
}
