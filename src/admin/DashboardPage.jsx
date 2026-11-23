import { useMemo, useRef, useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import DataScopeNote from "../components/layout/DataScopeNote";
import ErrorBanner from "../components/ui/ErrorBanner";
import { OVERVIEW } from "../content/admin";
import { WORKSPACE_SECTIONS } from "../content/site";
import CategoryBoard from "./overview/CategoryBoard";
import CommandBar from "./overview/CommandBar";
import CompletenessBoard from "./overview/CompletenessBoard";
import GeographyBoard from "./overview/GeographyBoard";
import KpiRibbon from "./overview/KpiRibbon";
import ProductsBoard from "./overview/ProductsBoard";
import ReviewRail from "./overview/ReviewRail";
import TimelineBoard from "./overview/TimelineBoard";
import RecordsReview from "./RecordsReview";
import useDashboardData from "./useDashboardData";

export default function DashboardPage() {
  const { data, error, loading } = useDashboardData();
  const [panelError, setPanelError] = useState("");
  const [mapCountry, setMapCountry] = useState("");
  const recordsRef = useRef(null);
  const { summary, dataset } = data;

  const countryCounts = useMemo(() => {
    const totals = new Map();
    (data.sources || []).forEach((row) => {
      const country = row.country_in_source_record;
      if (!country) return;
      totals.set(country, (totals.get(country) || 0) + row.records);
    });
    return [...totals.entries()]
      .map(([country, records]) => ({ country, records }))
      .sort((a, b) => b.records - a.records);
  }, [data.sources]);

  const lowestCompleteness = useMemo(() => {
    const items = data.completeness || [];
    if (!items.length) return null;
    return Math.min(
      ...items.map((item) => (item.total ? (item.valid / item.total) * 100 : 100)),
    );
  }, [data.completeness]);

  function filterRecords(patch) {
    if (Object.prototype.hasOwnProperty.call(patch, "country")) {
      setMapCountry(patch.country || "");
    } else if (Object.keys(patch).length) {
      setMapCountry("");
    }
    recordsRef.current?.applyFilters(patch);
  }

  function selectCountry(country) {
    filterRecords({ country: country || "" });
  }

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.overview}
      icon={OVERVIEW.icon}
      title={OVERVIEW.title}
      warning={OVERVIEW.warning}
    >
      <div className="flex flex-col gap-4">
        <ErrorBanner message={error || panelError} />

        <div className="overview-board overflow-hidden border border-[#d5e0e8] bg-[#d5e0e8]">
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

          <div className="grid grid-cols-1 gap-px xl:grid-cols-12 xl:items-start">
            <div className="flex flex-col gap-px xl:col-span-7">
              <TimelineBoard
                timeline={data.timeline}
                loading={loading}
                onSelectMonth={(range) => filterRecords(range)}
              />
              <GeographyBoard
                countries={countryCounts}
                sources={data.sources}
                loading={loading}
                selectedCountry={mapCountry}
                onSelectCountry={selectCountry}
              />
            </div>

            <div className="flex flex-col gap-px xl:col-span-5">
              <ReviewRail pendingReview={data.pendingReview} loading={loading} />
              <CompletenessBoard items={data.completeness} loading={loading} />
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

          <div className="border-t border-[#d5e0e8]">
            <RecordsReview ref={recordsRef} sources={data.sources} onError={setPanelError} />
          </div>
        </div>

        <DataScopeNote {...OVERVIEW.scope} />
      </div>
    </AdminLayout>
  );
}
