import AdminLayout from "../components/layout/AdminLayout";
import { useSessionUser } from "../auth/SessionContext";
import { ADMIN_ROLE } from "../config/auth";
import { SETTINGS } from "../content/settings";
import { WORKSPACE_SECTIONS } from "../content/site";
import CollectionTools from "./settings/CollectionTools";
import PasswordForm from "./settings/PasswordForm";
import ProfileForm from "./settings/ProfileForm";

export default function SettingsPage() {
  const user = useSessionUser();
  const isAdmin = user?.role === ADMIN_ROLE;

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.settings}
      icon={SETTINGS.icon}
      title={SETTINGS.title}
      warning={SETTINGS.warning}
    >
      <section className="settings-grid">
        <ProfileForm />
        <PasswordForm />
      </section>
      {isAdmin ? (
        <section className="settings-grid settings-grid--tools">
          <CollectionTools enabled />
        </section>
      ) : null}
    </AdminLayout>
  );
}
