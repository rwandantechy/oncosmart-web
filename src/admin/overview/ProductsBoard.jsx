import { TOP_PRODUCTS_VISIBLE } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { highestValue } from "../../utils/chart";
import Surface from "./Surface";

export default function ProductsBoard({ products, loading, onSelectProduct }) {
  const items = (products || []).slice(0, TOP_PRODUCTS_VISIBLE);
  const highest = highestValue(items, "records");

  return (
    <Surface
      eyebrow={OVERVIEW.products.eyebrow}
      title={OVERVIEW.products.title}
      note={OVERVIEW.products.note}
      bodyClassName="space-y-1"
    >
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-7 animate-pulse bg-[#edf2f6]" />
          ))}
        </div>
      ) : items.length ? (
        <ol className="m-0 list-none p-0">
          {items.map((item, index) => (
            <li key={item.product} className="border-b border-[#eef2f5] last:border-b-0">
              <button
                type="button"
                onClick={() => onSelectProduct?.(item.product)}
                className="flex w-full items-center gap-3 py-2 text-left hover:bg-[#f7fafc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#245c91]"
              >
                <span className="w-4 shrink-0 text-[0.68rem] tabular-nums text-[#7a8d9a]">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.8rem] text-[#0f2a4a]">
                  {item.product}
                </span>
                <span className="shrink-0 text-[0.78rem] font-semibold tabular-nums text-[#0f2a4a]">
                  {item.records}
                </span>
                <span className="hidden h-1 w-12 overflow-hidden bg-[#e8eef2] sm:block">
                  <span
                    className="block h-full bg-[#0f2a4a]"
                    style={{ width: `${(item.records / highest) * 100}%` }}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="m-0 text-[0.8rem] text-[#667988]">{EMPTY_PANEL.products}</p>
      )}
    </Surface>
  );
}
