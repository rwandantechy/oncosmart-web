import Icon from "../../components/Icon";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { REVIEW } from "../../content/review";
import { formatDate } from "../../utils/date";
import { withFallback } from "../../utils/text";
import ReviewActions from "./ReviewActions";

export default function ReviewTable({
  items,
  loading,
  busyId,
  onOpen,
  onApprove,
  onReject,
}) {
  const columns = REVIEW.tableHeadings.length + 1;

  return (
    <div className="recent-table-wrap" aria-busy={loading}>
      <table className="recent-table review-queue-table">
        <thead>
          <tr>
            {REVIEW.tableHeadings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
            <th>{REVIEW.actionsHeading}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const issues = item.validation_errors || [];
            const rowBusy = busyId === item.record_id;
            return (
              <tr key={item.record_id} className={rowBusy ? "is-busy" : undefined}>
                <td>{formatDate(item.publish_date)}</td>
                <td>
                  <button
                    className="record-title-button"
                    type="button"
                    onClick={() => onOpen(item)}
                  >
                    <strong>{withFallback(item.product_name, REVIEW.missingProduct)}</strong>
                    <small>{withFallback(item.reason, REVIEW.missingReason)}</small>
                  </button>
                </td>
                <td>
                  {issues.length ? (
                    <ul className="review-issue-list">
                      {issues.map((issue) => (
                        <li key={issue}>{REVIEW.issueLabel(issue)}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="review-no-issues">{REVIEW.noIssues}</span>
                  )}
                </td>
                <td>{withFallback(item.source_country, REVIEW.missingCountry)}</td>
                <td>{item.source_org}</td>
                <td>
                  <div className="review-row-actions">
                    <button
                      className="review-link"
                      type="button"
                      onClick={() => onOpen(item)}
                    >
                      {REVIEW.openRecordLabel} <Icon name="arrowRight" />
                    </button>
                    <ReviewActions
                      busy={Boolean(busyId)}
                      onApprove={() => onApprove(item.record_id)}
                      onReject={() => onReject(item.record_id)}
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
