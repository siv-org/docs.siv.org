import { testCases, expect } from './expect'
import { memoize } from './memoize'

function binomialCoefficient(n: number, k: number) {
  let res = 1

  if (k > n - k) {
    k = n - k
  }

  for (let i = 0; i < k; i++) {
    res *= n - i
    res /= i + 1
  }

  return res
}
testCases(binomialCoefficient, [
  [[5, 0], 1],
  [[5, 1], 5],
  [[5, 2], 10],
  [[5, 3], 10],
  [[5, 4], 5],
  [[5, 5], 1]
])

/** Also called PMF, Probability Mass Function */
export function binomialProbability(n: number, k: number, p: number) {
  if (n < k) throw `n must be >= k, you gave ${n}, ${k}`

  return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}
export const memoizedBinomialProbability = memoize(binomialProbability)

export function cumulativeBinomialProbability(n: number, k: number, p: number) {
  let cumulativeProbability = 0

  for (let i = 0; i <= k; i++) {
    cumulativeProbability += memoizedBinomialProbability(n, i, p)
  }

  return cumulativeProbability
}
testCases(
  cumulativeBinomialProbability,
  [
    [[10, 3, 0.5], 0.171875],
    [[20, 10, 0.3], 0.9828551835687405],
    [[50, 20, 0.7], 0.000010589331832354874],
    [[100, 50, 0.5], 0.5397946186935892],
    [[10, 10, 0.1], 1]
  ],
  1e-12
)
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

export function highestKAboveConfidence(
  n: number,
  p: number,
  confidence: number
) {
  let k = 0
  while (cumulativeBinomialProbability(n, k, p) < 1 - confidence) {
    k++
  }

  return k - 1
}
testCases(highestKAboveConfidence, [
  [[80, 0.1, 0.99], 1],
  [[100, 0.1, 0.99], 3]
])

// // Example usage:
// const n = 5000
// const p = 0.001
// let k = 0

// while (cumulativeBinomialProbability(n, k, p) < 1 - 0.99) {
//   k++
// }

// console.log(
//   `For a sample size of ${n} and a probability of ${p}, you would need to observe ${k} or fewer black balls to achieve a 99% confidence level.`
// )
