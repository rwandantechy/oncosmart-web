export default function Panel({ id, className = "", eyebrow, title, note, action, children }) {
  return (
    <section id={id} className={`panel ${className}`.trim()}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {note && <span className="panel-note">{note}</span>}
        {action}
      </div>
      {children}
    </section>
  );
}
