import { ROUTES } from "../../config/routes";
import { OVERVIEW } from "../../content/admin";
import Surface from "./Surface";

export default function ReviewRail({ pendingReview, loading }) {
  const waiting = pendingReview > 0;

  return (
    <Surface
      eyebrow={OVERVIEW.reviewRail.eyebrow}
      title={OVERVIEW.reviewRail.title}
      className={waiting ? "border-teal/35 ring-1 ring-teal/15" : ""}
      bodyClassName="flex flex-col gap-3"
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="m-0 text-[1.75rem] font-semibold tracking-tight tabular-nums text-navy">
            {loading ? "—" : pendingReview}
          </p>
          <p className="m-0 text-[0.75rem] text-muted">
            {waiting
              ? OVERVIEW.reviewRail.count(pendingReview)
              : OVERVIEW.reviewRail.empty}
          </p>
        </div>
        <a
          href={ROUTES.adminReview}
          className={`inline-flex items-center rounded-md px-3 py-1.5 text-[0.78rem] font-semibold no-underline transition ${
            waiting
              ? "bg-teal text-white hover:bg-teal-pressed"
              : "border border-slate-200 bg-slate-50 text-text-action hover:bg-white"
          }`}
        >
          {OVERVIEW.reviewRail.cta}
        </a>
      </div>
    </Surface>
  );
}
