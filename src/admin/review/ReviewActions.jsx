import { REVIEW } from "../../content/review";

export default function ReviewActions({
  busy,
  onApprove,
  onReject,
  onDelete,
  onClose,
  showClose = false,
  showDelete = false,
  note,
}) {
  return (
    <div className="review-actions">
      {note ? <p className="review-match-note">{note}</p> : null}
      <div className="review-actions-row">
        <button
          type="button"
          className="review-btn review-btn-approve"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onApprove();
          }}
          disabled={busy}
        >
          {busy ? REVIEW.busyLabel : REVIEW.approveLabel}
        </button>
        <button
          type="button"
          className="review-btn review-btn-reject"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onReject();
          }}
          disabled={busy}
        >
          {busy ? REVIEW.busyLabel : REVIEW.rejectLabel}
        </button>
        {showDelete ? (
          <button
            type="button"
            className="review-btn review-btn-delete"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDelete();
            }}
            disabled={busy}
          >
            {busy ? REVIEW.busyLabel : REVIEW.deleteLabel}
          </button>
        ) : null}
        {showClose ? (
          <button
            type="button"
            className="review-btn review-btn-close"
            onClick={onClose}
            disabled={busy}
          >
            {REVIEW.closeLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
