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

export function binomialProbability(n: number, k: number, p: number) {
  return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k)
}

export function cumulativeBinomialProbability(n: number, k: number, p: number) {
  let cumulativeProbability = 0

  for (let i = 0; i <= k; i++) {
    cumulativeProbability += binomialProbability(n, i, p)
  }

  return cumulativeProbability
}

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
