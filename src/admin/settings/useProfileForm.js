import { useState } from "react";
import { useReplaceUser, useSessionUser } from "../../auth/SessionContext";
import { NAME_MIN_LENGTH } from "../../config/auth";
import { SETTINGS } from "../../content/settings";
import { updateProfile } from "../../services/authService";

export default function useProfileForm() {
  const user = useSessionUser();
  const replaceUser = useReplaceUser();
  const [name, setName] = useState(user?.name || "");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const trimmed = name.trim();
  const dirty = trimmed !== (user?.name || "").trim();
  const ready = dirty && trimmed.length >= NAME_MIN_LENGTH;

  function updateName(event) {
    setName(event.target.value);
    setError("");
    setStatus("");
  }

  async function submit(event) {
    event.preventDefault();
    if (!ready || loading) return;
    setError("");
    setStatus("");
    setLoading(true);
    try {
      const data = await updateProfile(trimmed, { defaultError: SETTINGS.profile.error });
      if (data?.user) replaceUser(data.user);
      setStatus(SETTINGS.profile.success);
    } catch (requestError) {
      setError(requestError.message || SETTINGS.profile.error);
    } finally {
      setLoading(false);
    }
  }

  return { user, name, status, error, loading, ready, updateName, submit };
}
