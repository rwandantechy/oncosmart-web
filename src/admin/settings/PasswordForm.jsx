import Panel from "../../components/ui/Panel";
import PasswordField from "../../components/ui/PasswordField";
import { SETTINGS } from "../../content/settings";
import SettingsField from "./SettingsField";
import usePasswordForm from "./usePasswordForm";

export default function PasswordForm() {
  const { form, status, error, loading, ready, updateField, submit } = usePasswordForm();
  const copy = SETTINGS.password;

  return (
    <Panel eyebrow={copy.eyebrow} title={copy.title} note={copy.note}>
      <form className="settings-form" onSubmit={submit}>
        <SettingsField label={copy.current.label}>
          <PasswordField
            name={copy.current.name}
            value={form.currentPassword}
            onChange={updateField}
            autoComplete={copy.current.autoComplete}
            maxLength={copy.current.maxLength}
            required
          />
        </SettingsField>
        <SettingsField label={copy.next.label}>
          <PasswordField
            name={copy.next.name}
            value={form.newPassword}
            onChange={updateField}
            autoComplete={copy.next.autoComplete}
            minLength={copy.next.minLength}
            maxLength={copy.next.maxLength}
            placeholder={copy.next.placeholder}
            required
          />
        </SettingsField>
        <SettingsField label={copy.confirm.label}>
          <PasswordField
            name={copy.confirm.name}
            value={form.confirmPassword}
            onChange={updateField}
            autoComplete={copy.confirm.autoComplete}
            minLength={copy.confirm.minLength}
            maxLength={copy.confirm.maxLength}
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
