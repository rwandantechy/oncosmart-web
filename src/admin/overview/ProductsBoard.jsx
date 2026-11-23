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
      bodyClassName="space-y-1.5"
    >
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-7 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      ) : items.length ? (
        <ol className="m-0 list-none space-y-1.5 p-0">
          {items.map((item, index) => (
            <li key={item.product}>
              <button
                type="button"
                onClick={() => onSelectProduct?.(item.product)}
                className="flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-left transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-focus-ring"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-navy/5 text-[0.65rem] font-semibold text-text-label">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.82rem] font-medium text-ink">
                  {item.product}
                </span>
                <span className="shrink-0 text-[0.78rem] font-semibold tabular-nums text-navy">
                  {item.records}
                </span>
                <span className="hidden h-1 w-14 overflow-hidden rounded-full bg-slate-100 sm:block">
                  <i
                    className="block h-full rounded-full bg-blue"
                    style={{ width: `${(item.records / highest) * 100}%` }}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p className="m-0 text-sm text-muted">{EMPTY_PANEL.products}</p>
      )}
    </Surface>
  );
}
