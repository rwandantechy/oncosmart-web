import Icon from "../Icon";

export default function Pagination({ page, pageCount, onChange, labels }) {
  if (pageCount <= 1) return null;
  return (
    <nav className="pagination" aria-label={labels.regionLabel}>
      <button type="button" onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>
        <Icon name="chevronLeft" />
        {labels.previousLabel}
      </button>
      <span>{labels.status(page, pageCount)}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
      >
        {labels.nextLabel}
        <Icon name="chevronRight" />
      </button>
    </nav>
  );
}
