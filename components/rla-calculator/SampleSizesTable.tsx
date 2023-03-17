import { useState } from 'react'
import { findMinN } from './find-min-n'

export const SampleSizesTable = ({ p, confidence }) => {
  const [maxK, setMaxK] = useState<number>(0)
  const sampleSizes = findMinN(p, 1 - confidence, maxK)

  return (
    <>
      <label>
        Max:
        <input
          className='px-2 ml-1 w-[6.8rem] bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
          type='number'
          value={maxK}
          onChange={(e) => {
            const val = +e.target.value
            if (val < 0) return
            setMaxK(val)
          }}
        />
      </label>
      <table className='w-full mt-2 text-center'>
        <tr>
          <th>Compromised Votes</th>
          <th>Smallest Sample Size</th>
        </tr>
        {sampleSizes.map((n, k) => (
          <tr key={k}>
            <td>{k}</td>
            <td>{n === -1 ? 'Not Possible' : n}</td>
          </tr>
        ))}
      </table>
    </>
  )
}
