import { useCallback, useEffect, useState } from "react";
import { REVIEW } from "../../content/review";
import { approveReview, listPending, rejectReview } from "../../services/reviewService";

export default function useReviewQueue() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  const reload = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      const page = await listPending({ signal });
      setItems(page.items || []);
      setTotal(page.total || 0);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || REVIEW.loadError);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    reload(controller.signal);
    return () => controller.abort();
  }, [reload]);

  async function act(recordId, action) {
    setBusyId(recordId);
    setError("");
    try {
      await action(recordId);
      setItems((current) => current.filter((item) => item.record_id !== recordId));
      setTotal((current) => Math.max(0, current - 1));
      return true;
    } catch (err) {
      setError(err?.message || REVIEW.actionError);
      return false;
    } finally {
      setBusyId("");
    }
  }

  return {
    items,
    total,
    loading,
    busyId,
    error,
    approve: (recordId) => act(recordId, approveReview),
    reject: (recordId) => act(recordId, rejectReview),
    reload: () => reload(),
  };
}
