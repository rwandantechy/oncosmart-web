import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  buildCountryIndex,
  recordsForGeo,
  sourceCountryForGeo,
} from "./countryMatch";

const GEO_URL = "/geo/countries-110m.json";

/** EDM-style palette: quiet land, solid navy for countries with notices. */
const FILL = {
  empty: "#d9e3ec",
  active: "#071f49",
  activeMid: "#183e6b",
  activeSoft: "#245c91",
  selected: "#168c8c",
  hover: "#0c356b",
  stroke: "#ffffff",
};

function fillForCount(count, max, selected, hovered) {
  if (!count) return FILL.empty;
  if (selected) return FILL.selected;
  if (hovered) return FILL.hover;
  if (max <= 1) return FILL.active;
  const t = count / max;
  if (t >= 0.55) return FILL.active;
  if (t >= 0.2) return FILL.activeMid;
  return FILL.activeSoft;
}

/**
 * Reusable world choropleth (react-simple-maps v5 uses path fill props, not style.default).
 */
export default function WorldCountryMap({
  countries = [],
  selectedCountry = "",
  onSelect,
  size = "default",
  caption,
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

  const height = size === "compact" ? 240 : 340;
  const scale = size === "compact" ? 145 : 165;

  return (
    <div className="world-country-map relative w-full overflow-hidden rounded-md bg-[#eef3f7]">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale, center: [10, 8] }}
        width={800}
        height={height}
        className="h-auto w-full"
        style={{ width: "100%", height: "auto", display: "block" }}
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
              const isHovered = hovered === name;

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
                  fill={fillForCount(count, max, selected, isHovered)}
                  stroke={FILL.stroke}
                  strokeWidth={0.55}
                  style={{
                    outline: "none",
                    cursor: interactive ? "pointer" : "default",
                    transition: "fill 120ms ease",
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
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[120%] rounded-md bg-navy px-2.5 py-1.5 text-[0.72rem] text-white shadow-lg"
          style={{ left: tip.x, top: tip.y }}
        >
          <strong className="font-semibold">{tip.label}</strong>
          <span className="ml-2 tabular-nums opacity-90">{tip.records}</span>
        </div>
      ) : null}

      {caption ? (
        <p className="m-0 border-t border-slate-200/80 bg-white px-2.5 py-2 text-[0.72rem] text-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
