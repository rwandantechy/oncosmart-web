import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  buildCountryIndex,
  recordsForGeo,
  sourceCountryForGeo,
} from "./countryMatch";

const GEO_URL = "/geo/countries-110m.json";

const FILL = {
  empty: "#d7e0e8",
  land: "#9eb4c6",
  active: "#071f49",
  selected: "#168c8c",
  hover: "#245c91",
};

function fillForCount(count, max, selected) {
  if (!count) return FILL.empty;
  if (selected) return FILL.selected;
  if (max <= 1) return FILL.active;
  const t = Math.min(1, 0.35 + (count / max) * 0.65);
  // Blend navy intensity by volume
  const light = 30 + Math.round((1 - t) * 40);
  return `hsl(214 82% ${light}%)`;
}

/**
 * Reusable world choropleth.
 * @param {Array<{country?: string, country_in_source_record?: string, records: number}>} countries
 * @param {string} [selectedCountry] source_country value currently selected
 * @param {(country: string) => void} [onSelect] called with source_country (toggle if same)
 * @param {"compact"|"default"} [size]
 */
export default function WorldCountryMap({
  countries = [],
  selectedCountry = "",
  onSelect,
  size = "default",
  caption,
}) {
  const [tip, setTip] = useState(null);
  const index = useMemo(() => buildCountryIndex(countries), [countries]);
  const max = useMemo(() => {
    let highest = 1;
    index.forEach((entry) => {
      if (entry.records > highest) highest = entry.records;
    });
    return highest;
  }, [index]);

  const height = size === "compact" ? 220 : 320;

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: size === "compact" ? 135 : 155 }}
        width={800}
        height={height}
        className="h-auto w-full"
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const count = recordsForGeo(index, name);
              const sourceCountry = sourceCountryForGeo(index, name);
              const selected =
                Boolean(selectedCountry) &&
                sourceCountry &&
                selectedCountry === sourceCountry;
              const interactive = count > 0 && typeof onSelect === "function";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  tabIndex={interactive ? 0 : -1}
                  role={interactive ? "button" : undefined}
                  aria-label={
                    count
                      ? `${sourceCountry || name}: ${count} notices`
                      : name
                  }
                  onClick={() => {
                    if (!interactive) return;
                    onSelect(selected ? "" : sourceCountry);
                  }}
                  onKeyDown={(event) => {
                    if (!interactive) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(selected ? "" : sourceCountry);
                    }
                  }}
                  onMouseEnter={(event) => {
                    if (!count) return;
                    setTip({
                      label: sourceCountry || name,
                      records: count,
                      x: event.clientX,
                      y: event.clientY,
                    });
                  }}
                  onMouseMove={(event) => {
                    if (!count) return;
                    setTip((current) =>
                      current
                        ? { ...current, x: event.clientX, y: event.clientY }
                        : current,
                    );
                  }}
                  onMouseLeave={() => setTip(null)}
                  style={{
                    default: {
                      fill: count ? fillForCount(count, max, selected) : FILL.land,
                      stroke: "#f4f7fa",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: interactive ? "pointer" : "default",
                    },
                    hover: {
                      fill: count ? (selected ? FILL.selected : FILL.hover) : FILL.land,
                      stroke: "#ffffff",
                      strokeWidth: 0.6,
                      outline: "none",
                      cursor: interactive ? "pointer" : "default",
                    },
                    pressed: {
                      fill: FILL.selected,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tip ? (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[120%] rounded-md bg-navy px-2.5 py-1.5 text-[0.72rem] text-white shadow-lg"
          style={{ left: tip.x, top: tip.y }}
        >
          <strong className="font-semibold">{tip.label}</strong>
          <span className="ml-2 tabular-nums opacity-90">{tip.records}</span>
        </div>
      ) : null}

      {caption ? (
        <p className="m-0 mt-2 text-[0.72rem] text-muted">{caption}</p>
      ) : null}
    </div>
  );
}
