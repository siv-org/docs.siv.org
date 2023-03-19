import { useState } from 'react'
import { findMinN } from './find-min-n'

export const SampleSizesTable = ({ p, confidence, totalVotesCast }) => {
  const [minK, setMinK] = useState<number>(0)
  const [maxK, setMaxK] = useState<number>(0)
  const sampleSizes =
    minK > maxK ? null : findMinN(p, confidence, minK, maxK, totalVotesCast)

  return (
    <>
      <p className='text-sm text-white/60'>
        If Margin of Error ={' '}
        <span className='text-white/90'>
          {p * totalVotesCast} <span className='opacity-70'>of</span>{' '}
          {totalVotesCast}
        </span>
        , & Target Confidence ={' '}
        <span className='text-white/90'>{confidence * 100}%</span>:
      </p>
      <table className='w-full mt-2 text-center'>
        <tbody>
          <tr className='text-sm opacity-60'>
            <th>For this many</th>
            <th>Smallest needed</th>
          </tr>
          <tr>
            <th>Compromised Votes</th>
            <th>Sample Size</th>
          </tr>
          <tr>
            <td>
              <label>
                <span className='opacity-50 relative bottom-0.5 text-sm w-9 inline-block'>
                  min
                </span>
                <input
                  className='px-2 pl-[26px] ml-1 w-[6.8rem] bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
                  type='number'
                  value={minK}
                  onChange={(e) => {
                    const val = +e.target.value
                    if (val < 0) return
                    if (!Number.isInteger(val)) return
                    setMinK(val)
                    if (val > maxK) setMaxK(val)
                  }}
                />
              </label>
            </td>
            <td>{sampleSizes?.[0]}</td>
          </tr>

          {sampleSizes &&
            sampleSizes.slice(1, -1).map((n, k) => (
              <tr key={k}>
                <td>{k + minK + 1}</td>
                <td>{n === -1 ? 'Not Possible' : n}</td>
              </tr>
            ))}
          <tr>
            <td>
              <label>
                <span className='relative inline-block text-sm opacity-50 bottom-0.5 w-9'>
                  max
                </span>
                <input
                  className='px-2 ml-1 pl-[26px] w-[6.8rem] bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
                  type='number'
                  value={maxK}
                  onChange={(e) => {
                    const val = +e.target.value
                    if (val < 0) return
                    if (!Number.isInteger(val)) return
                    setMaxK(val)
                    if (val < minK) setMinK(val)
                  }}
                />
              </label>
            </td>
            <td>{sampleSizes?.[sampleSizes.length - 1]}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
