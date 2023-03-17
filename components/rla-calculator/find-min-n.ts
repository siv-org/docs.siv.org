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
      currentConfidence >= confidenceLevel &&
      (mid === 0 ||
        cumulativeBinomialProbability(mid - 1, k, p) < confidenceLevel)
    ) {
      return mid
    }

    if (currentConfidence < confidenceLevel) {
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
  maxK: number
): number[] {
  const maxN = 10000 // Set an upper bound for n to avoid infinite loop

  console.log(
    'called findMinN with p=',
    p,
    'confidenceLevel=',
    confidenceLevel,
    'maxK=',
    maxK
  )

  return [...Array(maxK + 1)].map((_, i) =>
    binarySearch(i, p, confidenceLevel, i, maxN)
  )
}

// // Example usage:
// const p = 0.1
// const confidenceLevel = 0.99
// const minNValues = findMinN(p, 1 - confidenceLevel)
// console.log('example', minNValues)
