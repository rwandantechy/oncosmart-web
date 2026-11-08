import { useState } from "react";
import { useSessionUser } from "../../auth/SessionContext";
import { ROUTES } from "../../config/routes";
import { ACCOUNT, ACCOUNT_ACTIONS } from "../../content/site";
import { signOut } from "../../services/authService";
import Icon from "../Icon";
import Avatar from "./Avatar";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const user = useSessionUser();

  const endSession = () => {
    signOut();
    window.location.assign(ROUTES.home);
  };

  return (
    <div className="account-menu">
      <button
        className="account-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Avatar />
        <span className="account-copy">
          <strong>{user?.name}</strong>
          <small>{ACCOUNT.context}</small>
        </span>
        <Icon name="chevronDown" variant="chevron" />
      </button>
      {open && (
        <div className="account-popover" role="menu">
          <div className="account-popover-heading">
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>
          {ACCOUNT.menuItems.map((item) =>
            item.type === "link" ? (
              <a key={item.label} href={item.href} role="menuitem">
                <Icon name={item.icon} variant="menu" />
                {item.label}
              </a>
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={item.action === ACCOUNT_ACTIONS.signOut ? endSession : undefined}
              >
                <Icon name={item.icon} variant="menu" />
                {item.label}
                {item.note && <small>{item.note}</small>}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
