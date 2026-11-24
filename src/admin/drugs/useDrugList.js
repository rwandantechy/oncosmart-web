import { useEffect, useMemo, useState } from "react";
import { DRUGS } from "../../content/drugs";
import { fetchDrugs } from "../../services/drugsService";

const EMPTY = { drugs: [], source_url: "", count: 0, storage: "", updated_at: "" };

export default function useDrugList() {
  const [payload, setPayload] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [letter, setLetter] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchDrugs({ defaultError: DRUGS.loadError })
      .then((data) => {
        if (!active) return;
        setPayload({
          drugs: data.drugs || [],
          source_url: data.source_url || "",
          source: data.source || "",
          count: data.count || 0,
          storage: data.storage || "",
          updated_at: data.updated_at || "",
        });
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setPayload(EMPTY);
        setError(err.message || DRUGS.loadError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const letters = useMemo(() => {
    const found = new Set((payload.drugs || []).map((drug) => drug.letter).filter(Boolean));
    return [...found].sort();
  }, [payload.drugs]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (payload.drugs || []).filter((drug) => {
      if (letter && drug.letter !== letter) return false;
      if (!needle) return true;
      return drug.name.toLowerCase().includes(needle) || drug.id.includes(needle);
    });
  }, [payload.drugs, q, letter]);

  const hasFilters = Boolean(q.trim() || letter);

  function clearFilters() {
    setQ("");
    setLetter("");
  }

  return {
    loading,
    error,
    sourceUrl: payload.source_url,
    source: payload.source,
    storage: payload.storage || "",
    updatedAt: payload.updated_at || "",
    total: payload.count || payload.drugs.length,
    shown: filtered.length,
    drugs: filtered,
    letters,
    q,
    letter,
    hasFilters,
    setQ,
    setLetter,
    clearFilters,
  };
}
