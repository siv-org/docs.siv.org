import { useState } from 'react'
import { MarkdownTable } from './MarkdownTable'
import { calcRows } from './calc-rows'
import { formatPercentage } from './format-percentage'

export const MultipleBountyClaimersTable = () => {
  const [pot, setPot] = useState(5_000)
  const [pct, setPct] = useState(35)
  const [rows, setRows] = useState(5)

  return (
    <>
      {/* Inputs */}
      <div className='mt-6'>
        E.g. for a hypothetical{' '}
        <NumberInputButton
          promptStr='Size of the pot?'
          setter={setPot}
          value={`$${pot.toLocaleString()}`}
        />{' '}
        pot, with a{' '}
        <NumberInputButton
          promptStr='Percentage between 0 and 100?'
          setter={setPct}
          max={100}
          value={formatPercentage(pct / 100)}
        />{' '}
        reward, the first{' '}
        <NumberInputButton
          promptStr='Show how many rows?'
          setter={setRows}
          max={1000}
          value={rows}
        />{' '}
        would be:
      </div>

      {/* Results */}
      <MarkdownTable
        rows={calcRows(pot, pct / 100, rows).map((row, i) => [
          ['#', i + 1],
          ['$ Reward', `$${row.dollarValue.toLocaleString()}`],
          ['% of Original', formatPercentage(row.pctOfOrig)],
          ['$ Remaining', `$${row.dollarsRemaining.toLocaleString()}`]
        ])}
        headerClassNames={[, 'bg-green-500/20']}
      />
    </>
  )
}

export const NumberInputButton = ({
  promptStr,
  value,
  setter,
  max
}: {
  promptStr: string
  value: string | number
  setter: (value: number) => void
  max?: number
}) => {
  return (
    <button
      className='my-px px-1.5 py-1 border dark:border-white/20 rounded hover:bg-white/10 cursor-pointer inline-block'
      onClick={() => {
        const result = +(prompt(promptStr) || '')
          .replaceAll(',', '')
          .replaceAll('$', '')
          .replaceAll('%', '')
        if (!result) return
        if (typeof result !== 'number') return alert('Must be a number')
        if (!Number.isInteger(result)) return alert('Must be an integer')
        if (result <= 0) return alert('Must be greater than 0')
        if (max && result > max) return alert(`Can't be greater than ${max}`)

        setter(result)
      }}
    >
      {value}
    </button>
  )
}
