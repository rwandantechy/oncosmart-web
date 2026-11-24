import { WORKSPACE_NAV_GROUPS, WORKSPACE_NAV_LABEL } from "../../content/site";
import Icon from "../Icon";

function NavLink({ item, active }) {
  const isActive = active === item.id;

  return (
    <a
      className={[
        "side-link",
        isActive && "is-active",
        item.external && "side-link--open",
      ]
        .filter(Boolean)
        .join(" ")}
      href={item.href}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon name={item.icon} variant="menu" />
      <span className="side-link-label">
        <span className="side-link-wide">{item.label}</span>
        <span className="side-link-narrow">{item.compactLabel || item.label}</span>
      </span>
    </a>
  );
}

export default function WorkspaceNav({ active }) {
  return (
    <nav className="workspace-nav" aria-label={WORKSPACE_NAV_LABEL}>
      {WORKSPACE_NAV_GROUPS.map((group) => (
        <section
          key={group.id}
          className={`nav-group nav-group--${group.tier}`}
          aria-labelledby={`nav-group-${group.id}`}
        >
          <h2 className="nav-group-label" id={`nav-group-${group.id}`}>
            {group.label}
          </h2>
          <ul className="nav-group-list">
            {group.items.map((item) => (
              <li key={item.id}>
                <NavLink item={item} active={active} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
