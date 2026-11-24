import { DRUGS } from "../../content/drugs";

const { filters: FILTER_COPY } = DRUGS;

export default function DrugFilters({
  q,
  letter,
  letters,
  hasFilters,
  onSearch,
  onLetter,
  onClear,
}) {
  return (
    <div className="research-filters drug-filters" aria-label={FILTER_COPY.regionLabel}>
      <label className="filter-search">
        {FILTER_COPY.search.label}
        <input
          value={q}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={FILTER_COPY.search.placeholder}
        />
      </label>
      <label>
        {FILTER_COPY.letter.label}
        <select value={letter} onChange={(event) => onLetter(event.target.value)}>
          <option value="">{FILTER_COPY.letter.anyOption}</option>
          {letters.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      {hasFilters ? (
        <button className="clear-filters" type="button" onClick={onClear}>
          {FILTER_COPY.clearLabel}
        </button>
      ) : null}
    </div>
  );
}
