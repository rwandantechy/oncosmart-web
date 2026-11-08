/** Origin and paths of the public campaign site this app mirrors. */
export const CAMPAIGN_ORIGIN = "https://everydosematters.org";

export const CAMPAIGN_PATHS = {
  about: "/about/",
  whatAreFakeMedicines: "/learn/what-are-fake-medicines/",
  healthProfessionals: "/essential-information-for-healthcare-providers/",
  patients: "/essential-information-for-patients/",
  contact: "/contact-us/",
};

export function campaignUrl(path) {
  return `${CAMPAIGN_ORIGIN}${path}`;
}

export const CAMPAIGN_SOCIALS = {
  linkedin: "https://www.linkedin.com/company/besafejhu",
  bluesky: "https://bsky.app/profile/jhu-besafe.bsky.social",
};
