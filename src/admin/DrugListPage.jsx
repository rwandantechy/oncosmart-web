import AdminLayout from "../components/layout/AdminLayout";
import EmptyState from "../components/ui/EmptyState";
import ErrorBanner from "../components/ui/ErrorBanner";
import Panel from "../components/ui/Panel";
import { DRUGS } from "../content/drugs";
import { WORKSPACE_SECTIONS } from "../content/site";
import DrugFilters from "./drugs/DrugFilters";
import DrugTable from "./drugs/DrugTable";
import useDrugList from "./drugs/useDrugList";

export default function DrugListPage() {
  const list = useDrugList();
  const showEmpty = !list.loading && !list.error && list.shown === 0;

  return (
    <AdminLayout
      active={WORKSPACE_SECTIONS.drugs}
      icon={DRUGS.icon}
      title={DRUGS.title}
      warning={DRUGS.warning}
    >
      <Panel id={DRUGS.panel.id} eyebrow={DRUGS.panel.eyebrow} title={DRUGS.panel.title} note={DRUGS.panel.note}>
        {list.error ? <ErrorBanner message={list.error} /> : null}

        <DrugFilters
          q={list.q}
          letter={list.letter}
          letters={list.letters}
          hasFilters={list.hasFilters}
          onSearch={list.setQ}
          onLetter={list.setLetter}
          onClear={list.clearFilters}
        />

        <div className="drug-list-meta">
          <p>
            {DRUGS.countLabel
              .replace("{shown}", String(list.shown))
              .replace("{total}", String(list.total))}
          </p>
          {list.sourceUrl ? (
            <a href={list.sourceUrl} target="_blank" rel="noopener noreferrer">
              {DRUGS.sourceLabel}
            </a>
          ) : null}
        </div>

        {showEmpty ? <EmptyState title={DRUGS.empty} /> : null}
        {!showEmpty ? <DrugTable drugs={list.drugs} loading={list.loading} /> : null}
      </Panel>
    </AdminLayout>
  );
}
