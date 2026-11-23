import { ROUTES } from "../../config/routes";
import { OVERVIEW } from "../../content/admin";
import Surface from "./Surface";

export default function ReviewRail({ pendingReview, loading }) {
  const waiting = pendingReview > 0;

  return (
    <Surface eyebrow={OVERVIEW.reviewRail.eyebrow} title={OVERVIEW.reviewRail.title}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="m-0 text-[2rem] font-semibold tracking-[-0.04em] tabular-nums leading-none text-[#0f2a4a]">
            {loading ? "—" : pendingReview}
          </p>
          <p className="m-0 mt-2 text-[0.75rem] text-[#667988]">
            {waiting
              ? OVERVIEW.reviewRail.count(pendingReview)
              : OVERVIEW.reviewRail.empty}
          </p>
        </div>
        <a
          href={ROUTES.adminReview}
          className={`inline-flex h-8 items-center rounded-[3px] px-3 text-[0.75rem] font-semibold no-underline ${
            waiting
              ? "bg-[#0f2a4a] text-white hover:bg-[#183e6b]"
              : "border border-[#c9d6e0] text-[#0f2a4a] hover:border-[#245c91]"
          }`}
        >
          {OVERVIEW.reviewRail.cta}
        </a>
      </div>
    </Surface>
  );
}
