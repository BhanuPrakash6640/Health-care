export function computeAnomaly(history, latestVal) {
  const window = history.slice(-12).map(h => h.hr);
  const n = window.length;
  if (n === 0) return { score: 0, z: 0, mean: 0, std: 0 };

  const mean = window.reduce((s, x) => s + x, 0) / n;
  const variance = window.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance) || 1;

  const z = (latestVal - mean) / std;
  const score = Math.max(0, Math.min(1, (z + 3) / 6));  // maps z-score to 0–1

  return { score, z, mean, std };
}