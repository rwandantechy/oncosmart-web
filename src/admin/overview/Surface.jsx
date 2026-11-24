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
        <header className="flex items-start justify-between gap-4 border-b border-[#e4ebf0] px-6 py-3">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="m-0 text-[0.68rem] font-medium text-[#6a7f8f]">{eyebrow}</p>
            ) : null}
            {title ? (
              <h3 className="m-0 text-[0.95rem] font-semibold tracking-[-0.02em] text-[#0f2a4a]">
                {title}
              </h3>
            ) : null}
            {note ? (
              <p className="m-0 mt-1 max-w-[42rem] text-[0.75rem] leading-5 text-[#667988]">
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
