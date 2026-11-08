import Icon from "../components/Icon";
import Pagination from "../components/ui/Pagination";
import Panel from "../components/ui/Panel";
import { RECORDS_REVIEW } from "../content/admin";
import { uniqueValues } from "../utils/text";
import RecordDetailDrawer from "./records/RecordDetailDrawer";
import RecordsFilters from "./records/RecordsFilters";
import RecordsTable from "./records/RecordsTable";
import useRecordsReview from "./records/useRecordsReview";

export default function RecordsReview({ sources, onError }) {
  const review = useRecordsReview({ onError });

  const searchAllLink = (
    <a className="download-link" href={RECORDS_REVIEW.searchAllHref}>
      {RECORDS_REVIEW.searchAllLabel} <Icon name="arrowRight" />
    </a>
  );

  return (
    <Panel
      className="recent-panel"
      eyebrow={RECORDS_REVIEW.eyebrow}
      title={RECORDS_REVIEW.title}
      action={searchAllLink}
    >
      <RecordsFilters
        filters={review.filters}
        countries={uniqueValues(sources, "country_in_source_record")}
        regulators={uniqueValues(sources, "reporting_regulator")}
        hasFilters={review.hasFilters}
        onChange={review.updateFilter}
        onClear={review.clearFilters}
      />
      <div className="record-toolbar">
        <div className="record-count" aria-live="polite">
          {review.loading
            ? RECORDS_REVIEW.updatingLabel
            : RECORDS_REVIEW.recordCount(review.total, review.hasFilters)}
        </div>
        {review.total > 0 && (
          <span className="page-range">
            {RECORDS_REVIEW.pageRange(review.firstRecord, review.lastRecord, review.total)}
          </span>
        )}
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
      {review.selectedRecord && (
        <RecordDetailDrawer
          record={review.selectedRecord}
          loading={review.detailLoading}
          onClose={review.closeRecord}
        />
      )}
    </Panel>
  );
}
