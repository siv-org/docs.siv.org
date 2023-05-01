import { expect, testCases } from '../rla-calculator/expect'

type Row = {
  pctOfOrig: number
  dollarValue: number
  dollarsRemaining: number
}

export const calcRows = (
  initialDollars: number,
  pct: number,
  rows: number
): Row[] => {
  const firstReward = Math.floor(pct * initialDollars)
  const firstRow = {
    pctOfOrig: pct,
    dollarValue: firstReward,
    dollarsRemaining: initialDollars - firstReward
  }

  const data = [firstRow]
  for (let i = 1; i < rows; i++) {
    const prevRow = data[i - 1]
    const reward = Math.round(pct * prevRow.dollarsRemaining)
    data.push({
      pctOfOrig: reward / initialDollars,
      dollarValue: reward,
      dollarsRemaining: prevRow.dollarsRemaining - reward
    })
  }

  return data
}
testCases(calcRows, [
  [
    [10_000, 0.7, 5],
    [
      { pctOfOrig: 0.7, dollarValue: 7000, dollarsRemaining: 3000 },
      { pctOfOrig: 0.21, dollarValue: 2100, dollarsRemaining: 900 },
      { pctOfOrig: 0.063, dollarValue: 630, dollarsRemaining: 270 },
      { pctOfOrig: 0.0189, dollarValue: 189, dollarsRemaining: 81 },
      { pctOfOrig: 0.0056, dollarValue: 56, dollarsRemaining: 25 }
    ]
  ]
])
