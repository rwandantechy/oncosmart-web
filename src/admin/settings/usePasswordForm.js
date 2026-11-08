import { useState } from "react";
import { PASSWORD_MIN_LENGTH } from "../../config/auth";
import { SETTINGS } from "../../content/settings";
import { changePassword } from "../../services/authService";

const EMPTY = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function usePasswordForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ready =
    form.currentPassword.length > 0 &&
    form.newPassword.length >= PASSWORD_MIN_LENGTH &&
    form.confirmPassword.length >= PASSWORD_MIN_LENGTH;

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setStatus("");
  }

  async function submit(event) {
    event.preventDefault();
    if (!ready || loading) return;
    setError("");
    setStatus("");
    if (form.newPassword !== form.confirmPassword) {
      setError(SETTINGS.password.mismatchError);
      return;
    }
    setLoading(true);
    try {
      await changePassword(
        { currentPassword: form.currentPassword, newPassword: form.newPassword },
        { defaultError: SETTINGS.password.error },
      );
      setForm(EMPTY);
      setStatus(SETTINGS.password.success);
    } catch (requestError) {
      setError(requestError.message || SETTINGS.password.error);
    } finally {
      setLoading(false);
    }
  }

  return { form, status, error, loading, ready, updateField, submit };
}
