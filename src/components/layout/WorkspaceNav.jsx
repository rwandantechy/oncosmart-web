import { WORKSPACE_NAV, WORKSPACE_NAV_LABEL } from "../../content/site";
import Icon from "../Icon";

export default function WorkspaceNav({ active }) {
  return (
    <nav className="workspace-nav" aria-label={WORKSPACE_NAV_LABEL}>
      {WORKSPACE_NAV.map((item) =>
        item.type === "section" ? (
          <p
            key={item.label}
            className={item.spaced ? "sidebar-label sidebar-section-label" : "sidebar-label"}
          >
            {item.label}
          </p>
        ) : (
          <a
            key={item.id}
            className={[
              "side-link",
              item.bar === false && "side-link-extra",
              active === item.id && "active",
            ]
              .filter(Boolean)
              .join(" ")}
            href={item.href}
            aria-current={active === item.id ? "page" : undefined}
          >
            <Icon name={item.icon} variant="menu" />
            <span className="side-link-wide">{item.label}</span>
            <span className="side-link-narrow">{item.compactLabel || item.label}</span>
          </a>
        ),
      )}
    </nav>
  );
}
