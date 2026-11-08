import { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import ErrorBanner from "../components/ui/ErrorBanner";
import MetricCard from "../components/ui/MetricCard";
import { OVERVIEW } from "../content/admin";
import { FALLBACKS } from "../content/common";
import { WORKSPACE_SECTIONS } from "../content/site";
import { FRESHNESS_STATUS } from "../services/apiContract";
import { formatDate } from "../utils/date";
import RecordsReview from "./RecordsReview";
import CompletenessPanel from "./panels/CompletenessPanel";
import CountryValuesPanel from "./panels/CountryValuesPanel";
import NoticeCategoriesPanel from "./panels/NoticeCategoriesPanel";
import TimelinePanel from "./panels/TimelinePanel";
import TopProductsPanel from "./panels/TopProductsPanel";
import useDashboardData from "./useDashboardData";

export default function DashboardPage() {
  const { data, error, loading } = useDashboardData();
  const [panelError, setPanelError] = useState("");
  const { summary, dataset } = data;

  const statusValue =
    dataset?.freshness_status === FRESHNESS_STATUS.historicalSnapshot
      ? OVERVIEW.metrics.status.historicalValue
      : dataset?.availability_status || FALLBACKS.dash;

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.overview}
      icon={OVERVIEW.icon}
      title={OVERVIEW.title}
      warning={OVERVIEW.warning}
    >
      <ErrorBanner message={error || panelError} />
      <section className="metric-grid" aria-label={OVERVIEW.metrics.regionLabel} aria-busy={loading}>
        {OVERVIEW.metrics.cards.map((card) => (
          <MetricCard
            key={card.key}
            label={card.label}
            value={summary?.[card.key] ?? FALLBACKS.dash}
            note={card.note}
            pending={loading}
          />
        ))}
        <MetricCard
          accent
          label={OVERVIEW.metrics.status.label}
          value={statusValue}
          note={dataset?.availability_status || OVERVIEW.metrics.status.pendingNote}
          pending={loading}
        />
      </section>
      <div className="dashboard-grid">
        <TimelinePanel timeline={data.timeline} loading={loading} />
        <CountryValuesPanel sources={data.sources} loading={loading} />
      </div>
      <CompletenessPanel items={data.completeness} loading={loading} />
      <section className="research-grid">
        <NoticeCategoriesPanel
          research={data.research}
          loading={loading}
          onError={setPanelError}
        />
        <TopProductsPanel products={data.research?.top_products} loading={loading} />
      </section>
      <RecordsReview sources={data.sources} onError={setPanelError} />
      <DataScopeNote {...OVERVIEW.scope} />
      <p className="admin-footnote">
        {OVERVIEW.footnote(
          formatDate(summary?.latest_collection),
          formatDate(dataset?.imported_at),
          formatDate(summary?.latest_publication),
        )}
      </p>
    </AdminLayout>
  );
}
