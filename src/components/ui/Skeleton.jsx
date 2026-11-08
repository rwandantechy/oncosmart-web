export default function Skeleton({ lines = 3, className = "" }) {
  return (
    <div className={`skeleton ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} className="skeleton-line" />
      ))}
    </div>
  );
}
