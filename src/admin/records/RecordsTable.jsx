import Icon from "../../components/Icon";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { RECORDS_REVIEW } from "../../content/admin";
import { formatDate } from "../../utils/date";
import { truncateRecordId, withFallback } from "../../utils/text";

export default function RecordsTable({ records, loading, onOpen }) {
  const columns = RECORDS_REVIEW.tableHeadings.length + 1;

  return (
    <div className="recent-table-wrap" aria-busy={loading}>
      <table className="recent-table">
        <thead>
          <tr>
            {RECORDS_REVIEW.tableHeadings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item.record_id}>
              <td>{formatDate(item.publish_date)}</td>
              <td>
                <button
                  className="record-title-button"
                  type="button"
                  onClick={() => onOpen(item.record_id)}
                >
                  <strong>{withFallback(item.product_name)}</strong>
                  <small>{withFallback(item.reason, RECORDS_REVIEW.missingReason)}</small>
                  <code>{truncateRecordId(item.record_id)}</code>
                </button>
              </td>
              <td>{withFallback(item.source_country)}</td>
              <td>{item.source_org}</td>
              <td>
                <button
                  className="review-link"
                  type="button"
                  onClick={() => onOpen(item.record_id)}
                >
                  {RECORDS_REVIEW.reviewLabel} <Icon name="arrowRight" />
                </button>
              </td>
            </tr>
          ))}
          {loading && !records.length && (
            <tr>
              <td colSpan={columns} className="empty-table">
                <Skeleton className="skeleton-table" lines={SKELETON_LINES.table} />
              </td>
            </tr>
          )}
          {!loading && !records.length && (
            <tr>
              <td colSpan={columns} className="empty-table">
                {RECORDS_REVIEW.emptyLabel}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
