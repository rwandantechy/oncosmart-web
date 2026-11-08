import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";

/** Service availability, including whether the AI provider can be reached. */
export const getHealth = (options) => request(ENDPOINTS.health, options);

/** Metadata describing the active imported snapshot. */
export const getDataset = (options) => request(ENDPOINTS.dataset, options);

export const HEALTH_FALLBACK = { ai_enabled: false };
