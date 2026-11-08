import { percentWidth } from "../../utils/chart";

export default function ProgressTrack({ className, value, total }) {
  return (
    <div className={className}>
      <i style={{ width: percentWidth(value, total) }} />
    </div>
  );
}
