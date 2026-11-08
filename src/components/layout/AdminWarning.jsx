export default function AdminWarning({ strong, text, linkLabel, href }) {
  return (
    <div className="admin-warning">
      <strong>{strong}</strong>
      <span>{text}</span>
      <a href={href}>{linkLabel}</a>
    </div>
  );
}
