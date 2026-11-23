import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { highestValue } from "../../utils/chart";
import Surface from "./Surface";

export default function CategoryBoard({ research, loading, onSelectCategory }) {
  const categories = research?.notice_categories || [];
  const highest = highestValue(categories, "records");

  return (
    <Surface
      eyebrow={OVERVIEW.categories.eyebrow}
      title={OVERVIEW.categories.title}
      note={research?.method_note}
      bodyClassName="space-y-2.5"
    >
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-8 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      ) : categories.length ? (
        categories.map((item) => (
          <button
            key={item.category}
            type="button"
            onClick={() => onSelectCategory?.(item.category)}
            className="grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 rounded-md border border-transparent px-1.5 py-1.5 text-left transition hover:border-slate-200 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-focus-ring"
          >
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <strong className="truncate text-[0.82rem] font-semibold text-ink">
                  {item.category}
                </strong>
                <span className="shrink-0 text-[0.75rem] font-semibold tabular-nums text-text-label">
                  {OVERVIEW.categories.recordCount(item.records)}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <i
                  className="block h-full rounded-full bg-teal-quality-bar"
                  style={{ width: `${(item.records / highest) * 100}%` }}
                />
              </div>
            </div>
          </button>
        ))
      ) : (
        <p className="m-0 text-sm text-muted">{EMPTY_PANEL.categories}</p>
      )}
    </Surface>
  );
}
