export const transcript = [
  {
    q: 'How does a binomial distribution compare to a normal distribution?',
    a: `The binomial distribution and the normal distribution are both probability distributions, but they are used to model different types of data.

The binomial distribution is used to model the number of successes in a fixed number of independent trials, where each trial has only two possible outcomes (success or failure) and the probability of success is constant for each trial. For example, if you flip a fair coin 10 times, the number of heads you get could be modeled by a binomial distribution with n=10 and p=0.5.

The normal distribution, also known as the Gaussian distribution, is used to model continuous data that is symmetric and bell-shaped. It is commonly used in statistics to model the distribution of measurement errors, as well as many natural phenomena such as heights, weights, and IQ scores. The normal distribution has two parameters: the mean (µ) and the standard deviation (σ).

While the binomial distribution is discrete and has a finite number of possible outcomes, the normal distribution is continuous and has an infinite number of possible outcomes. Additionally, as the sample size of a binomial distribution gets larger, it becomes more and more similar to a normal distribution, due to the central limit theorem.`
  },
  {
    q: 'Formulas for binomial distribution?',
    a: `The probability mass function (PMF) of the binomial distribution gives the probability of getting exactly k successes in n independent Bernoulli trials, where each trial has a probability p of success. The PMF of the binomial distribution is:

P(X = k) = (n choose k) * p^k * (1-p)^(n-k)

where n is the number of trials, k is the number of successes, p is the probability of success in each trial, and (n choose k) is the binomial coefficient, which is equal to n!/(k!(n-k)!).

The cumulative distribution function (CDF) of the binomial distribution gives the probability of getting at most k successes in n independent Bernoulli trials. The CDF of the binomial distribution is:

F(k) = P(X <= k) = sum from i=0 to k of (n choose i) * p^i * (1-p)^(n-i)

where n is the number of trials, k is the number of successes, p is the probability of success in each trial, and (n choose i) is the binomial coefficient, which is equal to n!/(i!(n-i)!).

The mean and variance of the binomial distribution are:

E(X) = np

Var(X) = np(1-p)

where n is the number of trials and p is the probability of success in each trial.`
  },
  {
    q: 'What is the cumulative distribution function formula for binomial curves?',
    a: `The cumulative distribution function (CDF) of the binomial distribution gives the probability of getting at most k successes in n independent Bernoulli trials. The CDF of the binomial distribution is:

F(k) = P(X <= k) = sum from i=0 to k of (n choose i) * p^i * (1-p)^(n-i)

where n is the number of trials, k is the number of successes, p is the probability of success in each trial, and (n choose i) is the binomial coefficient, which is equal to n!/(i!(n-i)!).

The CDF gives the probability that the random variable X takes a value less than or equal to k. To find the probability that X takes a value greater than k, you can use the complementary probability:

P(X > k) = 1 - P(X <= k) = 1 - F(k)

So, the cumulative distribution function formula for binomial curves is the formula for F(k) given above.`
  }
]
