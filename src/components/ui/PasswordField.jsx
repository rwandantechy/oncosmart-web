import { useState } from "react";
import { AUTH_SHARED } from "../../content/auth";

export default function PasswordField({
  name,
  value,
  onChange,
  autoComplete,
  placeholder,
  minLength,
  maxLength,
  required,
  readOnly,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <input
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        readOnly={readOnly}
      />
      <button
        className="password-toggle"
        type="button"
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? AUTH_SHARED.hidePassword : AUTH_SHARED.showPassword}
      </button>
    </div>
  );
}
