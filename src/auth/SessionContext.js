import { createContext, useContext } from "react";

const SessionContext = createContext(null);

export const SessionProvider = SessionContext.Provider;

function session() {
  return useContext(SessionContext);
}

/** The signed-in researcher. Only available inside a guarded page. */
export function useSessionUser() {
  return session()?.user ?? null;
}

/** Replace the signed-in researcher after a profile or password change. */
export function useReplaceUser() {
  return session()?.replaceUser;
}
