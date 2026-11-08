import { barHeight, highestValue } from "../../utils/chart";

export default function BarChart({ items, label }) {
  const highest = highestValue(items, "value");
  return (
    <div className="bar-chart" aria-label={label}>
      {items.map((item) => (
        <div className="bar-column" key={item.id}>
          <span>{item.value}</span>
          <div className="bar" style={{ height: barHeight(item.value, highest) }} />
          <small>{item.label}</small>
        </div>
      ))}
    </div>
  );
}
