import BarChart from "../../components/ui/BarChart";
import EmptyState from "../../components/ui/EmptyState";
import Panel from "../../components/ui/Panel";
import Skeleton from "../../components/ui/Skeleton";
import { MONTH_LABEL_OFFSET, TIMELINE_MONTHS_VISIBLE, SKELETON_LINES } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { FALLBACKS } from "../../content/common";
import { EMPTY_PANEL } from "../../content/states";

export default function TimelinePanel({ timeline, loading }) {
  const months = (timeline?.items || []).slice(-TIMELINE_MONTHS_VISIBLE);
  const chartItems = months.map((item) => ({
    id: item.month,
    value: item.records,
    label: item.month.slice(MONTH_LABEL_OFFSET),
  }));

  return (
    <Panel
      className="timeline-panel"
      eyebrow={OVERVIEW.timeline.eyebrow}
      title={OVERVIEW.timeline.title}
      note={OVERVIEW.timeline.note}
    >
      {loading ? (
        <Skeleton lines={SKELETON_LINES.panel} />
      ) : months.length ? (
        <>
          <BarChart items={chartItems} label={OVERVIEW.timeline.chartLabel} />
          <p className="chart-footnote">
            <strong>{timeline?.records_in_full_range ?? 0}</strong>
            {OVERVIEW.timeline.footnoteRange(
              timeline?.range_start || FALLBACKS.dash,
              timeline?.range_end || FALLBACKS.dash,
            )}
            <span>{OVERVIEW.timeline.footnoteNote}</span>
          </p>
        </>
      ) : (
        <EmptyState title={EMPTY_PANEL.timeline} />
      )}
    </Panel>
  );
}
