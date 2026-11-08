import { useState } from "react";
import {
  AUTH_MODES,
  AUTH_REDIRECT_DELAY_MS,
  NAME_MIN_LENGTH,
  NEXT_PARAM,
  PASSWORD_MIN_LENGTH,
} from "../config/auth";
import { safeRedirectPath } from "../config/routes";
import { AUTH_COPY, AUTH_SHARED } from "../content/auth";
import { authenticate } from "../services/authService";

const EMPTY_FORM = { name: "", email: "", password: "", confirmPassword: "" };

/** The page the visitor was trying to open, or the workspace overview. */
function destination() {
  const requested = new URLSearchParams(window.location.search).get(NEXT_PARAM);
  return safeRedirectPath(requested);
}

function isReady(mode, form) {
  const email = form.email.trim();
  const password = form.password;
  if (!email.includes("@") || password.length < PASSWORD_MIN_LENGTH) return false;
  if (mode !== AUTH_MODES.signup) return true;
  return (
    form.name.trim().length >= NAME_MIN_LENGTH &&
    form.confirmPassword.length >= PASSWORD_MIN_LENGTH &&
    form.confirmPassword === password
  );
}

export default function useAuthForm(mode) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    if (!isReady(mode, form) || loading) return;
    setError("");
    setStatus("");
    if (mode === AUTH_MODES.signup && form.password !== form.confirmPassword) {
      setError(AUTH_SHARED.mismatchError);
      return;
    }
    setLoading(true);
    try {
      await authenticate({
        mode,
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setStatus(AUTH_COPY[mode].successStatus);
      const next = destination();
      window.setTimeout(() => {
        window.location.href = next;
      }, AUTH_REDIRECT_DELAY_MS);
    } catch (requestError) {
      setError(requestError.message || AUTH_SHARED.retryError);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    status,
    error,
    loading,
    ready: isReady(mode, form),
    updateField,
    submit,
  };
}
