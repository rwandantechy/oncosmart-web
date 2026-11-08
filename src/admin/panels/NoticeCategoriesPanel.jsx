import { useState } from "react";
import Icon from "../../components/Icon";
import EmptyState from "../../components/ui/EmptyState";
import Panel from "../../components/ui/Panel";
import ProgressTrack from "../../components/ui/ProgressTrack";
import Skeleton from "../../components/ui/Skeleton";
import { DOWNLOAD_STATES, SKELETON_LINES } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { downloadReport } from "../../services/insightsService";
import { highestValue } from "../../utils/chart";

export default function NoticeCategoriesPanel({ research, loading, onError }) {
  const [downloadState, setDownloadState] = useState(DOWNLOAD_STATES.idle);
  const categories = research?.notice_categories || [];
  const highest = highestValue(categories, "records");
  const copy = OVERVIEW.categories;

  const download = () => {
    setDownloadState(DOWNLOAD_STATES.working);
    downloadReport({ defaultError: copy.downloadError })
      .then(() => setDownloadState(DOWNLOAD_STATES.done))
      .catch((error) => {
        setDownloadState(DOWNLOAD_STATES.failed);
        onError?.(error.message);
      });
  };

  const downloadLabel = {
    [DOWNLOAD_STATES.idle]: copy.downloadLabel,
    [DOWNLOAD_STATES.working]: copy.downloadingLabel,
    [DOWNLOAD_STATES.done]: copy.downloadedLabel,
    [DOWNLOAD_STATES.failed]: copy.downloadRetryLabel,
  }[downloadState];

  const downloadButton = (
    <button
      className="download-link"
      type="button"
      onClick={download}
      disabled={downloadState === DOWNLOAD_STATES.working}
      aria-busy={downloadState === DOWNLOAD_STATES.working}
    >
      {downloadLabel}{" "}
      <Icon name={downloadState === DOWNLOAD_STATES.done ? "check" : "download"} />
    </button>
  );

  return (
    <Panel eyebrow={copy.eyebrow} title={copy.title} action={downloadButton}>
      {loading ? (
        <Skeleton lines={SKELETON_LINES.panel} />
      ) : categories.length ? (
        <>
          <div className="category-list">
            {categories.map((item) => (
              <div className="category-row" key={item.category}>
                <div>
                  <strong>{item.category}</strong>
                  <small>{copy.recordCount(item.records)}</small>
                </div>
                <ProgressTrack className="category-track" value={item.records} total={highest} />
              </div>
            ))}
          </div>
          <p className="chart-footnote">{research?.method_note}</p>
        </>
      ) : (
        <EmptyState title={EMPTY_PANEL.categories} />
      )}
    </Panel>
  );
}
