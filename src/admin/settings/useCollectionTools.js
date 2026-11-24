import { useCallback, useEffect, useState } from "react";
import { SETTINGS } from "../../content/settings";
import { fetchAdminTools, runAdminTool } from "../../services/adminToolsService";

const ACTIVE = new Set(["queued", "waiting", "requested", "pending", "in_progress"]);
const POLL_MS = 8000;

function hasActiveRun(tools) {
  return (tools || []).some((tool) => ACTIVE.has(tool.latest_run?.status));
}

export default function useCollectionTools({ enabled }) {
  const [tools, setTools] = useState([]);
  const [configured, setConfigured] = useState(false);
  const [actionsUrl, setActionsUrl] = useState("");
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [runningId, setRunningId] = useState("");

  const load = useCallback(
    async ({ quiet } = {}) => {
      if (!enabled) return;
      if (!quiet) setLoading(true);
      setError("");
      try {
        const payload = await fetchAdminTools({
          defaultError: SETTINGS.tools.loadError,
        });
        setTools(payload.tools || []);
        setConfigured(Boolean(payload.configured));
        setActionsUrl(payload.actions_url || "");
      } catch (err) {
        if (!quiet) {
          setTools([]);
          setConfigured(false);
          setActionsUrl("");
          setError(err.message || SETTINGS.tools.loadError);
        }
      } finally {
        if (!quiet) setLoading(false);
      }
    },
    [enabled],
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!enabled || !hasActiveRun(tools)) return undefined;
    const id = window.setInterval(() => {
      load({ quiet: true });
    }, POLL_MS);
    return () => window.clearInterval(id);
  }, [enabled, tools, load]);

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
        if (result.latest_run) {
          setTools((current) =>
            current.map((tool) =>
              tool.id === toolId ? { ...tool, latest_run: result.latest_run, busy: true } : tool,
            ),
          );
        }
        await load({ quiet: true });
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
