import Panel from "../../components/ui/Panel";
import { SETTINGS } from "../../content/settings";
import SettingsField from "./SettingsField";
import useProfileForm from "./useProfileForm";

export default function ProfileForm() {
  const { user, name, status, error, loading, ready, updateName, submit } = useProfileForm();
  const copy = SETTINGS.profile;

  return (
    <Panel id={copy.id} eyebrow={copy.eyebrow} title={copy.title} note={copy.note}>
      <form className="settings-form" onSubmit={submit}>
        <SettingsField label={copy.email.label} help={copy.email.help}>
          <input name={copy.email.name} type="email" value={user?.email || ""} readOnly />
        </SettingsField>
        <SettingsField label={copy.name.label}>
          <input
            name={copy.name.name}
            type="text"
            value={name}
            onChange={updateName}
            autoComplete={copy.name.autoComplete}
            minLength={copy.name.minLength}
            maxLength={copy.name.maxLength}
            required
          />
        </SettingsField>
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
        <button
          className="settings-submit"
          type="submit"
          disabled={loading || !ready}
          aria-busy={loading}
        >
          {loading ? copy.savingLabel : copy.submitLabel}
        </button>
      </form>
    </Panel>
  );
}
