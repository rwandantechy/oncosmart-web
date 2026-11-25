import { useCallback, useEffect, useMemo, useState } from "react";
import { SETTINGS } from "../../content/settings";
import { fetchAdminAi, saveAdminAi } from "../../services/adminAiService";

const FORBIDDEN = 403;

export default function useAiProviders() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [payload, setPayload] = useState(null);
  const [primary, setPrimary] = useState("");
  const [fallback, setFallback] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setForbidden(false);
    try {
      const data = await fetchAdminAi({ defaultError: SETTINGS.ai.loadError });
      setPayload(data);
      setPrimary(data.primary || "");
      setFallback(data.fallback || "");
    } catch (err) {
      setPayload(null);
      if (err.status === FORBIDDEN) {
        setForbidden(true);
        setError("");
      } else {
        setError(err.message || SETTINGS.ai.loadError);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const configuredOptions = useMemo(
    () => (payload?.options || []).filter((option) => option.configured),
    [payload],
  );

  const choosePrimary = useCallback(
    (next) => {
      setPrimary(next);
      setStatus("");
      setFallback((current) => (current === next ? "" : current));
    },
    [],
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
      if (err.status === FORBIDDEN) setForbidden(true);
      setError(err.message || SETTINGS.ai.saveError);
    } finally {
      setSaving(false);
    }
  }, [primary, fallback]);

  return {
    loading,
    saving,
    forbidden,
    error,
    status,
    payload,
    primary,
    fallback,
    configuredOptions,
    choosePrimary,
    setFallback,
    save,
  };
}
