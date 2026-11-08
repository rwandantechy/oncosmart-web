import { ROUTES } from "../../config/routes";
import { BREADCRUMB } from "../../content/states";

export default function PageBreadcrumb({ current }) {
  return (
    <nav className="page-breadcrumb" aria-label={BREADCRUMB.label}>
      <a href={ROUTES.home}>{BREADCRUMB.home}</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
