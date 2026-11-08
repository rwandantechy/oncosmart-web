import EmptyState from "../../components/ui/EmptyState";
import Panel from "../../components/ui/Panel";
import Skeleton from "../../components/ui/Skeleton";
import { SKELETON_LINES, TOP_PRODUCTS_VISIBLE } from "../../config/ui";
import { OVERVIEW } from "../../content/admin";
import { EMPTY_PANEL } from "../../content/states";

export default function TopProductsPanel({ products, loading }) {
  const items = (products || []).slice(0, TOP_PRODUCTS_VISIBLE);

  return (
    <Panel eyebrow={OVERVIEW.products.eyebrow} title={OVERVIEW.products.title}>
      {loading ? (
        <Skeleton lines={SKELETON_LINES.panel} />
      ) : items.length ? (
        <ol className="ranked-list">
          {items.map((item) => (
            <li key={item.product}>
              <span>{item.product}</span>
              <strong>{item.records}</strong>
            </li>
          ))}
        </ol>
      ) : (
        <EmptyState title={EMPTY_PANEL.products} />
      )}
    </Panel>
  );
}
