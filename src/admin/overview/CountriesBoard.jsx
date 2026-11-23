import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { highestValue } from "../../utils/chart";
import { withFallback } from "../../utils/text";
import Surface from "./Surface";

export default function CountriesBoard({ sources = [], loading, onSelectCountry }) {
  const items = sources.slice(0, 8);
  const highest = highestValue(items, "records");

  return (
    <Surface
      eyebrow={OVERVIEW.countries.eyebrow}
      title={OVERVIEW.countries.title}
      note={OVERVIEW.countries.note}
      bodyClassName="space-y-1.5"
    >
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-8 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      ) : items.length ? (
        items.map((source) => {
          const country = withFallback(source.country_in_source_record);
          return (
            <button
              key={`${source.reporting_regulator}-${source.country_in_source_record}`}
              type="button"
              onClick={() =>
                onSelectCountry?.({
                  country: source.country_in_source_record || "",
                  regulator: source.reporting_regulator || "",
                })
              }
              className="grid w-full grid-cols-[1fr_auto] gap-2 rounded-md px-1.5 py-1.5 text-left transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-focus-ring"
            >
              <div className="min-w-0">
                <strong className="block truncate text-[0.8rem] font-semibold text-ink">
                  {country}
                </strong>
                <small className="block truncate text-[0.68rem] text-muted">
                  {OVERVIEW.countries.publishedBy(source.reporting_regulator)}
                </small>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-100">
                  <i
                    className="block h-full rounded-full bg-blue"
                    style={{ width: `${(source.records / highest) * 100}%` }}
                  />
                </div>
              </div>
              <strong className="self-center text-[0.82rem] font-semibold tabular-nums text-navy">
                {source.records}
              </strong>
            </button>
          );
        })
      ) : (
        <p className="m-0 text-sm text-muted">{EMPTY_PANEL.countries}</p>
      )}
    </Surface>
  );
}
