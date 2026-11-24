import { ROUTES } from "../../config/routes";
import { OVERVIEW } from "../../content/admin";
import Surface from "./Surface";

export default function ReviewRail({ pendingReview, loading }) {
  const waiting = pendingReview > 0;

  return (
    <Surface eyebrow={OVERVIEW.reviewRail.eyebrow} title={OVERVIEW.reviewRail.title}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="m-0 text-[2rem] font-semibold tracking-[-0.04em] tabular-nums leading-none text-[color:var(--admin-ink)]">
            {loading ? "—" : pendingReview}
          </p>
          <p className="m-0 mt-2 text-[0.75rem] text-[color:var(--admin-muted)]">
            {waiting
              ? OVERVIEW.reviewRail.count(pendingReview)
              : OVERVIEW.reviewRail.empty}
          </p>
        </div>
        <a
          href={ROUTES.adminReview}
          className={`inline-flex h-8 items-center rounded-[3px] px-3 text-[0.75rem] font-semibold no-underline ${
            waiting
              ? "bg-[color:var(--admin-ink)] text-white hover:bg-[color:var(--admin-ink-soft)]"
              : "border border-[color:var(--color-border-control)] text-[color:var(--admin-ink)] hover:border-[color:var(--admin-ink-soft)]"
          }`}
        >
          {OVERVIEW.reviewRail.cta}
        </a>
      </div>
    </Surface>
  );
}
