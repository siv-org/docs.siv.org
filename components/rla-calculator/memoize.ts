import { expect } from './expect'

type MemoizedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>

export function memoize<T extends (...args: any[]) => any>(
  func: T
): MemoizedFunction<T> {
  const cache: Map<string, ReturnType<T>> = new Map()

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)

    if (!cache.has(key)) {
      const result = func(...args)
      cache.set(key, result)
    }

    return cache.get(key) as ReturnType<T>
  } as MemoizedFunction<T>
}

// Example usage:
const factorial = (n: number): number => (n === 0 ? 1 : n * factorial(n - 1))
const memoizedFactorial = memoize(factorial)
expect(memoizedFactorial(5), 120)
expect(memoizedFactorial(5), 120)
