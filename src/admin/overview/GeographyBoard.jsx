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
        <div className="h-52 animate-pulse bg-[#edf2f6]" />
      ) : chips.length ? (
        <>
          <WorldCountryMap
            countries={chips}
            selectedCountry={selectedCountry}
            onSelect={onSelectCountry}
            size="compact"
            caption="Shaded countries appear in the notices. Click one to filter the table."
          />
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {chips.map((row) => {
              const value = row.country || row.country_in_source_record || "";
              const country = withFallback(value);
              const active = selectedCountry === value;
              return (
                <li key={country}>
                  <button
                    type="button"
                    onClick={() => onSelectCountry?.(active ? "" : value)}
                    className={`inline-flex h-7 items-center gap-2 border px-2.5 text-[0.72rem] ${
                      active
                        ? "border-[#0f2a4a] bg-[#0f2a4a] font-semibold text-white"
                        : "border-[#d5e0e8] bg-white text-[#0f2a4a] hover:border-[#245c91]"
                    }`}
                  >
                    <span>{country}</span>
                    <span className={`tabular-nums ${active ? "text-white/80" : "text-[#7a8d9a]"}`}>
                      {row.records}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="m-0 text-[0.8rem] text-[#667988]">{EMPTY_PANEL.countries}</p>
      )}
    </Surface>
  );
}
