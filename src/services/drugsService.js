import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

export function fetchDrugs({ signal, defaultError } = {}) {
  return request(ENDPOINTS.drugs, { signal, defaultError });
}
