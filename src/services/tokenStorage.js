import { STORAGE_KEYS } from "../config/storage";

/** Storage access is guarded: browsers block it in some privacy modes. */
export function readAccessToken() {
  try {
    return window.localStorage.getItem(STORAGE_KEYS.accessToken);
  } catch {
    return null;
  }
}

export function saveAccessToken(token) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.accessToken, token);
    return true;
  } catch {
    return false;
  }
}

export function clearAccessToken() {
  try {
    window.localStorage.removeItem(STORAGE_KEYS.accessToken);
    return true;
  } catch {
    return false;
  }
}
