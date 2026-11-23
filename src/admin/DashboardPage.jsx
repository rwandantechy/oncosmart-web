import { useMemo, useRef, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import ErrorBanner from "../components/ui/ErrorBanner";
import { OVERVIEW } from "../content/admin";
import { WORKSPACE_SECTIONS } from "../content/site";
import CategoryBoard from "./overview/CategoryBoard";
import CommandBar from "./overview/CommandBar";
import CompletenessBoard from "./overview/CompletenessBoard";
import CountriesBoard from "./overview/CountriesBoard";
import KpiRibbon from "./overview/KpiRibbon";
import ProductsBoard from "./overview/ProductsBoard";
import ReviewRail from "./overview/ReviewRail";
import TimelineBoard from "./overview/TimelineBoard";
import RecordsReview from "./RecordsReview";
import useDashboardData from "./useDashboardData";

export default function DashboardPage() {
  const { data, error, loading } = useDashboardData();
  const [panelError, setPanelError] = useState("");
  const recordsRef = useRef(null);
  const { summary, dataset } = data;

  const lowestCompleteness = useMemo(() => {
    const items = data.completeness || [];
    if (!items.length) return null;
    return Math.min(
      ...items.map((item) => (item.total ? (item.valid / item.total) * 100 : 100)),
    );
  }, [data.completeness]);

  function filterRecords(patch) {
    recordsRef.current?.applyFilters(patch);
  }

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.overview}
      icon={OVERVIEW.icon}
      title={OVERVIEW.title}
      warning={OVERVIEW.warning}
    >
      <div className="flex flex-col gap-3">
        <ErrorBanner message={error || panelError} />

        <CommandBar
          summary={summary}
          dataset={dataset}
          pendingReview={data.pendingReview}
          loading={loading}
          onError={setPanelError}
        />

        <KpiRibbon
          summary={summary}
          pendingReview={data.pendingReview}
          lowestCompleteness={lowestCompleteness}
          loading={loading}
        />

        <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
          <div className="flex flex-col gap-3 xl:col-span-8">
            <TimelineBoard
              timeline={data.timeline}
              loading={loading}
              onSelectMonth={filterRecords}
            />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <CategoryBoard
                research={data.research}
                loading={loading}
                onSelectCategory={(category) => filterRecords({ q: category })}
              />
              <ProductsBoard
                products={data.research?.top_products}
                loading={loading}
                onSelectProduct={(product) => filterRecords({ q: product })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 xl:col-span-4">
            <ReviewRail pendingReview={data.pendingReview} loading={loading} />
            <CompletenessBoard items={data.completeness} loading={loading} />
            <CountriesBoard
              sources={data.sources}
              loading={loading}
              onSelectCountry={({ country, regulator }) =>
                filterRecords({
                  country: country || "",
                  regulator: country ? "" : regulator,
                })
              }
            />
          </div>
        </div>

        <RecordsReview ref={recordsRef} sources={data.sources} onError={setPanelError} />

        <DataScopeNote {...OVERVIEW.scope} />
      </div>
    </AdminLayout>
  );
}
