import { CAMPAIGN_PATHS, CAMPAIGN_SOCIALS, campaignUrl } from "../config/campaign";
import { ANCHOR_IDS, ROUTES } from "../config/routes";

export const BRAND = {
  publicName: "Every Dose Matters",
  productName: "EveryDoseMatters",
  workspaceTagline: "Research workspace",
  publicHomeLabel: "Every Dose Matters home",
  productHomeLabel: "EveryDoseMatters home",
};

export const SITE_NAV_LABEL = "Main navigation";

export const SITE_NAV = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Learn", href: ROUTES.learn },
  { label: "For health professionals", href: ROUTES.healthProfessionals },
  { label: "For patients", href: ROUTES.patients },
  { label: "Alerts dashboard", href: ROUTES.adminOverview },
];

export const WORKSPACE_SECTIONS = {
  overview: "overview",
  assistant: "assistant",
  review: "review",
  settings: "settings",
  search: "search",
  publicView: "publicView",
};

/** Grouped workspace chrome — primary tools stay in the mobile bar; open links do not. */
export const WORKSPACE_NAV_GROUPS = [
  {
    id: "workspace",
    label: "Workspace",
    tier: "primary",
    items: [
      {
        id: WORKSPACE_SECTIONS.overview,
        label: "Overview",
        href: ROUTES.adminOverview,
        icon: "overview",
      },
      {
        id: WORKSPACE_SECTIONS.assistant,
        label: "Ask",
        compactLabel: "Ask",
        href: ROUTES.adminAssistant,
        icon: "assistant",
      },
      {
        id: WORKSPACE_SECTIONS.review,
        label: "Notice review",
        compactLabel: "Review",
        href: ROUTES.adminReview,
        icon: "review",
      },
      {
        id: WORKSPACE_SECTIONS.settings,
        label: "Settings",
        href: ROUTES.adminSettings,
        icon: "settings",
      },
    ],
  },
  {
    id: "open",
    label: "Open",
    tier: "secondary",
    items: [
      {
        id: WORKSPACE_SECTIONS.search,
        label: "Alert search",
        href: ROUTES.home,
        icon: "search",
        external: true,
      },
      {
        id: WORKSPACE_SECTIONS.publicView,
        label: "Public site",
        href: ROUTES.home,
        icon: "external",
        external: true,
      },
    ],
  },
];

export const WORKSPACE_NAV_LABEL = "Workspace navigation";

export const ACCOUNT_ACTIONS = {
  signOut: "signOut",
};

export const ACCOUNT = {
  context: "Research workspace",
  statusTitle: "Signed in",
  profileLabel: (name) => `${name} profile`,
  menuItems: [
    { type: "link", label: "Settings", href: ROUTES.adminSettings, icon: "settings" },
    { type: "button", label: "Sign out", icon: "signout", action: ACCOUNT_ACTIONS.signOut },
  ],
};

export const FOOTER = {
  id: ANCHOR_IDS.siteFooter,
  banner: "For patients. For providers. For real cancer care.",
  hashtag: "#NoFakesForHealthsake",
  description:
    "EveryDoseMatters is an initiative of the Behavioral and Educational Strategies for Avoiding Falsified Medicine Exposure (BESAFE) at the Johns Hopkins Bloomberg School of Public Health.",
  copyrightHolder: "Johns Hopkins University. All rights reserved.",
  partnerLogoAlt: "Johns Hopkins Bloomberg School of Public Health and BESAFE",
  links: [
    { label: "About", href: ROUTES.about },
    { label: "Learn", href: ROUTES.learn },
    { label: "For patients", href: ROUTES.patients },
    { label: "For health professionals", href: ROUTES.healthProfessionals },
    { label: "Contact", href: campaignUrl(CAMPAIGN_PATHS.contact) },
  ],
  socialLabel: "BESAFE on the web",
  socials: [
    { label: "LinkedIn", href: CAMPAIGN_SOCIALS.linkedin, icon: "linkedin" },
    { label: "Bluesky", href: CAMPAIGN_SOCIALS.bluesky, icon: "bluesky" },
  ],
};

export const copyrightLine = (year) => `Copyright ©${year} ${FOOTER.copyrightHolder}`;
