import { useCallback, useMemo, useState } from "react";
import { RECORDS_PAGE_SIZE } from "../../config/ui";
import { RECORDS_REVIEW } from "../../content/admin";
import useAsyncData from "../../hooks/useAsyncData";
import { getAlert, searchAlerts } from "../../services/alertsService";

const EMPTY_FILTERS = { q: "", country: "", regulator: "", from: "", to: "" };
const EMPTY_RESULT = { items: [], total: 0 };
const LIST_OPTIONS = { initialData: EMPTY_RESULT, errorMessage: RECORDS_REVIEW.listError };

export default function useRecordsReview({ onError }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = useCallback(
    () => searchAlerts({ filters, page, pageSize: RECORDS_PAGE_SIZE }),
    [filters, page],
  );
  const options = useMemo(() => ({ ...LIST_OPTIONS, onError }), [onError]);
  const { data, loading } = useAsyncData(load, options);

  const total = data.total;
  const pageCount = Math.max(1, Math.ceil(total / RECORDS_PAGE_SIZE));
  const hasFilters = Object.values(filters).some(Boolean);

  const updateFilter = useCallback((key, value) => {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setPage(1);
    setFilters(EMPTY_FILTERS);
  }, []);

  const openRecord = useCallback(
    (recordId) => {
      setDetailLoading(true);
      getAlert(recordId)
        .then(setSelectedRecord)
        .catch(() => onError(RECORDS_REVIEW.detailError))
        .finally(() => setDetailLoading(false));
    },
    [onError],
  );

  const closeRecord = useCallback(() => setSelectedRecord(null), []);

  return {
    filters,
    records: data.items,
    total,
    page,
    pageCount,
    loading,
    hasFilters,
    firstRecord: total ? (page - 1) * RECORDS_PAGE_SIZE + 1 : 0,
    lastRecord: Math.min(page * RECORDS_PAGE_SIZE, total),
    selectedRecord,
    detailLoading,
    setPage,
    updateFilter,
    clearFilters,
    openRecord,
    closeRecord,
  };
}
