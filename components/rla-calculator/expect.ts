let passed = 0

export function expect<T>(expression: T, equals: T): void {
  if (deepEquals(expression, equals)) {
    // console.log('Passed: Expression equals expected value')
    passed++
  } else {
    console.error(
      'Failed: Expression does not equal expected value. Got:',
      expression,
      'Expected:',
      equals
    )
  }
}

function deepEquals(a: any, b: any): boolean {
  if (a === b) return true

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  )
    return false

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  // Recursively compare objects
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false
  }

  return true
}

const announceResults = () => console.log(`✅ ${passed} tests passed.`)
setTimeout(announceResults, 500)

export function testCases<T extends any[], R>(
  funcToTest: (...input: T) => R,
  testCases: [T, R][],
  tolerance?: number
) {
  testCases.forEach(([input, expected], index) => {
    const result = funcToTest(...input)
    const isCloseEnough = tolerance
      ? Math.abs((result as any) - (expected as any)) <= tolerance
      : deepEquals(result, expected)

    if (isCloseEnough) return passed++

    console.error(
      `Test fail: ${funcToTest.name}() #${
        index + 1
      }: Expected ${expected} · Got ${result}`
    )
    // console.error(
    //   `Test fail: ${funcToTest.name}() #${index + 1}: Expected ${JSON.stringify(
    //     expected
    //   )} · Got ${JSON.stringify(result)}`
    // )
  })
}
