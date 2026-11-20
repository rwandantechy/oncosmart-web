import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import EmptyState from "../components/ui/EmptyState";
import ErrorBanner from "../components/ui/ErrorBanner";
import { REVIEW } from "../content/review";
import { WORKSPACE_SECTIONS } from "../content/site";
import ReviewTable from "./review/ReviewTable";
import useReviewQueue from "./review/useReviewQueue";

export default function ReviewPage() {
  const queue = useReviewQueue();

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
            busyId={queue.busyId}
            onApprove={queue.approve}
            onReject={queue.reject}
          />
        )}
      </section>
      <DataScopeNote {...REVIEW.scope} />
    </AdminLayout>
  );
}
