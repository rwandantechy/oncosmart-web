import { forwardRef, useImperativeHandle, useRef } from "react";
import Icon from "../components/Icon";
import Pagination from "../components/ui/Pagination";
import { RECORDS_REVIEW } from "../content/admin";
import { uniqueValues } from "../utils/text";
import Surface from "./overview/Surface";
import RecordDetailDrawer from "./records/RecordDetailDrawer";
import RecordsFilters from "./records/RecordsFilters";
import RecordsTable from "./records/RecordsTable";
import useRecordsReview from "./records/useRecordsReview";

const RecordsReview = forwardRef(function RecordsReview({ sources, onError }, ref) {
  const shellRef = useRef(null);
  const review = useRecordsReview({ onError });

  useImperativeHandle(
    ref,
    () => ({
      applyFilters(patch) {
        review.applyFilters(patch);
        shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }),
    [review.applyFilters],
  );

  const searchAllLink = (
    <a
      className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-blue no-underline hover:text-blue-hover"
      href={RECORDS_REVIEW.searchAllHref}
    >
      {RECORDS_REVIEW.searchAllLabel} <Icon name="arrowRight" />
    </a>
  );

  return (
    <div ref={shellRef} className="bg-white">
      <Surface
        eyebrow={RECORDS_REVIEW.eyebrow}
        title={RECORDS_REVIEW.title}
        action={searchAllLink}
        bodyClassName="space-y-3"
      >
        <RecordsFilters
          filters={review.filters}
          countries={uniqueValues(sources, "country_in_source_record")}
          regulators={uniqueValues(sources, "reporting_regulator")}
          hasFilters={review.hasFilters}
          onChange={review.updateFilter}
          onClear={review.clearFilters}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-[0.8rem] text-text-table" aria-live="polite">
            {review.loading
              ? RECORDS_REVIEW.updatingLabel
              : RECORDS_REVIEW.recordCount(review.total, review.hasFilters)}
          </div>
          {review.total > 0 ? (
            <span className="text-[0.75rem] text-muted">
              {RECORDS_REVIEW.pageRange(review.firstRecord, review.lastRecord, review.total)}
            </span>
          ) : null}
        </div>
        <RecordsTable
          records={review.records}
          loading={review.loading}
          onOpen={review.openRecord}
        />
        <Pagination
          page={review.page}
          pageCount={review.pageCount}
          onChange={review.setPage}
          labels={RECORDS_REVIEW.pagination}
        />
      </Surface>
      {review.selectedRecord ? (
        <RecordDetailDrawer
          record={review.selectedRecord}
          loading={review.detailLoading}
          onClose={review.closeRecord}
        />
      ) : null}
    </div>
  );
});

export default RecordsReview;
