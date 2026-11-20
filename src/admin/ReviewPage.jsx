import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import EmptyState from "../components/ui/EmptyState";
import ErrorBanner from "../components/ui/ErrorBanner";
import IconButton from "../components/ui/IconButton";
import { REVIEW } from "../content/review";
import { WORKSPACE_SECTIONS } from "../content/site";
import RecordDetailDrawer from "./records/RecordDetailDrawer";
import ReviewTable from "./review/ReviewTable";
import useReviewQueue from "./review/useReviewQueue";

export default function ReviewPage() {
  const queue = useReviewQueue();
  const [selected, setSelected] = useState(null);

  async function runAction(action) {
    if (!selected) return;
    const ok = await action(selected.record_id);
    if (ok) setSelected(null);
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
          <p className="review-count" aria-live="polite">
            {queue.loading ? REVIEW.busyLabel : REVIEW.count(queue.total)}
          </p>
        </div>
        {!queue.loading && queue.total === 0 ? (
          <EmptyState icon="check" title={REVIEW.empty.title} body={REVIEW.empty.body} />
        ) : (
          <ReviewTable
            items={queue.items}
            loading={queue.loading}
            onOpen={setSelected}
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
            <div className="review-detail-actions">
              <IconButton
                name="check"
                label={queue.busyId ? REVIEW.busyLabel : REVIEW.approveLabel}
                onClick={() => runAction(queue.approve)}
                disabled={Boolean(queue.busyId)}
                showLabel
              />
              <IconButton
                name="close"
                className="icon-action danger"
                label={queue.busyId ? REVIEW.busyLabel : REVIEW.rejectLabel}
                onClick={() => runAction(queue.reject)}
                disabled={Boolean(queue.busyId)}
                showLabel
              />
              <button type="button" onClick={() => setSelected(null)}>
                {REVIEW.closeLabel}
              </button>
            </div>
          }
        />
      ) : null}
    </AdminLayout>
  );
}
