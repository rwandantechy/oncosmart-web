/**
 * Copy for the public information pages, taken from the EveryDoseMatters
 * campaign site so that this app and everydosematters.org say the same thing.
 * Each page links back to the page it mirrors.
 */

import { CAMPAIGN_PATHS, campaignUrl } from "../config/campaign";
import { PAGES, ROUTES } from "../config/routes";

export const SEARCH_CALL_TO_ACTION = {
  heading: "Check the regulatory record",
  text: "Search official notices published by the regulators covered here, read what each notice says, and open the original source.",
  linkLabel: "Search medicine alerts",
  href: ROUTES.home,
};

export const SOURCE_NOTE = {
  strong: "Campaign source",
  linkLabel: "Read the full page on everydosematters.org",
};

export const CONTENT_PAGES = {
  [PAGES.about]: {
    eyebrow: "ABOUT THE CAMPAIGN",
    heading: "Our Campaign for Safer Cancer Care",
    intro:
      "No one fighting cancer should have to face substandard or falsified medicines.",
    sourceHref: campaignUrl(CAMPAIGN_PATHS.about),
    sections: [
      {
        heading: "Our purpose",
        paragraphs: [
          "Safe, effective cancer care depends on the quality and authenticity of medicines. However, substandard and falsified (“fake”) cancer medicines continue to circulate globally, exposing patients to treatment failure, avoidable harm, and loss of confidence in legitimate therapies. These products undermine trust in healthcare systems and threaten hard-won progress in cancer prevention and control.",
          "EveryDoseMatters is a global cancer medicine safety campaign that supports efforts to prevent, detect, and respond to substandard and falsified cancer medicines. The campaign equips patients, healthcare providers, and caregivers with practical, evidence-informed information to support safer use of cancer medicines.",
          "EveryDoseMatters is an initiative of the Behavioral and Educational Strategies for Avoiding Falsified Medicine Exposure (BESAFE) based within the Department of Population, Family and Reproductive Health at the Johns Hopkins Bloomberg School of Public Health.",
        ],
      },
      {
        heading: "Our focus areas",
        points: [
          {
            term: "Education and awareness",
            text: "On the risks and consequences of substandard and falsified cancer medicines.",
          },
          {
            term: "Prevention",
            text: "Through safer prescribing, dispensing, procurement, and use.",
          },
          {
            term: "Detection",
            text: "Of potential quality concerns and warning signs.",
          },
          {
            term: "Reporting and response",
            text: "To support patient safety and timely public health action.",
          },
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "Cancer medicines, including chemotherapy, targeted therapies, immunotherapies, and hormonal treatments, are essential to effective cancer care. When these medicines are substandard or falsified, patients may experience reduced treatment effectiveness, adverse outcomes, and erosion of trust in healthcare systems.",
          "Strengthening awareness and early action around medicine quality is a critical component of patient safety and health system resilience.",
        ],
      },
      {
        heading: "Who we serve",
        paragraphs: [
          "EveryDoseMatters is designed to support caregivers and patients involved in cancer treatment and decision making, healthcare providers who prescribe, dispense, and administer cancer medicines, and health systems, professional organizations, and partners working to improve medicine safety.",
          "Content is tailored by role to ensure relevance while reinforcing shared responsibility for protecting patients from poor-quality medicines.",
        ],
      },
      {
        heading: "Our commitment",
        paragraphs: [
          "Every dose matters. Every patient deserves access to safe, quality-assured cancer medicines. Through EveryDoseMatters, BESAFE at the Johns Hopkins Bloomberg School of Public Health supports global efforts to safeguard patients and strengthen trust in cancer care.",
        ],
      },
    ],
  },

  [PAGES.learn]: {
    eyebrow: "LEARN",
    heading: "What are fake cancer medicines?",
    intro:
      "A medication can be “fake” in several ways: its formulation, identity, or source. The World Health Organization uses the term substandard and falsified (SF) to describe medications that pose a threat to public health, and the campaign uses that terminology interchangeably with “fake.” Pills, intravenous, and oral medicines are all impacted.",
    sourceHref: campaignUrl(CAMPAIGN_PATHS.whatAreFakeMedicines),
    sections: [
      {
        heading: "Three terms, three different problems",
        points: [
          {
            term: "Substandard",
            text: "Genuine medical products that fail to meet quality standards or specifications. They are made by legitimate manufacturers but may be poorly produced, degraded, or improperly stored, resulting in incorrect strength, contamination, or reduced effectiveness.",
          },
          {
            term: "Falsified",
            text: "Medical products that deliberately misrepresent their identity, composition, or source. They may contain no active ingredient, the wrong ingredient, or dangerous substitutes, and often carry fake packaging.",
          },
          {
            term: "Counterfeit",
            text: "Traditionally refers to intellectual property violations. The WHO now distinguishes counterfeit from substandard and falsified because counterfeit emphasizes the legal issue rather than safety, but in practice it often overlaps with falsified drugs.",
          },
        ],
      },
      {
        heading: "What is the scale?",
        paragraphs: [
          "Substandard and falsified cancer medicines have been found in over 100 countries, including high-income countries. Counterfeiting of cancer medicines increased by 33% between 2022 and 2024.",
        ],
        bullets: [
          "At least 10% of all medicines are fake in low- and middle-income countries, and estimates may be higher for cancer medicines. In Africa, 1 in 5 cancer medicines were found to be substandard in a recent Lancet Global Health study.",
          "Estimates for high-income countries are unavailable, but incidents are rising with increased online pharmacy usage. In the U.S., 95% of online pharmacies are estimated to be illegal, and 24% of Americans who have used an online pharmacy have been exposed to substandard and falsified medicines.",
          "Cancer medicines are the top-selling medicine category on online pharmacies operating without authorization.",
        ],
      },
      {
        heading: "How do fake medicines reach patients?",
        paragraphs: [
          "The journey of substandard and falsified cancer medicines often begins long before they reach hospitals or pharmacies. Weak oversight, fragmented supply chains, and cost pressures create openings at every link in the chain.",
        ],
        points: [
          {
            term: "Production",
            text: "Active ingredients or finished products made in facilities that do not follow Good Manufacturing Practices, leading to contamination and errors — especially where regulation and legal oversight are weak.",
          },
          {
            term: "Transportation",
            text: "Repackaging across borders can remove anti-counterfeiting features or reprint serial numbers and expiry dates incorrectly. Cancer medicines also need temperature-controlled conditions, and cold chain lapses leave an ineffective or dangerous product.",
          },
          {
            term: "Distribution and wholesale",
            text: "Parallel trade and gray markets can pass through 20–30 intermediary transactions without verifying a product's origin. Free trade zones with low regulatory oversight are attractive to criminals, and foreign-labelled drugs may arrive without a documented pedigree.",
          },
          {
            term: "Marketing and retail",
            text: "Most online pharmacies operate illegally, and 50–90% of medicines sold online are substandard or falsified. Street vendors, informal markets, and medical tourism carry similar risks.",
          },
        ],
      },
      {
        heading: "Identifying fake cancer medicines: it is as easy as PIE(S)",
        paragraphs: [
          "Visual checks are useful, but they have limits. Even trained professionals cannot always spot a substandard or falsified medicine by sight alone, and true confirmation requires laboratory analysis. These steps help you recognise warning signs and know when to speak up.",
        ],
        points: [
          {
            term: "Precaution before purchasing",
            text: "Be alert when a medicine that was short in supply is suddenly available, when prices are unusually low, or when wholesaler and distributor documentation is missing. Do not be fooled by online pharmacies that seem too good to be true, and familiarise yourself with the appearance, taste, and packaging of your prescribed medicine.",
          },
          {
            term: "Inspect your medicines and packaging",
            text: "Substandard and falsified medicines may differ in size, shape, colour, or packaging quality. Look for tampering, incorrect labelling, missing branding, odd textures, or foreign languages.",
          },
          {
            term: "Examine medicine effectiveness and safety",
            text: "After using the medicine, watch for an unexpected lack of therapeutic effect, unexpected side effects or reactions, or a strange taste, smell, or texture.",
          },
          {
            term: "Speak up and report when suspicious",
            text: "Trust your instincts. If a medicine looks different, does not work as expected, or causes unusual side effects, stop use immediately and report it. Document where and when you obtained it, photograph the packaging, and keep the medicine in case it is sent for laboratory testing.",
          },
        ],
      },
    ],
  },

  [PAGES.healthProfessionals]: {
    eyebrow: "FOR HEALTH PROFESSIONALS",
    heading: "Information for Health Professionals",
    intro:
      "As a health professional, you are a critical player in the drug supply chain. You can break the link between criminals and patients by recognizing the warning signs of fake medicines, guiding patients toward safe sources, and reporting suspicious products before they cause harm.",
    sourceHref: campaignUrl(CAMPAIGN_PATHS.healthProfessionals),
    sections: [
      {
        heading: "Key takeaway messages: the four P's",
        paragraphs: [
          "By taking the time to educate yourself and your patients, you ensure that public health and healthcare systems remain trustworthy and effective.",
        ],
        points: [
          {
            term: "Pause — check before you trust",
            text: "Take 30 seconds for a quick medication safety check. Ask where the patient obtained the medicine and visually inspect the tablets or packaging if efficacy seems off. A short pause can prevent harm.",
          },
          {
            term: "Probe — ask and verify",
            text: "Ask patients where and how they obtained their medicine. Use a pharmacy verification tool to confirm safe sources, and reinforce the message: only buy from verified pharmacies.",
          },
          {
            term: "Protect — teach to spot the fakes",
            text: "Show patients three simple red flags: misspellings on labels, pills that look or feel wrong, or packaging that has been opened or tampered with. Empower them to check before they take.",
          },
          {
            term: "Pass it on — report and share",
            text: "Report suspected fakes to your regulator, and encourage patients to report as well. Adding a reporting link or phrase to your records system makes it easy.",
          },
        ],
      },
      {
        heading: "Purchasing for a clinic or pharmacy",
        bullets: [
          "Verify wholesaler and distributor licences against your national or state licensing agency, searching by business name, licence number, or location.",
          "Confirm that each licence is valid and active, and repeat the check at least twice per year.",
          "Treat missing or suspicious supplier documentation, unusually low prices, and the sudden availability of a medicine that was short in supply as warning signs.",
        ],
      },
      {
        heading: "If you suspect a substandard or falsified medicine",
        paragraphs: [
          "Report it to the regulatory authorities in your country, to law enforcement, and to the pharmaceutical company that supplied the medicine. Keep the suspected product secure in case it is sent for laboratory testing.",
        ],
      },
      {
        heading: "Continuing education",
        paragraphs: [
          "BESAFE has developed a course for healthcare professionals covering the practical tools to recognize, report, and mitigate risks associated with substandard and falsified oncology medications, accredited for up to 2.5 AMA PRA Category 1 Credits™ by the Johns Hopkins University School of Medicine.",
        ],
      },
    ],
  },

  [PAGES.patients]: {
    eyebrow: "FOR PATIENTS",
    heading: "Information for Patients",
    intro:
      "Learning about fake cancer medicines might bring about feelings of fear, powerlessness, and distrust in medical systems. As a patient, your actions and vigilance can make a difference. Your healthcare providers are here to support you and ensure you access treatment that is effective and safe.",
    sourceHref: campaignUrl(CAMPAIGN_PATHS.patients),
    sections: [
      {
        heading: "Key takeaway messages for patients",
        points: [
          {
            term: "Some patients are more at risk than others, but everyone should practice vigilance",
            text: "Residing in a low- or middle-income country, being low-income, or using a medicine that is low in supply increases your risk of encountering a fake cancer medicine. These patients should practice extra vigilance when purchasing or consuming medicines.",
          },
          {
            term: "Be alert to the warning signs",
            text: "Familiarize yourself with the visual signs of falsification in packaging or medicine appearance and be observant of unexpected side effects or clinical response.",
          },
          {
            term: "Use trustworthy sources to purchase medicines",
            text: "Most online pharmacies are not safe. If an online pharmacy must be used, talk to your healthcare provider and verify the authenticity of the website.",
          },
          {
            term: "Communicate openly with your healthcare provider",
            text: "Make sure you understand your treatment plan well, so that you can detect any irregularities with your medicine. Be open about any financial barriers preventing you from accessing it. Your healthcare provider is responsible for answering all your questions and concerns — don't be afraid to ask for clarification.",
          },
          {
            term: "Any suspicion is worth talking to a health professional about",
            text: "If anything feels wrong about your medicine, talk to a health professional immediately. Stop use until you determine next steps with your provider.",
          },
          {
            term: "Document and report suspected cases immediately",
            text: "Keep the suspected medicine in a secure place so that your healthcare provider can determine whether it is safe to use.",
          },
        ],
      },
      {
        heading: "If you think your medicine may be fake",
        bullets: [
          "Stop using it immediately and keep the suspected product in a secure location.",
          "Speak to your healthcare provider, and report your concerns to your regulatory authority and to the pharmaceutical company.",
          "Write down where and when you obtained the medicine, photograph the packaging, and record every symptom or side effect.",
        ],
      },
      {
        heading: "Using an online pharmacy safely",
        paragraphs: [
          "In the U.S., 95% of online pharmacies are estimated to be illegal, and 24% of Americans who have used an online pharmacy have been exposed to substandard and falsified medicines. A legitimate online pharmacy requires a doctor's prescription and publishes who it is and who stands behind it.",
        ],
        bullets: [
          "The name of the pharmacy providing the service.",
          "The geographic addresses at which the pharmacy is established, with its email address and telephone and fax numbers.",
          "The professional title of the pharmacist responsible, and where that title was granted.",
          "The professional body the responsible pharmacist is registered with, and the relevant supervisory authority.",
          "A reference to the applicable professional rules in the country of establishment, and how to access them.",
        ],
      },
    ],
  },
};
