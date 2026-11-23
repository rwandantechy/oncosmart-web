import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { humanizeFieldName } from "../../utils/text";
import Surface from "./Surface";

export default function CompletenessBoard({ items = [], loading }) {
  return (
    <Surface
      eyebrow={OVERVIEW.completeness.eyebrow}
      title={OVERVIEW.completeness.title}
      note={OVERVIEW.completeness.note}
      bodyClassName="grid grid-cols-1 gap-2 sm:grid-cols-2"
    >
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-10 animate-pulse rounded bg-slate-100" />
        ))
      ) : items.length ? (
        items.map((item) => (
          <div key={item.field} className="rounded-md border border-slate-100 px-2 py-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <strong className="truncate text-[0.75rem] font-semibold capitalize text-ink">
                {humanizeFieldName(item.field)}
              </strong>
              <span className="shrink-0 text-[0.68rem] tabular-nums text-muted">
                {OVERVIEW.completeness.ratio(item.valid, item.total)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <i
                className="block h-full rounded-full bg-teal-quality-bar"
                style={{
                  width: `${item.total ? (item.valid / item.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="m-0 text-sm text-muted sm:col-span-2">{EMPTY_PANEL.completeness}</p>
      )}
    </Surface>
  );
}
