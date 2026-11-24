import { ANCHOR_IDS } from "../config/routes";

export const DRUGS = {
  title: "Drug list",
  icon: "drugs",
  warning: {
    strong: "NCI oncology drugs",
    text: "Names used to match notices to cancer medicines. Open a drug for official NCI information.",
    linkLabel: "List",
    href: `#${ANCHOR_IDS.drugList}`,
  },
  panel: {
    id: ANCHOR_IDS.drugList,
    eyebrow: "REFERENCE",
    title: "Oncology drugs",
    note: "From the NCI A–Z List of Cancer Drugs. Use Collection tools to refresh this list.",
  },
  loadError: "The drug list could not be loaded.",
  empty: "No drugs match this search.",
  filters: {
    regionLabel: "Filter the drug list",
    search: {
      label: "Search",
      placeholder: "Drug or regimen name",
    },
    letter: {
      label: "Letter",
      anyOption: "All letters",
    },
    clearLabel: "Clear",
  },
  table: {
    name: "Name",
    info: "Official info",
    openLabel: "NCI page",
  },
  countLabel: "{shown} of {total} drugs",
  storageLabel: "Stored in the research database",
  sourceLabel: "View full NCI list",
};
