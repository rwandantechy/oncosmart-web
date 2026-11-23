import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import {
  buildCountryIndex,
  recordsForGeo,
  sourceCountryForGeo,
} from "./countryMatch";

const GEO_URL = "/geo/countries-110m.json";

const FILL = {
  empty: "#d4dde6",
  active: "#071f49",
  activeMid: "#14345f",
  activeSoft: "#2a5f8f",
  selected: "#0f6e6a",
  hover: "#0c356b",
  stroke: "#f4f7f9",
  ocean: "#e7eef3",
  grid: "#d5e0e8",
};

function fillForCount(count, max, selected, hovered) {
  if (!count) return FILL.empty;
  if (selected) return FILL.selected;
  if (hovered) return FILL.hover;
  if (max <= 1) return FILL.active;
  const t = count / max;
  if (t >= 0.5) return FILL.active;
  if (t >= 0.15) return FILL.activeMid;
  return FILL.activeSoft;
}

/**
 * Full-bleed choropleth. Sized only by aspect-ratio so the board never
 * leaves an empty grey band under a short SVG.
 */
export default function WorldCountryMap({
  countries = [],
  selectedCountry = "",
  onSelect,
  size = "default",
}) {
  const [tip, setTip] = useState(null);
  const [hovered, setHovered] = useState("");
  const index = useMemo(() => buildCountryIndex(countries), [countries]);
  const max = useMemo(() => {
    let highest = 1;
    index.forEach((entry) => {
      if (entry.records > highest) highest = entry.records;
    });
    return highest;
  }, [index]);

  // Equal Earth ~2.05:1 — keep scale modest so southern continents stay in frame.
  const width = 980;
  const height = size === "compact" ? 460 : 500;
  const scale = size === "compact" ? 148 : 158;

  return (
    <div
      className="world-country-map relative w-full overflow-hidden"
      style={{ background: FILL.ocean, aspectRatio: `${width} / ${height}` }}
    >
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale, center: [0, 8] }}
        width={width}
        height={height}
        className="absolute inset-0 block h-full w-full"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Sphere id="edm-sphere" fill={FILL.ocean} stroke={FILL.grid} strokeWidth={0.6} />
        <Graticule stroke={FILL.grid} strokeWidth={0.35} step={[24, 24]} />
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
              const isHovered = hovered === name;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  tabIndex={interactive ? 0 : -1}
                  role={interactive ? "button" : undefined}
                  aria-label={
                    count ? `${sourceCountry || name}: ${count} notices` : name
                  }
                  fill={fillForCount(count, max, selected, isHovered)}
                  stroke={FILL.stroke}
                  strokeWidth={0.35}
                  style={{
                    outline: "none",
                    cursor: interactive ? "pointer" : "default",
                    transition: "fill 100ms ease",
                  }}
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
                    setHovered(name);
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
                  onMouseLeave={() => {
                    setHovered("");
                    setTip(null);
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tip ? (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[130%] bg-[#071f49] px-2.5 py-1.5 text-[0.72rem] text-white shadow-md"
          style={{ left: tip.x, top: tip.y }}
        >
          <strong className="font-semibold">{tip.label}</strong>
          <span className="ml-2 tabular-nums text-white/80">{tip.records}</span>
        </div>
      ) : null}
    </div>
  );
}
