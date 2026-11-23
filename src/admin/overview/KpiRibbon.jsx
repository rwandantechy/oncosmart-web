import { OVERVIEW } from "../../content/admin";
import { FALLBACKS } from "../../content/common";

function Kpi({ label, value, note, accent = false, pending = false }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 ${
        accent
          ? "border-teal/30 bg-teal/[0.06]"
          : "border-slate-200/90 bg-white"
      }`}
    >
      <p className="m-0 text-[0.65rem] font-semibold tracking-[0.06em] text-text-caption uppercase">
        {label}
      </p>
      <p
        className={`m-0 mt-1 text-[1.35rem] font-semibold tracking-tight tabular-nums ${
          accent ? "text-teal-deep" : "text-navy"
        }`}
      >
        {pending ? FALLBACKS.dash : value}
      </p>
      {note ? <p className="m-0 mt-0.5 text-[0.7rem] text-muted">{note}</p> : null}
    </div>
  );
}

export default function KpiRibbon({
  summary,
  pendingReview,
  lowestCompleteness,
  loading,
}) {
  return (
    <section
      className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5"
      aria-label={OVERVIEW.metrics.regionLabel}
      aria-busy={loading}
    >
      {OVERVIEW.metrics.cards.map((card) => (
        <Kpi
          key={card.key}
          label={card.label}
          value={summary?.[card.key] ?? FALLBACKS.dash}
          note={card.note}
          pending={loading}
        />
      ))}
      <Kpi
        accent={pendingReview > 0}
        label={OVERVIEW.metrics.pendingReview.label}
        value={pendingReview}
        note={OVERVIEW.metrics.pendingReview.note}
        pending={loading}
      />
      <Kpi
        label={OVERVIEW.metrics.incomplete.label}
        value={
          lowestCompleteness == null
            ? FALLBACKS.dash
            : `${Math.round(lowestCompleteness)}%`
        }
        note={OVERVIEW.metrics.incomplete.note}
        pending={loading}
      />
    </section>
  );
}
