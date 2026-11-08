export default function MetricCard({ label, value, note, accent = false, pending = false }) {
  return (
    <div className={accent ? "metric-card accent" : "metric-card"}>
      <span className="metric-label">{label}</span>
      {pending ? (
        <span className="skeleton-line skeleton-metric" aria-hidden="true" />
      ) : (
        <strong>{value}</strong>
      )}
      <small>{pending ? "" : note}</small>
    </div>
  );
}
