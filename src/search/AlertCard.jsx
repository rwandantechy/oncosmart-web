import { SEARCH } from "../content/search";
import { formatDate } from "../utils/date";
import { regulatorLabel, withFallback } from "../utils/text";
import AlertExplanation from "./AlertExplanation";

export default function AlertCard({
  alert,
  explaining,
  explanationOpen,
  explanation,
  onExplain,
  onCloseExplanation,
}) {
  return (
    <article className="card">
      <div className="result-meta">
        <span className="source-badge">{regulatorLabel(alert.source_org)}</span>
        <span>{formatDate(alert.publish_date)}</span>
        <span>
          {SEARCH.card.countryPrefix}
          {withFallback(alert.source_country)}
        </span>
      </div>
      <h2>{withFallback(alert.product_name, SEARCH.card.missingProduct)}</h2>
      <p className="reason">{withFallback(alert.reason, SEARCH.card.missingReason)}</p>
      <div className="card-actions">
        <button
          className="secondary-button"
          type="button"
          onClick={() => onExplain(alert)}
          disabled={explaining}
          aria-busy={explaining}
        >
          {explaining ? SEARCH.card.detailsLoadingLabel : SEARCH.card.detailsLabel}
        </button>
        <a href={alert.source_url} target="_blank" rel="noreferrer">
          {SEARCH.card.sourceLabel}{" "}
          <span className="external-arrow" aria-hidden="true">
            {SEARCH.card.sourceGlyph}
          </span>
        </a>
      </div>
      {explanationOpen && (
        <AlertExplanation
          alert={alert}
          explanation={explanation}
          onClose={onCloseExplanation}
        />
      )}
    </article>
  );
}
