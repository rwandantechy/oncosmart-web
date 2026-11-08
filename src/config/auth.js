export const AUTH_MODES = {
  login: "login",
  signup: "signup",
};

// Mirrors V2_SIGNUP_OPEN in the API. Public account creation is closed.
export const SIGNUP_OPEN = false;

// Mirrors the validation limits enforced by the API in apps/api/core/settings.py.
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 120;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export const AUTH_REDIRECT_DELAY_MS = 500;

// Mirrors settings.AUTH_SCHEME in apps/api/core/settings.py.
export const AUTH_SCHEME = "Bearer";
export const UNAUTHORIZED = 401;

// Fired when the API refuses a stored token, so the open page can react
// without the HTTP layer having to know which page is showing.
export const SESSION_EXPIRED_EVENT = "edm:session-expired";

// Query parameter carrying the page to reopen after signing in.
export const NEXT_PARAM = "next";

export const SESSION_STATES = {
  checking: "checking",
  signedIn: "signedIn",
  signedOut: "signedOut",
};
