import AdminLayout from "../components/layout/AdminLayout";
import { SETTINGS } from "../content/settings";
import { WORKSPACE_SECTIONS } from "../content/site";
import PasswordForm from "./settings/PasswordForm";
import ProfileForm from "./settings/ProfileForm";

export default function SettingsPage() {
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
    </AdminLayout>
  );
}
