import { useCallback, useEffect, useState } from "react";

/**
 * Loads data from a service call and tracks its loading and error state.
 * `load` and the options must be stable references, so memoise them in the caller.
 */
export default function useAsyncData(load, options = {}) {
  const { initialData = null, fallbackData, errorMessage, onError } = options;
  const [state, setState] = useState({ data: initialData, loading: true, error: "" });

  const run = useCallback(() => {
    let active = true;
    setState((current) => ({ ...current, loading: true }));
    load()
      .then((data) => {
        if (active) setState({ data, loading: false, error: "" });
      })
      .catch((requestError) => {
        if (!active) return;
        const message = errorMessage || requestError.message;
        setState((current) => ({
          data: fallbackData === undefined ? current.data : fallbackData,
          loading: false,
          error: message,
        }));
        onError?.(message, requestError);
      });
    return () => {
      active = false;
    };
  }, [load, fallbackData, errorMessage, onError]);

  useEffect(run, [run]);

  return state;
}
