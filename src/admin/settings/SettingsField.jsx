export default function SettingsField({ label, help, children }) {
  return (
    <label>
      {label}
      {children}
      {help ? <small>{help}</small> : null}
    </label>
  );
}
