import Icon from "../Icon";

export default function EmptyState({ icon, title, body, action, tone = "idle" }) {
  return (
    <div className={`empty-state empty-state-${tone}`} role={tone === "error" ? "alert" : "status"}>
      {icon ? <Icon name={icon} /> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {action}
    </div>
  );
}
