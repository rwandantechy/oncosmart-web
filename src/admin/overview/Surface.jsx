export default function Surface({
  eyebrow,
  title,
  note,
  action,
  children,
  className = "",
  bodyClassName = "",
}) {
  return (
    <section
      className={`flex min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-[0_1px_0_rgba(7,31,73,0.04)] ${className}`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-3.5 py-2.5">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="m-0 text-[0.65rem] font-semibold tracking-[0.08em] text-text-caption uppercase">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h3 className="m-0 text-[0.95rem] font-semibold tracking-tight text-heading">{title}</h3>
          ) : null}
          {note ? <p className="m-0 mt-0.5 text-[0.72rem] leading-snug text-muted">{note}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className={`min-h-0 flex-1 px-3.5 py-3 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
