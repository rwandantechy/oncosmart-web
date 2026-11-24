import AdminLayout from "../components/layout/AdminLayout";
import { useSessionUser } from "../auth/SessionContext";
import { ADMIN_ROLE } from "../config/auth";
import { SETTINGS } from "../content/settings";
import { WORKSPACE_SECTIONS } from "../content/site";
import CollectionTools from "./settings/CollectionTools";

export default function CollectionToolsPage() {
  const user = useSessionUser();
  const isAdmin = user?.role === ADMIN_ROLE;
  const copy = SETTINGS.tools;

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.collection}
      icon={copy.pageIcon}
      title={copy.pageTitle}
      warning={copy.warning}
    >
      <section className="settings-grid settings-grid--tools">
        <CollectionTools enabled={isAdmin} />
      </section>
    </AdminLayout>
  );
}
