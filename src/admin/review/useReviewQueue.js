import { useCallback, useEffect, useMemo, useState } from "react";
import { REVIEW } from "../../content/review";
import {
  approveReview,
  deleteReview,
  listPending,
  rejectReview,
  updateReview,
} from "../../services/reviewService";

const EMPTY_FILTERS = {
  q: "",
  country: "",
  regulator: "",
  from: "",
  to: "",
  issue: "",
};

function matchesFilters(item, filters) {
  const query = filters.q.trim().toLowerCase();
  if (query) {
    const haystack = [item.product_name, item.reason, item.more_info, item.manufacturer]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  if (filters.country && item.source_country !== filters.country) return false;
  if (filters.regulator && item.source_org !== filters.regulator) return false;
  if (filters.issue) {
    const issues = item.validation_errors || [];
    if (!issues.includes(filters.issue)) return false;
  }
  const published = (item.publish_date || "").slice(0, 10);
  if (filters.from && published && published < filters.from) return false;
  if (filters.to && published && published > filters.to) return false;
  if ((filters.from || filters.to) && !published) return false;
  return true;
}

export default function useReviewQueue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const reload = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      const page = await listPending({ signal });
      setItems(page.items || []);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || REVIEW.loadError);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    reload(controller.signal);
    return () => controller.abort();
  }, [reload]);

  const filteredItems = useMemo(
    () => items.filter((item) => matchesFilters(item, filters)),
    [items, filters],
  );

  const countries = useMemo(
    () =>
      [...new Set(items.map((item) => item.source_country).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [items],
  );

  const regulators = useMemo(
    () =>
      [...new Set(items.map((item) => item.source_org).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [items],
  );

  const issues = useMemo(() => {
    const values = new Set();
    items.forEach((item) => (item.validation_errors || []).forEach((issue) => values.add(issue)));
    return [...values].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const hasFilters = Object.values(filters).some(Boolean);

  const updateFilter = useCallback((key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => setFilters(EMPTY_FILTERS), []);

  async function act(recordId, action, { remove = true } = {}) {
    setBusyId(recordId);
    setError("");
    try {
      const result = await action(recordId);
      if (remove) {
        setItems((current) => current.filter((item) => item.record_id !== recordId));
      }
      return result || true;
    } catch (err) {
      setError(err?.message || REVIEW.actionError);
      return null;
    } finally {
      setBusyId("");
    }
  }

  async function save(recordId, fields) {
    setBusyId(recordId);
    setError("");
    try {
      const updated = await updateReview(recordId, fields);
      setItems((current) =>
        current.map((item) => (item.record_id === recordId ? { ...item, ...updated } : item)),
      );
      return updated;
    } catch (err) {
      setError(err?.message || REVIEW.saveError);
      return null;
    } finally {
      setBusyId("");
    }
  }

  return {
    items: filteredItems,
    total: filteredItems.length,
    queueTotal: items.length,
    loading,
    busyId,
    error,
    filters,
    countries,
    regulators,
    issues,
    hasFilters,
    updateFilter,
    clearFilters,
    approve: (recordId) => act(recordId, approveReview),
    reject: (recordId) => act(recordId, rejectReview),
    remove: (recordId) => act(recordId, deleteReview),
    save,
    reload: () => reload(),
  };
}
