import { SKIP_LINK } from "../../content/states";

export default function SkipLink() {
  return (
    <a className="skip-link" href={SKIP_LINK.href}>
      {SKIP_LINK.label}
    </a>
  );
}
