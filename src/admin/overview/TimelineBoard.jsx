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
      bodyClassName="flex flex-col gap-4"
    >
      {loading ? (
        <div className="flex h-40 items-end gap-1.5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 animate-pulse bg-[#edf2f6]"
              style={{ height: `${35 + (index % 5) * 12}%` }}
            />
          ))}
        </div>
      ) : months.length ? (
        <>
          <div
            className="flex h-40 items-end gap-1.5"
            role="list"
            aria-label={OVERVIEW.timeline.chartLabel}
          >
            {months.map((item) => {
              const height = Math.max(12, (item.records / highest) * 100);
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
                  className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-1 px-0.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245c91]"
                >
                  <span className="text-[0.65rem] font-medium tabular-nums text-[#6a7f8f] opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    {item.records}
                  </span>
                  <span
                    className="w-full max-w-[18px] bg-[#0f2a4a] transition group-hover:bg-[#245c91]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="w-full truncate text-center text-[0.62rem] text-[#7a8d9a]">
                    {item.month.slice(MONTH_LABEL_OFFSET)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="m-0 text-[0.72rem] leading-5 text-[#667988]">
            <strong className="font-semibold text-[#0f2a4a]">
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
        <p className="m-0 text-[0.8rem] text-[#667988]">{EMPTY_PANEL.timeline}</p>
      )}
    </Surface>
  );
}
