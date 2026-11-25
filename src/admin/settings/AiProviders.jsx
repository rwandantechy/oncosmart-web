import Panel from "../../components/ui/Panel";
import { SETTINGS } from "../../content/settings";
import useAiProviders from "./useAiProviders";

function statusTone(option) {
  if (!option.configured) return "missing";
  if (option.available) return "ok";
  return "bad";
}

export default function AiProviders() {
  const ai = useAiProviders();
  const copy = SETTINGS.ai;
  const dirty =
    ai.payload &&
    (ai.primary !== ai.payload.primary || (ai.fallback || "") !== (ai.payload.fallback || ""));

  return (
    <Panel id={copy.id} eyebrow={copy.eyebrow} title={copy.title} note={copy.note}>
      {ai.loading ? (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">Loading…</p>
      ) : null}

      {ai.forbidden ? (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{copy.adminRequired}</p>
      ) : null}

      {!ai.loading && !ai.forbidden && ai.payload ? (
        <>
          <p className="ai-provider-source">
            {ai.payload.source === "admin" ? copy.sourceAdmin : copy.sourceEnv}
          </p>

          <p className="ai-provider-choose-label">{copy.primaryLabel}</p>
          <div className="ai-provider-toggle" role="radiogroup" aria-label={copy.primaryLabel}>
            {ai.configuredOptions.map((option) => {
              const selected = ai.primary === option.name;
              return (
                <button
                  key={option.name}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={["ai-provider-toggle-btn", selected ? "is-selected" : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => ai.choosePrimary(option.name)}
                >
                  <strong>{option.label}</strong>
                  <span>{option.model}</span>
                </button>
              );
            })}
          </div>

          <div className="ai-provider-controls">
            <label>
              {copy.fallbackLabel}
              <select
                value={ai.fallback || ""}
                onChange={(event) => ai.setFallback(event.target.value)}
              >
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

          <ul className="ai-provider-options">
            {(ai.payload.options || []).map((option) => (
              <li
                key={option.name}
                className={`ai-provider-option ai-provider-option--${statusTone(option)}`}
              >
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

          <button
            type="button"
            className="settings-submit"
            disabled={ai.saving || !ai.primary || !dirty}
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
