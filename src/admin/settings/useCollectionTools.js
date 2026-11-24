import { useCallback, useEffect, useState } from "react";
import { SETTINGS } from "../../content/settings";
import { fetchAdminTools, runAdminTool } from "../../services/adminToolsService";

export default function useCollectionTools({ enabled }) {
  const [tools, setTools] = useState([]);
  const [configured, setConfigured] = useState(false);
  const [actionsUrl, setActionsUrl] = useState("");
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [runningId, setRunningId] = useState("");

  const load = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError("");
    try {
      const payload = await fetchAdminTools({
        defaultError: SETTINGS.tools.loadError,
      });
      setTools(payload.tools || []);
      setConfigured(Boolean(payload.configured));
      setActionsUrl(payload.actions_url || "");
    } catch (err) {
      setTools([]);
      setConfigured(false);
      setActionsUrl("");
      setError(err.message || SETTINGS.tools.loadError);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    load();
  }, [load]);

  const run = useCallback(
    async (toolId) => {
      setRunningId(toolId);
      setError("");
      setStatus("");
      try {
        const result = await runAdminTool(toolId, {
          defaultError: SETTINGS.tools.runError,
        });
        setStatus(result.message || "");
        if (result.actions_url) setActionsUrl(result.actions_url);
        await load();
      } catch (err) {
        setError(err.message || SETTINGS.tools.runError);
      } finally {
        setRunningId("");
      }
    },
    [load],
  );

  return {
    tools,
    configured,
    actionsUrl,
    loading,
    error,
    status,
    runningId,
    run,
  };
}
