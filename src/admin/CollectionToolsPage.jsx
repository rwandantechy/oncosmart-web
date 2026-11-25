import AdminLayout from "../components/layout/AdminLayout";
import { useSessionUser } from "../auth/SessionContext";
import { ADMIN_ROLE } from "../config/auth";
import { SETTINGS } from "../content/settings";
import { WORKSPACE_SECTIONS } from "../content/site";
import AiProviders from "./settings/AiProviders";
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
      warning={{
        strong: "Admin controls",
        text: "Switch AI providers and start collection workflows from this page.",
        linkLabel: "AI",
        href: `#${SETTINGS.ai.id}`,
      }}
    >
      <section className="settings-grid settings-grid--tools">
        <AiProviders />
        <CollectionTools enabled={isAdmin} />
      </section>
    </AdminLayout>
  );
}
