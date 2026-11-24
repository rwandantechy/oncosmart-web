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
      bodyClassName="space-y-3"
    >
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-8 animate-pulse bg-[color:var(--admin-track)]" />
          ))}
        </div>
      ) : categories.length ? (
        categories.map((item) => (
          <button
            key={item.category}
            type="button"
            onClick={() => onSelectCategory?.(item.category)}
            className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--admin-ink-soft)]"
          >
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <strong className="truncate text-[0.8rem] font-medium text-[color:var(--admin-ink)]">
                {item.category}
              </strong>
              <span className="shrink-0 text-[0.72rem] tabular-nums text-[color:var(--admin-muted)]">
                {OVERVIEW.categories.recordCount(item.records)}
              </span>
            </div>
            <div className="h-1 overflow-hidden bg-[color:var(--admin-track)]">
              <span
                className="block h-full bg-[color:var(--admin-ink-soft)]"
                style={{ width: `${(item.records / highest) * 100}%` }}
              />
            </div>
          </button>
        ))
      ) : (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{EMPTY_PANEL.categories}</p>
      )}
    </Surface>
  );
}
