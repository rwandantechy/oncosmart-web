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
            <div key={index} className="h-8 animate-pulse bg-[#edf2f6]" />
          ))}
        </div>
      ) : categories.length ? (
        categories.map((item) => (
          <button
            key={item.category}
            type="button"
            onClick={() => onSelectCategory?.(item.category)}
            className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245c91]"
          >
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <strong className="truncate text-[0.8rem] font-medium text-[#0f2a4a]">
                {item.category}
              </strong>
              <span className="shrink-0 text-[0.72rem] tabular-nums text-[#7a8d9a]">
                {OVERVIEW.categories.recordCount(item.records)}
              </span>
            </div>
            <div className="h-1 overflow-hidden bg-[#e8eef2]">
              <span
                className="block h-full bg-[#245c91]"
                style={{ width: `${(item.records / highest) * 100}%` }}
              />
            </div>
          </button>
        ))
      ) : (
        <p className="m-0 text-[0.8rem] text-[#667988]">{EMPTY_PANEL.categories}</p>
      )}
    </Surface>
  );
}
