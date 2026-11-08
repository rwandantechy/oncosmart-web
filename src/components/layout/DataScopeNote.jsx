export default function DataScopeNote({ id, title, text }) {
  return (
    <section id={id} className="data-scope">
      <strong>{title}</strong>
      <span>{text}</span>
    </section>
  );
}
