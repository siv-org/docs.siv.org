import { testCases } from '../rla-calculator/expect'

/** Converts a decimal number to a percentage string with up to 2 decimal places. */
export const formatPercentage = (pct: number) => {
  const numDecimals = pct.toString().split('.')[1]?.length ?? 0
  const precision = Math.min(numDecimals, 2)
  const formattedPct = parseFloat((pct * 100).toFixed(precision)).toString()
  return `${formattedPct}%`
}
testCases(formatPercentage, [
  [[0.7], '70%'],
  [[0.21], '21%'],
  [[0.063], '6.3%'],
  [[0.0189], '1.89%'],
  [[0.00564], '0.56%']
])
