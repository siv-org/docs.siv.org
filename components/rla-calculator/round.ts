export function round(number: number, decimalPlaces: number) {
  const multiplier = Math.pow(10, decimalPlaces)
  return Math.round(number * multiplier) / multiplier
}
