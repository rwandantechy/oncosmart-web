import { ASSETS } from "../config/assets";
import { AUTH_MODES, SIGNUP_OPEN } from "../config/auth";
import { ROUTES } from "../config/routes";
import { AUTH_COPY, AUTH_FIELDS, AUTH_SHARED } from "../content/auth";
import { BRAND } from "../content/site";
import { MAIN_CONTENT_ID } from "../content/states";
import PasswordField from "../components/ui/PasswordField";
import useAuthForm from "./useAuthForm";

function autoCompleteFor(field, mode) {
  return typeof field.autoComplete === "string" ? field.autoComplete : field.autoComplete[mode];
}

export default function AuthPage({ mode }) {
  const copy = AUTH_COPY[mode];
  const { form, status, error, loading, ready, updateField, submit } = useAuthForm(mode);
  const fields = AUTH_FIELDS.filter(
    (field) => !field.signupOnly || mode === AUTH_MODES.signup,
  );

  return (
    <main id={MAIN_CONTENT_ID} className="auth-page">
      <div className="auth-brand-panel">
        <a className="auth-brand" href={ROUTES.home} aria-label={BRAND.productHomeLabel}>
          <img src={ASSETS.logoOnDark} alt={BRAND.productName} />
        </a>
        <div className="auth-message">
          <p className="eyebrow">{AUTH_SHARED.eyebrow}</p>
          <h1>{AUTH_SHARED.panelHeading}</h1>
          <p>{copy.panelIntro}</p>
        </div>
        <div className="auth-panel-footer">
          <span className="trust-dot" /> {AUTH_SHARED.panelFooter}
        </div>
      </div>
      <section className="auth-form-panel" aria-labelledby={AUTH_SHARED.headingId}>
        <div className="auth-form-wrap">
          <a className="auth-back-link" href={ROUTES.home}>
            {AUTH_SHARED.backLabel}
          </a>
          <div className="auth-heading">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id={AUTH_SHARED.headingId}>{copy.heading}</h2>
            <p>{copy.intro}</p>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {fields.map((field) => (
              <label key={field.name}>
                {field.label}
                {field.type === "password" ? (
                  <PasswordField
                    name={field.name}
                    value={form[field.name]}
                    onChange={updateField}
                    autoComplete={autoCompleteFor(field, mode)}
                    placeholder={field.placeholder}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    required
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={updateField}
                    autoComplete={autoCompleteFor(field, mode)}
                    placeholder={field.placeholder}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    required
                  />
                )}
              </label>
            ))}
            {error && (
              <p className="auth-feedback error" role="alert">
                {error}
              </p>
            )}
            {status && (
              <p className="auth-feedback success" role="status">
                {status}
              </p>
            )}
            <button
              className="auth-submit"
              type="submit"
              disabled={loading || !ready}
              aria-busy={loading}
            >
              {loading ? AUTH_SHARED.submitLoadingLabel : copy.submitLabel}
            </button>
          </form>
          {SIGNUP_OPEN && copy.switchPrompt ? (
            <p className="auth-switch">
              {copy.switchPrompt}{" "}
              <a href={`${copy.switchHref}${window.location.search}`}>{copy.switchLabel}</a>
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
