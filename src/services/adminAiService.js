import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

export function fetchAdminAi({ signal, defaultError } = {}) {
  return request(ENDPOINTS.adminAi, { signal, defaultError });
}

export function saveAdminAi(payload, { signal, defaultError } = {}) {
  return request(ENDPOINTS.adminAi, {
    method: "PUT",
    body: payload,
    signal,
    defaultError,
  });
}
