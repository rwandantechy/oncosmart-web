import { useEffect, useState } from "react";
import { SESSION_EXPIRED_EVENT, SESSION_STATES } from "../config/auth";
import { getSession } from "../services/authService";

const SIGNED_OUT = { state: SESSION_STATES.signedOut, user: null };

/**
 * Who the API says is signed in. A stored token is never trusted on its own:
 * it is confirmed once on mount, and the session drops back to signed out as
 * soon as any request is refused.
 */
export default function useSession() {
  const [session, setSession] = useState({ state: SESSION_STATES.checking, user: null });

  useEffect(() => {
    let active = true;
    getSession()
      .then((user) => {
        if (active) setSession({ state: SESSION_STATES.signedIn, user });
      })
      .catch(() => {
        if (active) setSession(SIGNED_OUT);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const drop = () => setSession(SIGNED_OUT);
    window.addEventListener(SESSION_EXPIRED_EVENT, drop);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, drop);
  }, []);

  function replaceUser(user) {
    setSession({ state: SESSION_STATES.signedIn, user });
  }

  return { ...session, replaceUser };
}
