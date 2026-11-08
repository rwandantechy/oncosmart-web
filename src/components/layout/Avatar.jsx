import { useSessionUser } from "../../auth/SessionContext";
import { initials } from "../../utils/text";

export default function Avatar({ className = "avatar", label }) {
  const user = useSessionUser();

  return (
    <span className={className} aria-label={label}>
      {initials(user?.name || "")}
    </span>
  );
}
