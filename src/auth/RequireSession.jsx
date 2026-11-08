import { useEffect } from "react";
import { ASSETS } from "../config/assets";
import { SESSION_STATES } from "../config/auth";
import { loginPathFor, ROUTES } from "../config/routes";
import { SESSION_GATE } from "../content/auth";
import { BRAND } from "../content/site";
import { MAIN_CONTENT_ID } from "../content/states";
import { SessionProvider } from "./SessionContext";
import useSession from "./useSession";

/**
 * Keeps the workspace closed until the API confirms a session. The page is not
 * rendered at all while that is unresolved, so no workspace request is sent on
 * behalf of a visitor who is not signed in.
 */
export default function RequireSession({ children }) {
  const { state, user, replaceUser } = useSession();

  useEffect(() => {
    if (state === SESSION_STATES.signedOut) {
      window.location.replace(loginPathFor(window.location.pathname));
    }
  }, [state]);

  if (state !== SESSION_STATES.signedIn) {
    return (
      <main id={MAIN_CONTENT_ID} className="session-gate">
        <a className="session-gate-brand" href={ROUTES.home} aria-label={BRAND.productHomeLabel}>
          <img src={ASSETS.logo} alt={BRAND.productName} />
        </a>
        <p role="status">
          {state === SESSION_STATES.checking ? SESSION_GATE.checking : SESSION_GATE.redirecting}
        </p>
      </main>
    );
  }

  return <SessionProvider value={{ user, replaceUser }}>{children}</SessionProvider>;
}
