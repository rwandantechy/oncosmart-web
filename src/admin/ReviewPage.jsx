import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import EmptyState from "../components/ui/EmptyState";
import ErrorBanner from "../components/ui/ErrorBanner";
import IconButton from "../components/ui/IconButton";
import { REVIEW } from "../content/review";
import { WORKSPACE_SECTIONS } from "../content/site";
import RecordDetailDrawer from "./records/RecordDetailDrawer";
import ReviewActions from "./review/ReviewActions";
import ReviewTable from "./review/ReviewTable";
import useReviewQueue from "./review/useReviewQueue";

export default function ReviewPage() {
  const queue = useReviewQueue();
  const [selected, setSelected] = useState(null);

  async function runAction(action, recordId) {
    const id = recordId || selected?.record_id;
    if (!id || queue.busyId) return;
    const ok = await action(id);
    if (ok && selected?.record_id === id) setSelected(null);
  }

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.review}
      icon={REVIEW.icon}
      title={REVIEW.title}
      warning={REVIEW.warning}
    >
      <ErrorBanner message={queue.error} />
      <section className="review-page">
        <div className="review-hero">
          <div>
            <h2>{REVIEW.hero.heading}</h2>
            <p>{REVIEW.hero.intro}</p>
          </div>
          <div className="review-hero-meta">
            <p className="review-count" aria-live="polite">
              {queue.loading ? REVIEW.busyLabel : REVIEW.count(queue.total)}
            </p>
            <IconButton
              name="restart"
              label={REVIEW.refreshLabel}
              onClick={() => queue.reload()}
              disabled={queue.loading || Boolean(queue.busyId)}
              showLabel
            />
          </div>
        </div>
        {!queue.loading && queue.total === 0 ? (
          <EmptyState icon="check" title={REVIEW.empty.title} body={REVIEW.empty.body} />
        ) : (
          <ReviewTable
            items={queue.items}
            loading={queue.loading}
            busyId={queue.busyId}
            onOpen={setSelected}
            onApprove={(id) => runAction(queue.approve, id)}
            onReject={(id) => runAction(queue.reject, id)}
          />
        )}
      </section>
      <DataScopeNote {...REVIEW.scope} />
      {selected ? (
        <RecordDetailDrawer
          record={selected}
          eyebrow={REVIEW.detailEyebrow}
          issues={(selected.validation_errors || []).map((issue) => REVIEW.issueLabel(issue))}
          issuesHeading={REVIEW.issuesHeading}
          onClose={() => setSelected(null)}
          actions={
            <ReviewActions
              busy={Boolean(queue.busyId)}
              note={REVIEW.matchNote}
              showClose
              onApprove={() => runAction(queue.approve, selected.record_id)}
              onReject={() => runAction(queue.reject, selected.record_id)}
              onClose={() => setSelected(null)}
            />
          }
        />
      ) : null}
    </AdminLayout>
  );
}
