import Skeleton from "../components/ui/Skeleton";
import { SEARCH, TECHNICAL_DETAIL_FIELDS } from "../content/search";
import { humanizeText } from "../utils/date";
import { regulatorLabel, withFallback } from "../utils/text";

export default function AlertExplanation({ alert, explanation, onClose }) {
  const visibleFields = TECHNICAL_DETAIL_FIELDS.filter(
    (field) => !field.onlyWhenPresent || alert[field.field],
  );

  return (
    <div className="inline-explanation" aria-live="polite">
      <div className="explanation-heading">
        <div>
          <p className="eyebrow">{SEARCH.explanation.eyebrow}</p>
          <h3>{SEARCH.explanation.heading}</h3>
        </div>
        <button className="close-button" type="button" onClick={onClose}>
          {SEARCH.explanation.closeLabel}
        </button>
      </div>
      {explanation ? (
        <>
          <p className="explanation-summary">
            <strong>{humanizeText(explanation.what_happened)}</strong>
          </p>
          <h4>{SEARCH.explanation.whyHeading}</h4>
          <p>{humanizeText(explanation.why_it_matters)}</p>
          <h4>{SEARCH.explanation.nextHeading}</h4>
          <p>{humanizeText(explanation.what_to_do_next)}</p>
          {explanation.limitations?.length > 0 && (
            <details className="unknown-details" open>
              <summary>{SEARCH.explanation.limitationsSummary}</summary>
              <ul>
                {explanation.limitations.map((point) => (
                  <li key={point}>{humanizeText(point)}</li>
                ))}
              </ul>
            </details>
          )}
        </>
      ) : (
        <>
          <p className="sr-only">{SEARCH.explanation.pending}</p>
          <Skeleton lines={4} />
        </>
      )}
      <details className="record-details">
        <summary>{SEARCH.explanation.technicalSummary}</summary>
        <dl>
          {visibleFields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{withFallback(alert[field.field])}</dd>
            </div>
          ))}
        </dl>
      </details>
      <a
        className="inline-source-link"
        href={alert.source_url}
        target="_blank"
        rel="noreferrer"
      >
        {SEARCH.explanation.sourceLinkLabel(
          regulatorLabel(alert.source_org, SEARCH.explanation.genericRegulator),
        )}
      </a>
    </div>
  );
}
