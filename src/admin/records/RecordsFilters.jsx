import { RECORDS_REVIEW } from "../../content/admin";

const { filters: FILTER_COPY } = RECORDS_REVIEW;

export default function RecordsFilters({
  filters,
  countries,
  regulators,
  hasFilters,
  onChange,
  onClear,
}) {
  return (
    <div className="research-filters" aria-label={FILTER_COPY.regionLabel}>
      <label className="filter-search">
        {FILTER_COPY.search.label}
        <input
          value={filters.q}
          onChange={(event) => onChange("q", event.target.value)}
          placeholder={FILTER_COPY.search.placeholder}
        />
      </label>
      <label>
        {FILTER_COPY.country.label}
        <select
          value={filters.country}
          onChange={(event) => onChange("country", event.target.value)}
        >
          <option value="">{FILTER_COPY.country.anyOption}</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <label>
        {FILTER_COPY.regulator.label}
        <select
          value={filters.regulator}
          onChange={(event) => onChange("regulator", event.target.value)}
        >
          <option value="">{FILTER_COPY.regulator.anyOption}</option>
          {regulators.map((regulator) => (
            <option key={regulator} value={regulator}>
              {regulator}
            </option>
          ))}
        </select>
      </label>
      <label>
        {FILTER_COPY.from.label}
        <input
          type="date"
          value={filters.from}
          onChange={(event) => onChange("from", event.target.value)}
        />
      </label>
      <label>
        {FILTER_COPY.to.label}
        <input
          type="date"
          value={filters.to}
          onChange={(event) => onChange("to", event.target.value)}
        />
      </label>
      {hasFilters && (
        <button className="clear-filters" type="button" onClick={onClear}>
          {FILTER_COPY.clearLabel}
        </button>
      )}
    </div>
  );
}
