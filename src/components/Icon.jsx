const ICON_PATHS = {
  overview: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  assistant: (
    <>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5a2.5 2.5 0 0 1-2.5 2.5H12l-3.5 3v-3h-1A2.5 2.5 0 0 1 5 11.5v-5Z" />
      <path d="m13.5 7 .55 1.45L15.5 9l-1.45.55L13.5 11l-.55-1.45L11.5 9l1.45-.55L13.5 7Z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.1l1.5-1.2-1.6-2.7-1.8.7a7 7 0 0 0-1.9-1.1L14.9 4h-3.2l-.2 2.1a7 7 0 0 0-1.9 1.1l-1.8-.7-1.6 2.7 1.5 1.2A7 7 0 0 0 7.6 12c0 .4 0 .7.1 1.1l-1.5 1.2 1.6 2.7 1.8-.7c.6.5 1.2.9 1.9 1.1l.2 2.1h3.2l.2-2.1a7 7 0 0 0 1.9-1.1l1.8.7 1.6-2.7-1.5-1.2c.1-.4.1-.7.1-1.1Z" />
    </>
  ),
  signout: (
    <>
      <path d="M10 5H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5" />
      <path d="m14 8 4 4-4 4M8 12h10" />
    </>
  ),
  external: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 9h16.4M3.8 15h16.4M12 3.5c2.1 2.3 3.1 5.1 3.1 8.5s-1 6.2-3.1 8.5c-2.1-2.3-3.1-5.1-3.1-8.5s1-6.2 3.1-8.5Z" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  send: (
    <>
      <path d="m5 12 14-7-7 14-2-5-5-2Z" />
      <path d="M10 14 19 5" />
    </>
  ),
  close: (
    <>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </>
  ),
  check: <path d="M5 12.5 9.5 17 19 7" />,
  warning: (
    <>
      <path d="M12 4 21 19H3L12 4Z" />
      <path d="M12 10v4" />
      <path d="M12 16.5h.01" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4.5L19 9.5a2.1 2.1 0 0 0 0-3L17.5 5a2.1 2.1 0 0 0-3 0L4 15.5V20Z" />
      <path d="M13.5 6.5 17.5 10.5" />
    </>
  ),
  trash: (
    <>
      <path d="M5 7h14" />
      <path d="M9 7V5h6v2" />
      <path d="M8 7l.7 12.1A1.5 1.5 0 0 0 10.2 20.5h3.6a1.5 1.5 0 0 0 1.5-1.4L16 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  restart: (
    <>
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 4v6h6" />
    </>
  ),
  stop: <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" />,
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.2 19.1H5.1V9.55h3.1V19.1ZM6.65 8.2A1.8 1.8 0 1 1 6.65 4.6a1.8 1.8 0 0 1 0 3.6ZM19.1 19.1h-3.1v-5.25c0-1.25-.45-2.1-1.55-2.1-.85 0-1.35.55-1.55 1.1-.1.2-.1.5-.1.8V19.1h-3.1s.05-9.05 0-10h3.1v1.4c.4-.65 1.15-1.55 2.8-1.55 2.05 0 3.6 1.35 3.6 4.25V19.1Z"
    />
  ),
  bluesky: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 11.55c-.9-1.75-3.35-5-5.6-6.6C4.05 3.35 3 4.05 3 5.8c0 .55.3 4.6.5 5.3.65 2.25 2.95 3 5.05 2.75-3.65.55-4.85 2.4-2.75 4.25 4 3.5 5.45-1.55 6.2-3.8.75 2.25 1.75 7.15 6.1 3.8 2-1.7.9-3.7-2.75-4.25 2.1.25 4.4-.5 5.05-2.75.2-.7.5-4.75.5-5.3 0-1.75-1.05-2.45-3.4-.85-2.25 1.6-4.7 4.85-5.6 6.6Z"
    />
  ),
};

const ICON_VARIANTS = {
  default: { className: "icon", strokeWidth: 2 },
  soft: { className: "icon", strokeWidth: 1.8 },
  menu: { className: "menu-icon", strokeWidth: 1.8 },
  chevron: { className: "account-chevron", strokeWidth: 2 },
  brand: { className: "icon", strokeWidth: 0 },
};

export default function Icon({ name, variant = "default", label }) {
  const { className, strokeWidth } = ICON_VARIANTS[variant];
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : "true"}
      aria-label={label}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
