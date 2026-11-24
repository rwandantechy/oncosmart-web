import { OVERVIEW } from "../../content/admin";
import { FALLBACKS } from "../../content/common";

function Kpi({ label, value, note, emphasize = false, pending = false }) {
  return (
    <div className="bg-white px-6 py-3">
      <p className="m-0 text-[0.68rem] font-medium text-[#6a7f8f]">{label}</p>
      <p
        className={`m-0 mt-1 text-[1.5rem] font-semibold tracking-[-0.03em] tabular-nums leading-none ${
          emphasize ? "text-[#0f6e6a]" : "text-[#0f2a4a]"
        }`}
      >
        {pending ? FALLBACKS.dash : value}
      </p>
      {note ? <p className="m-0 mt-1.5 text-[0.72rem] text-[#7a8d9a]">{note}</p> : null}
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
      className="grid grid-cols-2 border-b border-[#e4ebf0] bg-[#e4ebf0] gap-px sm:grid-cols-3 xl:grid-cols-5"
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
        emphasize={pendingReview > 0}
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
