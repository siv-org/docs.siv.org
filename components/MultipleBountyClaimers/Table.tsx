import { MarkdownTable } from './MarkdownTable'
import { calcRows } from './calc-rows'
import { formatPercentage } from './format-percentage'

export const MultipleBountyClaimersTable = () => {
  const rows = calcRows(10_000, 0.7, 4)
  const data = rows

  return (
    <MarkdownTable
      rows={data.map((row, i) => [
        ['#', i + 1],
        ['% of Original', formatPercentage(row.pctOfOrig)],
        ['$', `$${row.dollarValue}`],
        ['$ Remaining', `$${row.dollarsRemaining}`]
      ])}
    />
  )
}
