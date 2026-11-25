import { useCallback, useEffect, useMemo, useState } from "react";
import { SETTINGS } from "../../content/settings";
import { fetchAdminAi, saveAdminAi } from "../../services/adminAiService";

export default function useAiProviders({ enabled }) {
  const [loading, setLoading] = useState(Boolean(enabled));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [payload, setPayload] = useState(null);
  const [primary, setPrimary] = useState("");
  const [fallback, setFallback] = useState("");

  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminAi({ defaultError: SETTINGS.ai.loadError });
      setPayload(data);
      setPrimary(data.primary || "");
      setFallback(data.fallback || "");
    } catch (err) {
      setPayload(null);
      setError(err.message || SETTINGS.ai.loadError);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    load();
  }, [load]);

  const configuredOptions = useMemo(
    () => (payload?.options || []).filter((option) => option.configured),
    [payload],
  );

  const save = useCallback(async () => {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const data = await saveAdminAi(
        {
          primary,
          fallback: fallback || null,
        },
        { defaultError: SETTINGS.ai.saveError },
      );
      setPayload(data);
      setPrimary(data.primary || "");
      setFallback(data.fallback || "");
      setStatus(SETTINGS.ai.saveSuccess);
    } catch (err) {
      setError(err.message || SETTINGS.ai.saveError);
    } finally {
      setSaving(false);
    }
  }, [primary, fallback]);

  return {
    loading,
    saving,
    error,
    status,
    payload,
    primary,
    fallback,
    configuredOptions,
    setPrimary,
    setFallback,
    save,
  };
}
