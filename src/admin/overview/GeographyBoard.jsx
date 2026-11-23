import WorldCountryMap from "../../components/map/WorldCountryMap";
import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { withFallback } from "../../utils/text";
import Surface from "./Surface";

export default function GeographyBoard({
  countries = [],
  sources = [],
  loading,
  selectedCountry = "",
  onSelectCountry,
}) {
  const chips = countries.length
    ? countries
    : sources.map((row) => ({
        country: row.country_in_source_record,
        records: row.records,
      }));

  return (
    <Surface
      eyebrow={OVERVIEW.countries.eyebrow}
      title={OVERVIEW.countries.title}
      note={OVERVIEW.countries.note}
      bodyClassName="space-y-3"
    >
      {loading ? (
        <div className="h-52 animate-pulse rounded-md bg-slate-100" />
      ) : chips.length ? (
        <>
          <WorldCountryMap
            countries={chips}
            selectedCountry={selectedCountry}
            onSelect={onSelectCountry}
            size="compact"
            caption="Click a shaded country to filter published notices. Click again to clear."
          />
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {chips.map((row) => {
              const country = withFallback(row.country || row.country_in_source_record);
              const active = selectedCountry === (row.country || row.country_in_source_record);
              return (
                <li key={country}>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectCountry?.(
                        active ? "" : row.country || row.country_in_source_record || "",
                      )
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.72rem] transition ${
                      active
                        ? "border-teal bg-teal/10 font-semibold text-teal-deep"
                        : "border-slate-200 bg-slate-50 text-ink hover:border-blue/30"
                    }`}
                  >
                    <span>{country}</span>
                    <span className="tabular-nums text-muted">{row.records}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="m-0 text-sm text-muted">{EMPTY_PANEL.countries}</p>
      )}
    </Surface>
  );
}
