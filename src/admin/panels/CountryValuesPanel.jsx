import EmptyState from "../../components/ui/EmptyState";
import Panel from "../../components/ui/Panel";
import ProgressTrack from "../../components/ui/ProgressTrack";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { highestValue } from "../../utils/chart";
import { withFallback } from "../../utils/text";

export default function CountryValuesPanel({ sources = [], loading }) {
  const highest = highestValue(sources, "records");

  return (
    <Panel
      eyebrow={OVERVIEW.countries.eyebrow}
      title={OVERVIEW.countries.title}
      note={OVERVIEW.countries.note}
    >
      {loading ? (
        <Skeleton lines={SKELETON_LINES.panel} />
      ) : sources.length ? (
        <div className="source-list">
          {sources.map((source) => (
            <div
              className="source-row"
              key={`${source.reporting_regulator}-${source.country_in_source_record}`}
            >
              <div className="source-name">
                <span>{withFallback(source.country_in_source_record)}</span>
                <small>{OVERVIEW.countries.publishedBy(source.reporting_regulator)}</small>
              </div>
              <strong>{source.records}</strong>
              <ProgressTrack className="source-track" value={source.records} total={highest} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={EMPTY_PANEL.countries} />
      )}
    </Panel>
  );
}
