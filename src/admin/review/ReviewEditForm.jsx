import { useEffect, useState } from "react";
import { REVIEW } from "../../content/review";

const FIELD_KEYS = [
  "product_name",
  "reason",
  "source_country",
  "publish_date",
  "manufacturer",
  "distributor",
  "more_info",
];

function draftFrom(record) {
  return Object.fromEntries(FIELD_KEYS.map((key) => [key, record?.[key] || ""]));
}

export default function ReviewEditForm({ record, busy, onSave }) {
  const [draft, setDraft] = useState(() => draftFrom(record));

  useEffect(() => {
    setDraft(draftFrom(record));
  }, [record]);

  function setField(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  return (
    <form
      className="review-edit-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <h3>{REVIEW.editHeading}</h3>
      <div className="review-edit-grid">
        {FIELD_KEYS.map((key) => {
          const label = REVIEW.fields[key];
          const multiline = key === "reason" || key === "more_info";
          return (
            <label key={key} className={multiline ? "review-edit-wide" : undefined}>
              {label}
              {multiline ? (
                <textarea
                  rows={key === "more_info" ? 5 : 3}
                  value={draft[key]}
                  onChange={(event) => setField(key, event.target.value)}
                  disabled={busy}
                />
              ) : (
                <input
                  type={key === "publish_date" ? "date" : "text"}
                  value={
                    key === "publish_date" ? (draft[key] || "").slice(0, 10) : draft[key]
                  }
                  onChange={(event) => setField(key, event.target.value)}
                  disabled={busy}
                />
              )}
            </label>
          );
        })}
      </div>
      <button type="submit" className="review-btn review-btn-approve" disabled={busy}>
        {busy ? REVIEW.busyLabel : REVIEW.saveLabel}
      </button>
    </form>
  );
}
