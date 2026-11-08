import EmptyState from "../../components/ui/EmptyState";
import Panel from "../../components/ui/Panel";
import ProgressTrack from "../../components/ui/ProgressTrack";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";
import { humanizeFieldName } from "../../utils/text";

export default function CompletenessPanel({ items = [], loading }) {
  return (
    <Panel
      className="completeness-panel"
      eyebrow={OVERVIEW.completeness.eyebrow}
      title={OVERVIEW.completeness.title}
      note={OVERVIEW.completeness.note}
    >
      {loading ? (
        <Skeleton lines={SKELETON_LINES.panel} />
      ) : items.length ? (
        <div className="completeness-grid">
          {items.map((item) => (
            <div className="completeness-item" key={item.field}>
              <div>
                <strong>{humanizeFieldName(item.field)}</strong>
                <span>{OVERVIEW.completeness.ratio(item.valid, item.total)}</span>
              </div>
              <ProgressTrack className="quality-track" value={item.valid} total={item.total} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={EMPTY_PANEL.completeness} />
      )}
    </Panel>
  );
}
