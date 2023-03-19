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

export function findMinN(
  p: number,
  confidenceLevel: number,
  maxK: number,
  maxN: number
): number[] {
  return [...Array(maxK + 1)].map((_, i) =>
    binarySearch(i, p, confidenceLevel, i, maxN)
  )
}
expect(findMinN(7 / 25, 0.99, 0, 25)[0], 15)
testCases(findMinN, [
  [
    [3 / 10, 0.99, 6, 100],
    [13, 20, 25, 30, 35, 40, 44]
  ]
])

export function findMinNSlow(p: number, confidenceLevel: number, maxK = 0) {
  const minNValues = []
  let currentConfidence: number

  for (let k = 0; k <= maxK; k++) {
    let n = k

    do {
      currentConfidence = cumulativeBinomialProbability(n, k, p)
      // console.log('k=', k, 'n=', n, 'currentConfidence=', currentConfidence)
      n++
      if (n > 10000) break
    } while (1 - currentConfidence < confidenceLevel)

    minNValues.push(n - 1)
  }

  return minNValues
}
// Increasing n should result in a lower confidence level
expect(
  cumulativeBinomialProbability(5, 2, 0.5) -
    cumulativeBinomialProbability(6, 2, 0.5) >
    0,
  true
)
expect(
  cumulativeBinomialProbability(5, 4, 0.5) -
    cumulativeBinomialProbability(6, 4, 0.5) >
    0,
  true
)
expect(findMinNSlow(7 / 25, 0.99)[0], 15)
testCases(findMinNSlow, [
  [
    [3 / 10, 0.99, 6],
    [13, 20, 25, 30, 35, 40, 44]
  ]
])
