import { SEARCH } from "../content/search";

export default function SuggestedSearches({ onSelect }) {
  return (
    <div className="suggested-searches">
      <span>{SEARCH.suggestions.label}</span>
      {SEARCH.suggestions.terms.map((term) => (
        <button key={term} type="button" onClick={() => onSelect(term)}>
          {term}
        </button>
      ))}
    </div>
  );
}
