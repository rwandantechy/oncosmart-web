import Icon from "../../components/Icon";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { RECORDS_REVIEW, RECORD_DETAIL_FIELDS } from "../../content/admin";
import { DATE_FORMATTERS } from "../../utils/date";
import { withFallback } from "../../utils/text";

const { detail: DETAIL_COPY } = RECORDS_REVIEW;

function fieldValue(record, field) {
  const value = record[field.field];
  return field.format ? DATE_FORMATTERS[field.format](value) : value;
}

export default function RecordDetailDrawer({ record, loading, onClose }) {
  return (
    <div
      className="record-detail-backdrop"
      role="presentation"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <aside
        className="record-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby={DETAIL_COPY.titleId}
      >
        <div className="record-detail-header">
          <div>
            <p className="eyebrow">{DETAIL_COPY.eyebrow}</p>
            <h2 id={DETAIL_COPY.titleId}>
              {withFallback(record.product_name, DETAIL_COPY.missingTitle)}
            </h2>
          </div>
          <button
            className="detail-close"
            type="button"
            onClick={onClose}
            aria-label={DETAIL_COPY.closeLabel}
          >
            <Icon name="close" />
          </button>
        </div>
        {loading ? (
          <Skeleton lines={SKELETON_LINES.panel} />
        ) : (
          <>
            <p className="detail-reason">
              {withFallback(record.reason, DETAIL_COPY.missingReason)}
            </p>
            <div className="detail-grid">
              {RECORD_DETAIL_FIELDS.map((field) => (
                <div className="detail-field" key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>{withFallback(fieldValue(record, field))}</dd>
                </div>
              ))}
            </div>
            <div className="detail-section">
              <h3>{DETAIL_COPY.additionalHeading}</h3>
              <p>{withFallback(record.more_info, DETAIL_COPY.missingAdditional)}</p>
            </div>
            <div className="detail-actions">
              <a
                className="primary-source-link"
                href={record.source_url}
                target="_blank"
                rel="noreferrer"
              >
                {DETAIL_COPY.sourceLinkLabel} <Icon name="arrowRight" />
              </a>
              <button type="button" onClick={onClose}>
                {DETAIL_COPY.closeButtonLabel}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
