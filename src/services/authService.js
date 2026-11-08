import { AUTH_MODES } from "../config/auth";
import { AUTH_SHARED } from "../content/auth";
import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";
import { clearAccessToken, readAccessToken, saveAccessToken } from "./tokenStorage";

function storeSession(data) {
  if (data?.access_token) saveAccessToken(data.access_token);
  return data;
}

export async function authenticate({ mode, name, email, password }) {
  const isSignup = mode === AUTH_MODES.signup;
  const data = await request(isSignup ? ENDPOINTS.authRegister : ENDPOINTS.authLogin, {
    method: "POST",
    body: isSignup ? { name, email, password } : { email, password },
    defaultError: AUTH_SHARED.retryError,
  });
  return storeSession(data);
}

/** Asks the API who the stored token belongs to. Rejects when it has none. */
export function getSession(options) {
  if (!readAccessToken()) return Promise.reject(new Error(AUTH_SHARED.signedOutError));
  return request(ENDPOINTS.authSession, options);
}

export async function updateProfile(name, options) {
  return storeSession(
    await request(ENDPOINTS.authSession, {
      method: "PATCH",
      body: { name },
      defaultError: AUTH_SHARED.genericError,
      ...options,
    }),
  );
}

export async function changePassword({ currentPassword, newPassword }, options) {
  return storeSession(
    await request(ENDPOINTS.authPassword, {
      method: "POST",
      body: { current_password: currentPassword, new_password: newPassword },
      defaultError: AUTH_SHARED.genericError,
      ...options,
    }),
  );
}

export function signOut() {
  clearAccessToken();
}
