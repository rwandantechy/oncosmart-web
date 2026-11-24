import { ASSETS } from "../../config/assets";
import { ACCOUNT, BRAND } from "../../content/site";
import { MAIN_CONTENT_ID } from "../../content/states";
import Icon from "../Icon";
import AccountMenu from "./AccountMenu";
import AdminWarning from "./AdminWarning";
import HeaderActions from "./HeaderActions";
import WorkspaceNav from "./WorkspaceNav";

export default function AdminLayout({ active, icon, title, warning, children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" aria-label="Workspace">
        <div className="sidebar-brand">
          <img src={ASSETS.logoOnDark} alt={BRAND.productName} />
          <p className="sidebar-brand-tagline">{BRAND.workspaceTagline}</p>
        </div>

        <div className="sidebar-body">
          <WorkspaceNav active={active} />
        </div>

        <div className="sidebar-account" aria-label={ACCOUNT.statusTitle}>
          <AccountMenu />
        </div>
      </aside>

      <main id={MAIN_CONTENT_ID} className="admin-main">
        <div className="admin-topbar">
          <div className="admin-title">
            <Icon name={icon} variant="menu" />
            <h1>{title}</h1>
          </div>
          <HeaderActions />
        </div>
        {warning ? <AdminWarning {...warning} /> : null}
        {children}
      </main>
    </div>
  );
}
