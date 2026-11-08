import { AUTH_SCHEME, SESSION_EXPIRED_EVENT, UNAUTHORIZED } from "../config/auth";
import { API_BASE_URL } from "../config/env";
import { REQUEST_ERROR } from "../content/common";
import { clearAccessToken, readAccessToken } from "./tokenStorage";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export function withQuery(path, params) {
  const query = new URLSearchParams(params).toString();
  return query ? `${path}?${query}` : path;
}

function headersWithToken(extra) {
  const token = readAccessToken();
  return { ...extra, ...(token ? { Authorization: `${AUTH_SCHEME} ${token}` } : {}) };
}

const SERVER_ERROR = 500;

function asMessage(detail, fallback, status) {
  if (status >= SERVER_ERROR) return fallback;
  if (typeof detail === "string" && detail) return detail;
  if (Array.isArray(detail)) {
    const messages = detail.map((item) => item?.msg).filter(Boolean);
    if (messages.length) return messages.join(" ");
  }
  return fallback;
}

/**
 * Turns a failed response into an error. A 401 only drops the session when a
 * token was actually sent, so a failed sign-in does not look like a logout.
 * 5xx details stay on the server; the UI only sees the caller’s fallback.
 */
function failure(response, detail, defaultError) {
  if (response.status === UNAUTHORIZED && readAccessToken()) {
    clearAccessToken();
    window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
  }
  return new ApiError(asMessage(detail, defaultError, response.status), response.status);
}

export async function request(
  path,
  { method = "GET", body, signal, defaultError = REQUEST_ERROR } = {},
) {
  const hasBody = body !== undefined;
  const response = await fetch(apiUrl(path), {
    method,
    signal,
    headers: headersWithToken(hasBody ? { "Content-Type": "application/json" } : undefined),
    ...(hasBody ? { body: JSON.stringify(body) } : {}),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw failure(response, payload?.detail, defaultError);
  return payload;
}

const FILENAME_PATTERN = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i;

/** Fetches a file with the access token attached, which a link cannot do. */
export async function requestFile(path, { signal, defaultError = REQUEST_ERROR } = {}) {
  const response = await fetch(apiUrl(path), { signal, headers: headersWithToken() });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw failure(response, payload?.detail, defaultError);
  }
  const disposition = response.headers.get("Content-Disposition") || "";
  return {
    blob: await response.blob(),
    filename: FILENAME_PATTERN.exec(disposition)?.[1] || "",
  };
}
