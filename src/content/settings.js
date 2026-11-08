import { ANCHOR_IDS } from "../config/routes";
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../config/auth";
import { AUTH_SHARED } from "./auth";

export const SETTINGS = {
  title: "Settings",
  icon: "settings",
  warning: {
    strong: "Your workspace account",
    text: "These settings apply to this research workspace only.",
    linkLabel: "Account",
    href: `#${ANCHOR_IDS.accountSettings}`,
  },
  profile: {
    id: ANCHOR_IDS.accountSettings,
    eyebrow: "ACCOUNT",
    title: "Profile",
    note: "This is how you appear in the workspace.",
    email: {
      name: "email",
      label: "Email",
      help: "Email is your sign-in identity and cannot be changed here.",
    },
    name: {
      name: "name",
      label: "Display name",
      minLength: NAME_MIN_LENGTH,
      maxLength: NAME_MAX_LENGTH,
      autoComplete: "name",
    },
    submitLabel: "Save name",
    savingLabel: AUTH_SHARED.submitLoadingLabel,
    success: "Your display name has been updated.",
    error: "Your profile could not be updated.",
  },
  password: {
    eyebrow: "SECURITY",
    title: "Password",
    note: "Choose a password only you know.",
    current: {
      name: "currentPassword",
      label: "Current password",
      autoComplete: "current-password",
      maxLength: PASSWORD_MAX_LENGTH,
    },
    next: {
      name: "newPassword",
      label: "New password",
      autoComplete: "new-password",
      minLength: PASSWORD_MIN_LENGTH,
      maxLength: PASSWORD_MAX_LENGTH,
      placeholder: `At least ${PASSWORD_MIN_LENGTH} characters`,
    },
    confirm: {
      name: "confirmPassword",
      label: "Confirm new password",
      autoComplete: "new-password",
      minLength: PASSWORD_MIN_LENGTH,
      maxLength: PASSWORD_MAX_LENGTH,
    },
    submitLabel: "Update password",
    savingLabel: AUTH_SHARED.submitLoadingLabel,
    success: "Your password has been updated.",
    error: "Your password could not be updated.",
    mismatchError: AUTH_SHARED.mismatchError,
  },
};
