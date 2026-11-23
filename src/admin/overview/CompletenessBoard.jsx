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
          <div key={index} className="h-8 animate-pulse bg-[#edf2f6]" />
        ))
      ) : items.length ? (
        items.map((item) => (
          <div key={item.field}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <strong className="truncate text-[0.78rem] font-medium capitalize text-[#0f2a4a]">
                {humanizeFieldName(item.field)}
              </strong>
              <span className="shrink-0 text-[0.7rem] tabular-nums text-[#7a8d9a]">
                {OVERVIEW.completeness.ratio(item.valid, item.total)}
              </span>
            </div>
            <div className="h-1 overflow-hidden bg-[#e8eef2]">
              <span
                className="block h-full bg-[#0f2a4a]"
                style={{
                  width: `${item.total ? (item.valid / item.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="m-0 text-[0.8rem] text-[#667988]">{EMPTY_PANEL.completeness}</p>
      )}
    </Surface>
  );
}
