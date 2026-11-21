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
import ReviewEditForm from "./review/ReviewEditForm";
import ReviewFilters from "./review/ReviewFilters";
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

  async function saveEdits(fields) {
    if (!selected?.record_id || queue.busyId) return;
    const updated = await queue.save(selected.record_id, fields);
    if (updated) setSelected(updated);
  }

  const emptyCopy = queue.hasFilters ? REVIEW.emptyFiltered : REVIEW.empty;
  const showEmpty = !queue.loading && queue.total === 0;

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
              {queue.loading
                ? REVIEW.busyLabel
                : REVIEW.count(queue.total, queue.hasFilters)}
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
        {queue.queueTotal > 0 || queue.hasFilters ? (
          <ReviewFilters
            filters={queue.filters}
            countries={queue.countries}
            regulators={queue.regulators}
            issues={queue.issues}
            hasFilters={queue.hasFilters}
            onChange={queue.updateFilter}
            onClear={queue.clearFilters}
          />
        ) : null}
        {showEmpty ? (
          <EmptyState icon="check" title={emptyCopy.title} body={emptyCopy.body} />
        ) : (
          <ReviewTable
            items={queue.items}
            loading={queue.loading}
            busyId={queue.busyId}
            onOpen={setSelected}
            onApprove={(id) => runAction(queue.approve, id)}
            onReject={(id) => runAction(queue.reject, id)}
            onDelete={(id) => runAction(queue.remove, id)}
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
            <>
              <ReviewActions
                busy={Boolean(queue.busyId)}
                note={REVIEW.matchNote}
                showClose
                showDelete
                onApprove={() => runAction(queue.approve, selected.record_id)}
                onReject={() => runAction(queue.reject, selected.record_id)}
                onDelete={() => runAction(queue.remove, selected.record_id)}
                onClose={() => setSelected(null)}
              />
              <ReviewEditForm
                record={selected}
                busy={Boolean(queue.busyId)}
                onSave={saveEdits}
              />
            </>
          }
        />
      ) : null}
    </AdminLayout>
  );
}
