import {
  AUTH_MODES,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../config/auth";
import { ROUTES } from "../config/routes";

export const AUTH_SHARED = {
  eyebrow: "BESAFE RESEARCH WORKSPACE",
  panelHeading: "Evidence you can trust, work you can share.",
  panelFooter: "BESAFE research initiative",
  backLabel: "Back to public search",
  headingId: "auth-heading",
  submitLoadingLabel: "Working…",
  showPassword: "Show",
  hidePassword: "Hide",
  mismatchError: "Passwords do not match.",
  genericError: "Authentication could not be completed.",
  retryError: "Authentication could not be completed. Please try again.",
  signedOutError: "No one is signed in.",
};

export const SESSION_GATE = {
  checking: "Checking your session…",
  redirecting: "Sign in to open the research workspace.",
};

export const AUTH_COPY = {
  [AUTH_MODES.login]: {
    panelIntro:
      "Sign in to continue to the EveryDoseMatters research workspace for medicine-safety records and analysis.",
    eyebrow: "WELCOME BACK",
    heading: "Sign in to EveryDoseMatters",
    intro: "Use your workspace credentials to continue.",
    submitLabel: "Sign in",
    successStatus: "Welcome back. Opening the workspace…",
    switchPrompt: "Need an account?",
    switchLabel: "Create one",
    switchHref: ROUTES.signup,
  },
  [AUTH_MODES.signup]: {
    panelIntro:
      "Create an account to join the EveryDoseMatters research workspace for medicine-safety records and analysis.",
    eyebrow: "CREATE YOUR ACCOUNT",
    heading: "Join the research workspace",
    intro: "Create an account to access the BESAFE research workspace.",
    submitLabel: "Create account",
    successStatus: "Your account is ready. Taking you to the workspace…",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: ROUTES.login,
  },
};

export const AUTH_FIELDS = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your full name",
    minLength: NAME_MIN_LENGTH,
    maxLength: NAME_MAX_LENGTH,
    signupOnly: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    placeholder: "",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: { [AUTH_MODES.login]: "current-password", [AUTH_MODES.signup]: "new-password" },
    placeholder: `At least ${PASSWORD_MIN_LENGTH} characters`,
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "Enter your password again",
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH,
    signupOnly: true,
  },
];
