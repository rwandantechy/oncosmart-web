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
      <aside className="admin-sidebar">
        <div className="brand-mark">
          <img src={ASSETS.logoOnDark} alt={BRAND.productName} />
          <small>{BRAND.workspaceTagline}</small>
        </div>
        <WorkspaceNav active={active} />
        <div className="sidebar-footer">
          <AccountMenu />
          <span className="status-dot" title={ACCOUNT.statusTitle} />
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
        <AdminWarning {...warning} />
        {children}
      </main>
    </div>
  );
}
