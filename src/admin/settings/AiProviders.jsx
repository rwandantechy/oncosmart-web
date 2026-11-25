import Panel from "../../components/ui/Panel";
import { SETTINGS } from "../../content/settings";
import useAiProviders from "./useAiProviders";

function statusTone(option) {
  if (!option.configured) return "missing";
  if (option.available) return "ok";
  return "bad";
}

export default function AiProviders({ enabled }) {
  const ai = useAiProviders({ enabled });
  const copy = SETTINGS.ai;

  if (!enabled) {
    return (
      <Panel id={copy.id} eyebrow={copy.eyebrow} title={copy.title} note={copy.note}>
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{copy.adminRequired}</p>
      </Panel>
    );
  }

  return (
    <Panel id={copy.id} eyebrow={copy.eyebrow} title={copy.title} note={copy.note}>
      {ai.loading ? (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">Loading…</p>
      ) : null}

      {!ai.loading && ai.payload ? (
        <>
          <p className="ai-provider-source">
            {ai.payload.source === "admin" ? copy.sourceAdmin : copy.sourceEnv}
          </p>

          <ul className="ai-provider-options">
            {(ai.payload.options || []).map((option) => (
              <li key={option.name} className={`ai-provider-option ai-provider-option--${statusTone(option)}`}>
                <div>
                  <strong>{option.label}</strong>
                  <p>{option.model}</p>
                </div>
                <span>
                  {!option.configured
                    ? copy.missing
                    : option.available
                      ? copy.available
                      : copy.unavailable}
                </span>
              </li>
            ))}
          </ul>

          <div className="ai-provider-controls">
            <label>
              {copy.primaryLabel}
              <select
                value={ai.primary}
                onChange={(event) => {
                  const next = event.target.value;
                  ai.setPrimary(next);
                  if (ai.fallback === next) ai.setFallback("");
                }}
              >
                {ai.configuredOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {copy.fallbackLabel}
              <select value={ai.fallback || ""} onChange={(event) => ai.setFallback(event.target.value)}>
                <option value="">{copy.noneFallback}</option>
                {ai.configuredOptions
                  .filter((option) => option.name !== ai.primary)
                  .map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            className="settings-submit"
            disabled={ai.saving || !ai.primary}
            onClick={ai.save}
          >
            {ai.saving ? copy.savingLabel : copy.saveLabel}
          </button>
        </>
      ) : null}

      {ai.error ? (
        <p className="auth-feedback error" role="alert">
          {ai.error}
        </p>
      ) : null}
      {ai.status ? (
        <p className="auth-feedback success" role="status">
          {ai.status}
        </p>
      ) : null}
    </Panel>
  );
}
