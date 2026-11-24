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
      <dt className="m-0 text-[0.68rem] font-medium text-[#6a7f8f]">{label}</dt>
      <dd className="m-0 mt-0.5 truncate text-[0.84rem] font-semibold tabular-nums text-[#0f2a4a]">
        {value}
      </dd>
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
      className="border-b border-[#e4ebf0] bg-white px-6 py-3"
      aria-label={copy.regionLabel}
      aria-busy={loading}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <dl className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 xl:grid-cols-5">
          <Meta label={copy.collection} value={formatDate(summary?.latest_collection)} />
          <Meta label={copy.imported} value={formatDate(dataset?.imported_at)} />
          <Meta label={copy.publication} value={formatDate(summary?.latest_publication)} />
          <Meta label={copy.coverage} value={coverage} />
          <Meta
            label={copy.status}
            value={loading ? FALLBACKS.dash : statusValue || copy.pendingNote}
          />
        </dl>
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          {pendingReview > 0 ? (
            <a
              href={ROUTES.adminReview}
              className="inline-flex h-8 items-center rounded-[3px] bg-[#0f2a4a] px-3 text-[0.75rem] font-semibold text-white no-underline hover:bg-[#183e6b]"
            >
              {REVIEW.overviewNote(pendingReview)}
            </a>
          ) : null}
          <button
            type="button"
            onClick={download}
            disabled={downloadState === DOWNLOAD_STATES.working}
            className="inline-flex h-8 items-center rounded-[3px] border border-[#c9d6e0] bg-white px-3 text-[0.75rem] font-semibold text-[#0f2a4a] hover:border-[#245c91] hover:text-[#245c91] disabled:opacity-60"
          >
            {downloadLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
