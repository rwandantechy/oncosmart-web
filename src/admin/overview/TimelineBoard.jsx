import { MONTH_LABEL_OFFSET, TIMELINE_MONTHS_VISIBLE } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { FALLBACKS } from "../../content/common";
import { EMPTY_PANEL } from "../../content/states";
import { highestValue } from "../../utils/chart";
import { monthRange } from "./monthRange";
import Surface from "./Surface";

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
        <div className="flex h-36 items-end gap-1.5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex-1 animate-pulse rounded-t bg-slate-100" style={{ height: `${40 + (index % 5) * 12}%` }} />
          ))}
        </div>
      ) : months.length ? (
        <>
          <div
            className="flex h-44 items-end gap-2"
            role="list"
            aria-label={OVERVIEW.timeline.chartLabel}
          >
            {months.map((item) => {
              const height = Math.max(14, (item.records / highest) * 100);
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
                  className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5 rounded-md border border-transparent px-0.5 py-1 text-left transition hover:border-blue/25 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-focus-ring"
                >
                  <span className="text-[0.68rem] font-semibold tabular-nums text-text-label">
                    {item.records}
                  </span>
                  <span
                    className="w-[70%] max-w-8 rounded-t-md bg-gradient-to-t from-navy to-blue transition group-hover:from-teal-deep group-hover:to-teal"
                    style={{ height: `${height}%` }}
                  />
                  <span className="w-full truncate text-center text-[0.62rem] text-text-caption">
                    {item.month.slice(MONTH_LABEL_OFFSET)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="m-0 flex flex-wrap gap-x-2 gap-y-1 text-[0.72rem] text-muted">
            <strong className="font-semibold text-ink">
              {timeline?.records_in_full_range ?? 0}
            </strong>
            <span>
              {OVERVIEW.timeline.footnoteRange(
                timeline?.range_start || FALLBACKS.dash,
                timeline?.range_end || FALLBACKS.dash,
              )}
            </span>
            <span>{OVERVIEW.timeline.footnoteNote}</span>
          </p>
        </>
      ) : (
        <p className="m-0 text-sm text-muted">{EMPTY_PANEL.timeline}</p>
      )}
    </Surface>
  );
}
