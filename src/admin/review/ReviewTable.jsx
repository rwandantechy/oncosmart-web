import IconButton from "../../components/ui/IconButton";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { REVIEW } from "../../content/review";
import { formatDate } from "../../utils/date";
import { withFallback } from "../../utils/text";

export default function ReviewTable({ items, loading, busyId, onApprove, onReject }) {
  const columns = REVIEW.tableHeadings.length + 1;

  return (
    <div className="recent-table-wrap" aria-busy={loading}>
      <table className="recent-table review-queue-table">
        <thead>
          <tr>
            {REVIEW.tableHeadings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const busy = busyId === item.record_id;
            return (
              <tr key={item.record_id}>
                <td>{formatDate(item.publish_date)}</td>
                <td>
                  <strong>{withFallback(item.product_name, REVIEW.missingProduct)}</strong>
                  <small>{withFallback(item.reason, REVIEW.missingReason)}</small>
                  {item.source_url ? (
                    <a
                      className="review-source-link"
                      href={item.source_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {REVIEW.openSourceLabel}
                    </a>
                  ) : null}
                </td>
                <td>
                  <ul className="review-issue-list">
                    {(item.validation_errors || []).map((issue) => (
                      <li key={issue}>{REVIEW.issueLabel(issue)}</li>
                    ))}
                  </ul>
                </td>
                <td>{item.source_org}</td>
                <td>
                  <div className="review-row-actions">
                    <IconButton
                      name="check"
                      label={busy ? REVIEW.busyLabel : REVIEW.approveLabel}
                      onClick={() => onApprove(item.record_id)}
                      disabled={Boolean(busyId)}
                      showLabel
                    />
                    <IconButton
                      name="close"
                      className="icon-action danger"
                      label={busy ? REVIEW.busyLabel : REVIEW.rejectLabel}
                      onClick={() => onReject(item.record_id)}
                      disabled={Boolean(busyId)}
                      showLabel
                    />
                  </div>
                </td>
              </tr>
            );
          })}
          {loading && !items.length && (
            <tr>
              <td colSpan={columns} className="empty-table">
                <Skeleton className="skeleton-table" lines={SKELETON_LINES.table} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
