import { MONTH_LABEL_OFFSET, TIMELINE_MONTHS_VISIBLE } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { FALLBACKS } from "../../content/common";
import { EMPTY_PANEL } from "../../content/states";
import { highestValue } from "../../utils/chart";
import { monthRange } from "./monthRange";
import Surface from "./Surface";

const CHART_HEIGHT = 132;

export default function TimelineBoard({ timeline, loading, onSelectMonth }) {
  const months = (timeline?.items || []).slice(-TIMELINE_MONTHS_VISIBLE);
  const highest = highestValue(months, "records");

  return (
    <Surface
      eyebrow={OVERVIEW.timeline.eyebrow}
      title={OVERVIEW.timeline.title}
      note={OVERVIEW.timeline.note}
      bodyClassName="flex flex-col gap-3"
    >
      {loading ? (
        <div className="flex items-end gap-1.5" style={{ height: CHART_HEIGHT }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 animate-pulse bg-[color:var(--admin-track)]"
              style={{ height: `${35 + (index % 5) * 12}%` }}
            />
          ))}
        </div>
      ) : months.length ? (
        <>
          <div
            className="flex items-end gap-1.5"
            style={{ height: CHART_HEIGHT }}
            role="list"
            aria-label={OVERVIEW.timeline.chartLabel}
          >
            {months.map((item) => {
              const barHeight = Math.max(6, Math.round((item.records / highest) * (CHART_HEIGHT - 28)));
              return (
                <button
                  key={item.month}
                  type="button"
                  role="listitem"
                  title={`${item.month}: ${item.records}`}
                  onClick={() => {
                    const range = monthRange(item.month);
                    if (range) onSelectMonth?.(range);
                  }}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1 px-0.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--admin-ink-soft)]"
                >
                  <span className="text-[0.65rem] font-medium tabular-nums text-[color:var(--admin-muted)]">
                    {item.records}
                  </span>
                  <span
                    className="w-full max-w-[20px] bg-[color:var(--admin-ink)] transition group-hover:bg-[color:var(--admin-ink-soft)]"
                    style={{ height: barHeight }}
                  />
                  <span className="w-full truncate text-center text-[0.62rem] text-[color:var(--admin-muted)]">
                    {item.month.slice(MONTH_LABEL_OFFSET)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="m-0 text-[0.72rem] leading-5 text-[color:var(--admin-muted)]">
            <strong className="font-semibold text-[color:var(--admin-ink)]">
              {timeline?.records_in_full_range ?? 0}
            </strong>
            {OVERVIEW.timeline.footnoteRange(
              timeline?.range_start || FALLBACKS.dash,
              timeline?.range_end || FALLBACKS.dash,
            )}{" "}
            {OVERVIEW.timeline.footnoteNote}
          </p>
        </>
      ) : (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{EMPTY_PANEL.timeline}</p>
      )}
    </Surface>
  );
}
