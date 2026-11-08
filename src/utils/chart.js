import { BAR_CHART } from "../config/ui";

export function highestValue(items, key) {
  return Math.max(...items.map((item) => item[key]), 1);
}

function percent(value, total) {
  return total ? (value / total) * 100 : 0;
}

export function percentWidth(value, total) {
  return `${percent(value, total)}%`;
}

export function barHeight(value, highest) {
  return `${Math.max(BAR_CHART.minHeightPx, (value / highest) * BAR_CHART.maxHeightPx)}px`;
}
