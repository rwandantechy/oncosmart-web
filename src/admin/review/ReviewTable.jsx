import Icon from "../../components/Icon";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { REVIEW } from "../../content/review";
import { formatDate } from "../../utils/date";
import { withFallback } from "../../utils/text";

export default function ReviewTable({ items, loading, onOpen }) {
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
          {items.map((item) => (
            <tr key={item.record_id}>
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
                <ul className="review-issue-list">
                  {(item.validation_errors || []).map((issue) => (
                    <li key={issue}>{REVIEW.issueLabel(issue)}</li>
                  ))}
                </ul>
              </td>
              <td>{item.source_org}</td>
              <td>
                <button
                  className="review-link"
                  type="button"
                  onClick={() => onOpen(item)}
                >
                  {REVIEW.openRecordLabel} <Icon name="arrowRight" />
                </button>
              </td>
            </tr>
          ))}
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
