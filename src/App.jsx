import DashboardPage from "./admin/DashboardPage";
import ResearchAssistantPage from "./admin/ResearchAssistantPage";
import SettingsPage from "./admin/SettingsPage";
import AuthPage from "./auth/AuthPage";
import RequireSession from "./auth/RequireSession";
import SkipLink from "./components/layout/SkipLink";
import { AUTH_MODES, SIGNUP_OPEN } from "./config/auth";
import {
  PAGES,
  PAGES_REQUIRING_SESSION,
  ROUTES,
  pageForPath,
} from "./config/routes";
import ContentPage from "./pages/ContentPage";
import SearchPage from "./search/SearchPage";

function LoginPage() {
  return <AuthPage mode={AUTH_MODES.login} />;
}

function SignupPage() {
  if (!SIGNUP_OPEN) {
    window.location.replace(ROUTES.home);
    return null;
  }
  return <AuthPage mode={AUTH_MODES.signup} />;
}

const PAGE_VIEWS = {
  [PAGES.login]: () => <LoginPage />,
  [PAGES.signup]: () => <SignupPage />,
  [PAGES.about]: () => <ContentPage page={PAGES.about} />,
  [PAGES.learn]: () => <ContentPage page={PAGES.learn} />,
  [PAGES.healthProfessionals]: () => <ContentPage page={PAGES.healthProfessionals} />,
  [PAGES.patients]: () => <ContentPage page={PAGES.patients} />,
  [PAGES.adminAssistant]: () => <ResearchAssistantPage />,
  [PAGES.adminSettings]: () => <SettingsPage />,
  [PAGES.adminOverview]: () => <DashboardPage />,
  [PAGES.home]: () => <SearchPage />,
};

export default function App() {
  const page = pageForPath(window.location.pathname);
  const view = PAGE_VIEWS[page]();

  const gated = PAGES_REQUIRING_SESSION.includes(page) ? (
    <RequireSession>{view}</RequireSession>
  ) : (
    view
  );

  return (
    <>
      <SkipLink />
      {gated}
    </>
  );
}
