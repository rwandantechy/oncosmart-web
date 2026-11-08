import Icon from "../components/Icon";
import { SEARCH } from "../content/search";

export default function SearchForm({ query, onQueryChange, onSubmit, onClear, loading, disabled }) {
  function onKeyDown(event) {
    if (event.key === "Escape" && query) {
      event.preventDefault();
      onClear();
    }
  }

  return (
    <form onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor={SEARCH.form.fieldId}>
        {SEARCH.form.fieldLabel}
      </label>
      <div className="search-box">
        <Icon name="search" />
        <input
          id={SEARCH.form.fieldId}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={SEARCH.form.placeholder}
          disabled={disabled}
          aria-busy={loading}
        />
        {query ? (
          <button
            className="clear-search"
            type="button"
            onClick={onClear}
            aria-label={SEARCH.form.clearLabel}
          >
            <Icon name="close" />
          </button>
        ) : null}
        <button className="search-button" type="submit" disabled={disabled}>
          {SEARCH.form.submitLabel}
        </button>
      </div>
    </form>
  );
}
