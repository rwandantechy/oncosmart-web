import { useCallback, useEffect, useRef, useState } from "react";
import { PUBLIC_NOTICE_PAGE_SIZE, SEARCH_DEBOUNCE_MS, SEARCH_PHASES } from "../config/ui";
import { SEARCH } from "../content/search";
import { getAlertGeo, searchAlerts } from "../services/alertsService";

const EMPTY_RECENT = { items: [], total: 0 };

export default function useAlertSearch() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastTerm, setLastTerm] = useState("");
  const [phase, setPhase] = useState(SEARCH_PHASES.loading);
  const [refreshing, setRefreshing] = useState(false);
  const recentRef = useRef(EMPTY_RECENT);
  const hasItemsRef = useRef(false);
  const requestRef = useRef(0);
  const timerRef = useRef(null);
  const abortRef = useRef(null);
  const countryRef = useRef("");
  const resultsRef = useRef(null);

  useEffect(() => {
    countryRef.current = country;
  }, [country]);

  useEffect(() => {
    getAlertGeo()
      .then((data) => setCountries(data.countries || []))
      .catch(() => setCountries([]));
  }, []);

  const load = useCallback(async (term, countryFilter = countryRef.current) => {
    const searchTerm = term.trim();
    const looking = Boolean(searchTerm) || Boolean(countryFilter);
    if (!looking && recentRef.current.items.length) {
      abortRef.current?.abort();
      setAlerts(recentRef.current.items);
      setTotal(recentRef.current.total);
      setLastTerm("");
      setRefreshing(false);
      setPhase(SEARCH_PHASES.recent);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestRef.current;
    setRefreshing(true);
    if (!hasItemsRef.current) setPhase(SEARCH_PHASES.loading);
    try {
      const filters = {};
      if (searchTerm) filters.q = searchTerm;
      if (countryFilter) filters.country = countryFilter;
      const data = await searchAlerts(
        {
          filters,
          pageSize: PUBLIC_NOTICE_PAGE_SIZE,
        },
        { signal: controller.signal },
      );
      if (requestId !== requestRef.current) return;
      hasItemsRef.current = data.items.length > 0;
      setAlerts(data.items);
      setTotal(data.total);
      if (!looking) {
        recentRef.current = { items: data.items, total: data.total };
        setLastTerm("");
        setPhase(data.total ? SEARCH_PHASES.recent : SEARCH_PHASES.empty);
      } else {
        setLastTerm(searchTerm || countryFilter);
        setPhase(data.total ? SEARCH_PHASES.results : SEARCH_PHASES.empty);
      }
    } catch (error) {
      if (error.name === "AbortError" || requestId !== requestRef.current) return;
      if (!looking && !recentRef.current.items.length) {
        hasItemsRef.current = false;
        setAlerts([]);
        setTotal(0);
        setPhase(SEARCH_PHASES.unavailable);
      } else {
        setPhase(SEARCH_PHASES.error);
      }
    } finally {
      if (requestId === requestRef.current) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load("");
    return () => {
      abortRef.current?.abort();
      clearTimeout(timerRef.current);
    };
  }, [load]);

  const updateQuery = useCallback(
    (value) => {
      setQuery(value);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => load(value, countryRef.current), SEARCH_DEBOUNCE_MS);
    },
    [load],
  );

  const search = useCallback(
    (term) => {
      clearTimeout(timerRef.current);
      setQuery(term);
      load(term, countryRef.current);
    },
    [load],
  );

  const selectCountry = useCallback(
    (nextCountry) => {
      clearTimeout(timerRef.current);
      setCountry(nextCountry || "");
      countryRef.current = nextCountry || "";
      load(query, nextCountry || "");
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [load, query],
  );

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    setQuery("");
    setCountry("");
    countryRef.current = "";
    load("");
  }, [load]);

  const looking = Boolean(lastTerm) || Boolean(country);
  const statusText =
    refreshing || phase === SEARCH_PHASES.loading
      ? SEARCH.status.loading
      : phase === SEARCH_PHASES.recent
        ? SEARCH.status.recent
        : phase === SEARCH_PHASES.results
          ? SEARCH.status.found(total)
          : "";

  return {
    query,
    updateQuery,
    country,
    countries,
    selectCountry,
    alerts,
    total,
    lastTerm,
    phase,
    looking,
    isBusy: refreshing || phase === SEARCH_PHASES.loading,
    statusText,
    search,
    reset,
    resultsRef,
  };
}
