let passed = 0

export function expect<T>(expression: T, equals: T): void {
  if (deepEqual(expression, equals)) {
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

function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true
  }

  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false
    }
  }

  return true
}

const announceResults = () => console.log(`✅ ${passed} tests passed.`)
setTimeout(announceResults, 500)
