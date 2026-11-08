import { NEXT_PARAM } from "./auth";

export const ROUTES = {
  home: "/",
  about: "/about",
  learn: "/learn",
  healthProfessionals: "/health-professionals",
  patients: "/patients",
  login: "/login",
  signup: "/signup",
  adminOverview: "/admin",
  adminAssistant: "/admin/assistant",
  adminSettings: "/admin/settings",
};

export const ANCHOR_IDS = {
  siteFooter: "site-footer",
  dataScope: "data-scope",
  assistantScope: "assistant-scope",
  accountSettings: "account-settings",
};

export const ANCHORS = Object.fromEntries(
  Object.entries(ANCHOR_IDS).map(([name, id]) => [name, `#${id}`]),
);

export const PAGES = {
  home: "home",
  about: "about",
  learn: "learn",
  healthProfessionals: "healthProfessionals",
  patients: "patients",
  login: "login",
  signup: "signup",
  adminOverview: "adminOverview",
  adminAssistant: "adminAssistant",
  adminSettings: "adminSettings",
};

const PAGE_BY_PATH = {
  [ROUTES.about]: PAGES.about,
  [ROUTES.learn]: PAGES.learn,
  [ROUTES.healthProfessionals]: PAGES.healthProfessionals,
  [ROUTES.patients]: PAGES.patients,
  [ROUTES.login]: PAGES.login,
  [ROUTES.signup]: PAGES.signup,
  [ROUTES.adminAssistant]: PAGES.adminAssistant,
  [ROUTES.adminSettings]: PAGES.adminSettings,
  [ROUTES.adminOverview]: PAGES.adminOverview,
};

/** Pages that read workspace data, which the API serves only to a signed-in user. */
export const PAGES_REQUIRING_SESSION = [
  PAGES.adminOverview,
  PAGES.adminAssistant,
  PAGES.adminSettings,
];

export function pageForPath(pathname) {
  return PAGE_BY_PATH[pathname] || PAGES.home;
}

/** Sign-in URL that reopens `pathname` afterwards. */
export function loginPathFor(pathname) {
  return `${ROUTES.login}?${new URLSearchParams({ [NEXT_PARAM]: pathname })}`;
}

/**
 * Keeps a `next` value usable as a redirect target. Anything that is not a
 * plain same-origin path is discarded so the parameter cannot send a visitor
 * to another site.
 */
export function safeRedirectPath(value, fallback = ROUTES.adminOverview) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
