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
      bodyClassName="space-y-3"
    >
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-8 animate-pulse bg-[color:var(--admin-track)]" />
        ))
      ) : items.length ? (
        items.map((item) => (
          <div key={item.field}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <strong className="truncate text-[0.78rem] font-medium capitalize text-[color:var(--admin-ink)]">
                {humanizeFieldName(item.field)}
              </strong>
              <span className="shrink-0 text-[0.7rem] tabular-nums text-[color:var(--admin-muted)]">
                {OVERVIEW.completeness.ratio(item.valid, item.total)}
              </span>
            </div>
            <div className="h-1 overflow-hidden bg-[color:var(--admin-track)]">
              <span
                className="block h-full bg-[color:var(--admin-ink)]"
                style={{
                  width: `${item.total ? (item.valid / item.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="m-0 text-[0.8rem] text-[color:var(--admin-muted)]">{EMPTY_PANEL.completeness}</p>
      )}
    </Surface>
  );
}
