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
      flush
      bodyClassName="space-y-0"
      action={
        selectedCountry ? (
          <button
            type="button"
            onClick={() => onSelectCountry?.("")}
            className="text-[0.72rem] font-medium text-[#245c91] hover:underline"
          >
            {OVERVIEW.countries.clearFilter(selectedCountry)}
          </button>
        ) : null
      }
    >
      {loading ? (
        <div className="aspect-[980/460] animate-pulse bg-[#e7eef3]" />
      ) : chips.length ? (
        <>
          <WorldCountryMap
            countries={chips}
            selectedCountry={selectedCountry}
            onSelect={onSelectCountry}
            size="compact"
          />
          <ul
            className="m-0 flex list-none flex-wrap border-t border-[#e4ebf0] p-0"
            aria-label={OVERVIEW.countries.listLabel}
          >
            {chips.map((row) => {
              const value = row.country || row.country_in_source_record || "";
              const country = withFallback(value);
              const active = selectedCountry === value;
              return (
                <li key={country} className="border-b border-r border-[#e4ebf0]">
                  <button
                    type="button"
                    onClick={() => onSelectCountry?.(active ? "" : value)}
                    aria-pressed={active}
                    className={`inline-flex h-8 items-center gap-2 px-3 text-[0.7rem] leading-none ${
                      active
                        ? "bg-[#071f49] font-semibold text-white"
                        : "bg-white text-[#0f2a4a] hover:bg-[#f3f6f8]"
                    }`}
                  >
                    <span>{country}</span>
                    <span
                      className={`tabular-nums ${active ? "text-white/70" : "text-[#7a8d9a]"}`}
                    >
                      {row.records}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="m-0 px-4 py-3 text-[0.8rem] text-[#667988]">{EMPTY_PANEL.countries}</p>
      )}
    </Surface>
  );
}
