import { useState } from "react";
import { DOWNLOAD_STATES } from "../../config/ui";
import { ROUTES } from "../../config/routes";
import { OVERVIEW } from "../../content/admin";
import { FALLBACKS } from "../../content/common";
import { REVIEW } from "../../content/review";
import { FRESHNESS_STATUS } from "../../services/apiContract";
import { downloadReport } from "../../services/insightsService";
import { formatDate } from "../../utils/date";

function Meta({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="m-0 text-[0.65rem] font-semibold tracking-[0.06em] text-text-caption uppercase">
        {label}
      </dt>
      <dd className="m-0 truncate text-[0.82rem] font-semibold text-ink">{value}</dd>
    </div>
  );
}

export default function CommandBar({ summary, dataset, pendingReview, loading, onError }) {
  const [downloadState, setDownloadState] = useState(DOWNLOAD_STATES.idle);
  const copy = OVERVIEW.command;

  const statusValue =
    dataset?.freshness_status === FRESHNESS_STATUS.historicalSnapshot
      ? copy.historicalValue
      : dataset?.availability_status || FALLBACKS.dash;

  const coverage =
    summary?.earliest_publication || summary?.latest_publication
      ? `${formatDate(summary?.earliest_publication)} – ${formatDate(summary?.latest_publication)}`
      : FALLBACKS.dash;

  function download() {
    setDownloadState(DOWNLOAD_STATES.working);
    downloadReport({ defaultError: copy.downloadError })
      .then(() => setDownloadState(DOWNLOAD_STATES.done))
      .catch((error) => {
        setDownloadState(DOWNLOAD_STATES.failed);
        onError?.(error.message);
      });
  }

  const downloadLabel = {
    [DOWNLOAD_STATES.idle]: copy.downloadLabel,
    [DOWNLOAD_STATES.working]: copy.downloadingLabel,
    [DOWNLOAD_STATES.done]: copy.downloadedLabel,
    [DOWNLOAD_STATES.failed]: copy.downloadRetryLabel,
  }[downloadState];

  return (
    <section
      className="rounded-lg border border-slate-200/90 bg-gradient-to-br from-navy to-navy-soft px-3.5 py-3 text-white shadow-[0_8px_24px_rgba(7,31,73,0.18)]"
      aria-label={copy.regionLabel}
      aria-busy={loading}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 xl:grid-cols-5">
          <Meta label={copy.collection} value={formatDate(summary?.latest_collection)} />
          <Meta label={copy.imported} value={formatDate(dataset?.imported_at)} />
          <Meta label={copy.publication} value={formatDate(summary?.latest_publication)} />
          <Meta label={copy.coverage} value={coverage} />
          <Meta
            label={copy.status}
            value={loading ? FALLBACKS.dash : statusValue || copy.pendingNote}
          />
        </dl>
        <div className="flex flex-wrap items-center gap-2">
          {pendingReview > 0 ? (
            <a
              href={ROUTES.adminReview}
              className="inline-flex items-center rounded-md bg-teal px-3 py-1.5 text-[0.78rem] font-semibold text-white no-underline transition hover:bg-teal-pressed"
            >
              {REVIEW.overviewNote(pendingReview)}
            </a>
          ) : (
            <span className="rounded-md bg-white/10 px-3 py-1.5 text-[0.78rem] text-text-sidebar">
              {copy.reviewClear}
            </span>
          )}
          <button
            type="button"
            onClick={download}
            disabled={downloadState === DOWNLOAD_STATES.working}
            className="inline-flex items-center rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-[0.78rem] font-semibold text-white transition hover:bg-white/20 disabled:opacity-60"
          >
            {downloadLabel}
          </button>
        </div>
      </div>
      <p className="m-0 mt-2.5 text-[0.72rem] text-text-sidebar">{copy.drillHint}</p>
    </section>
  );
}
