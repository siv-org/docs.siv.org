import { expect, testCases } from './expect'
import { cumulativeBinomialProbability } from './math'

function binarySearch(
  k: number,
  p: number,
  confidenceLevel: number,
  low: number,
  high: number
): number {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const currentConfidence = cumulativeBinomialProbability(mid, k, p)

    if (
      1 - currentConfidence >= confidenceLevel &&
      (mid === 0 ||
        1 - cumulativeBinomialProbability(mid - 1, k, p) < confidenceLevel)
    ) {
      return mid
    }

    if (1 - currentConfidence < confidenceLevel) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return -1
}

// There is a slower k^2 version of this (rather than this kLogk), a bit easier to understand, at git commit a1da276
export const findMinN = (
  p: number,
  confidenceLevel: number,
  minK: number,
  maxK: number,
  maxN: number
): number[] =>
  [...Array(maxK + 1 - minK)]
    .map((_, j) => j + minK)
    .map((i) => binarySearch(i, p, confidenceLevel, i, maxN))

expect(findMinN(7 / 25, 0.99, 0, 0, 25)[0], 15)
testCases(findMinN, [
  [
    [3 / 10, 0.99, 0, 6, 100],
    [13, 20, 25, 30, 35, 40, 44]
  ]
])
