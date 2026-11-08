import { ASSETS } from "../../config/assets";
import { ROUTES } from "../../config/routes";
import { BRAND, SITE_NAV, SITE_NAV_LABEL } from "../../content/site";

export default function SiteHeader({ compact = false }) {
  const path = window.location.pathname;

  return (
    <header className={compact ? "compact-header" : ""}>
      <div className="container header-inner">
        <a className="site-brand" href={ROUTES.home} aria-label={BRAND.publicHomeLabel}>
          <img src={ASSETS.logo} alt={BRAND.publicName} />
        </a>
        <nav className="site-nav" aria-label={SITE_NAV_LABEL}>
          {SITE_NAV.map((link) => {
            const current = path === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={current ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
