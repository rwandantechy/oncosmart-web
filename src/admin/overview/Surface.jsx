export default function Surface({
  eyebrow,
  title,
  note,
  action,
  children,
  className = "",
  bodyClassName = "",
  flush = false,
}) {
  return (
    <section className={`flex h-fit min-h-0 flex-col bg-white ${className}`}>
      {(eyebrow || title || note || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-[color:var(--admin-rule)] px-6 py-3">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="m-0 text-[0.68rem] font-medium text-[color:var(--admin-muted)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h3 className="m-0 text-[0.95rem] font-semibold tracking-[-0.02em] text-[color:var(--admin-ink)]">
                {title}
              </h3>
            ) : null}
            {note ? (
              <p className="m-0 mt-1 max-w-[42rem] text-[0.75rem] leading-5 text-[color:var(--admin-muted)]">
                {note}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0 pt-0.5">{action}</div> : null}
        </header>
      )}
      <div className={`min-h-0 ${flush ? "" : "px-6 py-3"} ${bodyClassName}`}>{children}</div>
    </section>
  );
}
