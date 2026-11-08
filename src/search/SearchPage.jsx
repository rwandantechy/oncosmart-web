import EmptyState from "../components/ui/EmptyState";
import Skeleton from "../components/ui/Skeleton";
import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import { SEARCH_PHASES, SKELETON_LINES } from "../config/ui";
import { SEARCH } from "../content/search";
import { MAIN_CONTENT_ID, SEARCH_EMPTY } from "../content/states";
import AlertCard from "./AlertCard";
import SearchForm from "./SearchForm";
import SuggestedSearches from "./SuggestedSearches";
import useAlertExplanation from "./useAlertExplanation";
import useAlertSearch from "./useAlertSearch";

export default function SearchPage() {
  const {
    query,
    updateQuery,
    alerts,
    lastTerm,
    phase,
    looking,
    isBusy,
    statusText,
    search,
    reset,
    resultsRef,
  } = useAlertSearch();
  const { openRecordId, explanation, pendingRecordId, explain, close } = useAlertExplanation();
  const compact = looking && phase !== SEARCH_PHASES.unavailable;

  const submit = (event) => {
    event.preventDefault();
    search(query);
  };

  return (
    <>
      <SiteHeader compact={compact} />
      <main
        id={MAIN_CONTENT_ID}
        className={compact ? "container results-page" : "container home-page"}
      >
        <p className="trust-strip">
          {SEARCH.trustStrip.text}{" "}
          <a href={SEARCH.trustStrip.href}>{SEARCH.trustStrip.linkLabel}</a>
        </p>
        {!looking && (
          <div className="hero-copy">
            <p className="eyebrow">{SEARCH.hero.eyebrow}</p>
            <h1>{SEARCH.hero.heading}</h1>
            <p className="intro">{SEARCH.hero.intro}</p>
          </div>
        )}
        {looking && (
          <div className="results-heading">
            <p className="eyebrow">{SEARCH.results.eyebrow}</p>
            <h1>
              {lastTerm}
              {phase === SEARCH_PHASES.results ? (
                <span> {SEARCH.results.headingSuffix}</span>
              ) : null}
            </h1>
          </div>
        )}
        <SearchForm
          query={query}
          onQueryChange={updateQuery}
          onSubmit={submit}
          onClear={reset}
          loading={isBusy}
          disabled={phase === SEARCH_PHASES.unavailable}
        />
        {(!looking || phase === SEARCH_PHASES.empty) && phase !== SEARCH_PHASES.unavailable && (
          <SuggestedSearches onSelect={search} />
        )}
        {looking && (
          <div className="result-toolbar">
            <p className="status" aria-live="polite">
              {statusText}
            </p>
            <button className="reset-button" type="button" onClick={reset}>
              {SEARCH.results.resetLabel}
            </button>
          </div>
        )}
        {phase === SEARCH_PHASES.recent && (
          <div className="recent-heading">
            <p className="eyebrow">{SEARCH.recent.eyebrow}</p>
            <h2>{SEARCH.recent.heading}</h2>
            <p className="status" aria-live="polite">
              {statusText}
            </p>
          </div>
        )}
        <section ref={resultsRef} className="results-list" aria-label={SEARCH.results.regionLabel} aria-busy={isBusy}>
          {phase === SEARCH_PHASES.loading && !alerts.length && (
            <div className="results-pending" aria-busy="true">
              <Skeleton className="skeleton-card" lines={SKELETON_LINES.card} />
              <Skeleton className="skeleton-card" lines={SKELETON_LINES.card} />
              <Skeleton className="skeleton-card" lines={SKELETON_LINES.card} />
            </div>
          )}
          {phase === SEARCH_PHASES.empty && (
            <EmptyState
              icon="search"
              tone="idle"
              title={SEARCH_EMPTY.empty.title}
              body={SEARCH_EMPTY.empty.body}
            />
          )}
          {phase === SEARCH_PHASES.error && (
            <EmptyState
              icon="warning"
              tone="error"
              title={SEARCH_EMPTY.error.title}
              body={SEARCH_EMPTY.error.body}
              action={
                <button className="reset-button" type="button" onClick={() => search(query || lastTerm)}>
                  {SEARCH_EMPTY.error.retry}
                </button>
              }
            />
          )}
          {phase === SEARCH_PHASES.unavailable && (
            <EmptyState
              icon="warning"
              tone="error"
              title={SEARCH_EMPTY.unavailable.title}
              body={SEARCH_EMPTY.unavailable.body}
            />
          )}
          {alerts.map((alert) => (
            <AlertCard
              key={alert.record_id}
              alert={alert}
              explaining={pendingRecordId === alert.record_id}
              explanationOpen={openRecordId === alert.record_id}
              explanation={explanation}
              onExplain={explain}
              onCloseExplanation={close}
            />
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
