import Panel from "../../components/ui/Panel";
import { SETTINGS } from "../../content/settings";
import useCollectionTools from "./useCollectionTools";

export default function CollectionTools({ enabled }) {
  const { tools, configured, actionsUrl, loading, error, status, runningId, run } =
    useCollectionTools({ enabled });
  const copy = SETTINGS.tools;

  return (
    <Panel id={copy.id} eyebrow={copy.eyebrow} title={copy.title} note={copy.note}>
      {!enabled ? (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{copy.adminRequired}</p>
      ) : null}

      {enabled && loading ? (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">Loading…</p>
      ) : null}

      {enabled && !loading && !configured ? (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{copy.notConfigured}</p>
      ) : null}

      {enabled && !loading && configured ? (
        <ul className="collection-tools-list">
          {tools.map((tool) => (
            <li key={tool.id}>
              <div>
                <strong>{tool.label}</strong>
                <p>{tool.description}</p>
              </div>
              <button
                type="button"
                className="settings-submit"
                disabled={Boolean(runningId) || tool.busy}
                aria-busy={runningId === tool.id}
                onClick={() => run(tool.id)}
              >
                {runningId === tool.id ? copy.runningLabel : copy.runLabel}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {actionsUrl ? (
        <p className="collection-tools-link">
          <a href={actionsUrl} target="_blank" rel="noopener noreferrer">
            {copy.viewRunsLabel}
          </a>
        </p>
      ) : null}

      {error ? (
        <p className="auth-feedback error" role="alert">
          {error}
        </p>
      ) : null}
      {status ? (
        <p className="auth-feedback success" role="status">
          {status}
        </p>
      ) : null}
    </Panel>
  );
}
