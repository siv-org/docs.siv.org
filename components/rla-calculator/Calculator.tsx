import { useEffect, useState } from 'react'
import { highestKAboveConfidence } from './math'
import { BinomialGraph } from './BinomialGraph'
import { round } from './round'
import { debounce } from './debounce'
import { SampleSizesTable } from './SampleSizesTable'

// const defaults = {
//   winner: 2_473_633,
//   runnerUp: 2_461_854,
//   total: 4_999_958,
//   confidence: 0.99,
//   samples: 10000
//   // runnerUp: 2_463_632, // For exactly 5k margin of error
//   // total: 5_000_000,
// }
const defaults = {
  winner: 55_000,
  runnerUp: 43_000,
  total: 100_000,
  confidence: 0.999,
  samples: 400
}
// const defaults = {
//   winner: 550,
//   runnerUp: 430,
//   total: 1000,
//   confidence: 0.9,
//   samples: 200
// }

export const Calculator = () => {
  const [winnerTotal, setWinnerTotal] = useState(defaults.winner)
  const [runnerUpTotal, setRunnerUpTotal] = useState(defaults.runnerUp)
  const [totalVotesCast, setTotalVotesCast] = useState(defaults.total)
  const [confidence, setConfidence] = useState(defaults.confidence)
  const [samples, setSamples] = useState(defaults.samples)
  const [compromisedSeen, setCompromisedSeen] = useState<number | ''>(2)
  const [result, setResult] = useState(null)
  const [showGraph, setShowGraph] = useState(false)
  const [scaleGraph, setScaleGraph] = useState(true)
  const [showSampleSizes, setShowSampleSizes] = useState(false)
  const [error, setError] = useState(null)

  const marginOfVictory = winnerTotal - runnerUpTotal
  const marginOfError = Math.floor(marginOfVictory / 2)
  const p = marginOfError / totalVotesCast

  function calculate() {
    setError(null)
    if (samples > totalVotesCast)
      return setError("Samples taken can't be more than Total Votes Cast")
    if (winnerTotal + runnerUpTotal > totalVotesCast)
      return setError(
        "Winner's Total + Runner-Up's Total can't be more than Total Votes Cast"
      )
    if (winnerTotal < 0 || runnerUpTotal < 0)
      return setError("Winner's Total and Runner-Up's Total both must be > 0")

    if (winnerTotal < runnerUpTotal)
      return setError("Winner can't be less than Runner-Up")

    setResult(highestKAboveConfidence(samples, p, confidence))
  }

  const debouncedCalculate = debounce(calculate, 500)
  useEffect(() => {
    setResult(null)
    debouncedCalculate()
  }, [winnerTotal, runnerUpTotal, totalVotesCast, confidence, samples])
  useEffect(calculate, [])

  return (
    <div className='p-3 mt-3 border border-gray-700 bg-gray-50/10'>
      <div className='flex justify-between'>
        <form className='flex flex-col space-y-1'>
          <label>
            <div className='inline-block w-32 '>Winner's Total:</div>
            <input
              className='w-[6.8rem] px-2 ml-3 bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
              type='number'
              value={winnerTotal}
              onChange={(e) => setWinnerTotal(+e.target.value)}
            />
            <i className='ml-1 opacity-75'>
              {round((winnerTotal / totalVotesCast) * 100, 2)}%
            </i>
          </label>
          <label>
            Runner-Up's Total:
            <input
              className='px-2 ml-1 w-[6.8rem] bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
              type='number'
              value={runnerUpTotal}
              onChange={(e) => setRunnerUpTotal(+e.target.value)}
            />
            <i className='ml-1 opacity-75'>
              {round((runnerUpTotal / totalVotesCast) * 100, 2)}%
            </i>
          </label>
          <label>
            <div className='inline-block w-32'>Total Votes Cast:</div>
            <input
              className='px-2 ml-3 w-[6.8rem] bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
              type='number'
              value={totalVotesCast}
              onChange={(e) => setTotalVotesCast(+e.target.value)}
            />
          </label>
        </form>

        {/* Margins */}
        <div className='flex flex-col items-end w-48 text-sm'>
          <i className='flex justify-between w-full opacity-75'>
            <span>Margin of Victory:</span>
            <span>{marginOfVictory.toLocaleString()}</span>
          </i>
          <i className='flex justify-between w-full mt-1 opacity-75'>
            Margin of Error:{' '}
            <div className=''>{marginOfError.toLocaleString()}</div>
          </i>
        </div>
      </div>

      {error && (
        <div className='mt-3 text-red-400'>
          <b>Error</b>: {error}
        </div>
      )}

      {/* Paragraph answer */}
      <>
        <div className='mt-3'>
          To achieve{' '}
          <span
            className='p-1 border rounded cursor-pointer border-gray-300/40 bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-300/90'
            onClick={() => {
              const result = prompt(
                'Enter desired confidence % between 0 and 100:'
              )
              if (result) setConfidence(+result / 100)
            }}
          >
            {confidence * 100}%
          </span>{' '}
          confidence that no more than {marginOfError.toLocaleString()} of the{' '}
          {totalVotesCast.toLocaleString()} total votes were compromised ("the
          correct winner won"), a sample of{' '}
          <span
            className='p-1 border rounded cursor-pointer border-gray-300/40 bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-300/90'
            onClick={() => {
              const result = prompt('Enter # of Samples:')
              if (result) setSamples(+result)
            }}
          >
            {samples.toLocaleString()}
          </span>{' '}
          random votes must have no more than:
          <div className='mt-2 italic font-semibold'>
            {/* Exact answer */}
            {result === null ? (
              !!error ? (
                'Fix error above'
              ) : (
                'Loading...'
              )
            ) : result === -1 ? (
              <span className='text-purple-300'>
                Not possible with this sample size
              </span>
            ) : (
              <span className='text-green-600'>
                {result.toLocaleString()} compromised vote
                {result > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <p className='mt-4 text-sm text-blue-400 cursor-pointer hover:underline'>
          <a onClick={() => setShowSampleSizes(!showSampleSizes)}>
            {showSampleSizes ? 'Hide' : 'Show'} sample sizes table
          </a>
        </p>
        {showSampleSizes && (
          <SampleSizesTable {...{ p, confidence, totalVotesCast }} />
        )}
      </>

      <p className='mt-4 text-sm text-blue-400 cursor-pointer hover:underline'>
        <a onClick={() => setShowGraph(!showGraph)}>
          {showGraph ? 'Hide' : 'Show'} binomial graph
        </a>
      </p>
      {showGraph && (
        <>
          <label>
            Compromised Seen:
            <input
              className='px-2 ml-1 w-[6.8rem] bg-gray-200/70 dark:bg-[#1b1b1b] dark:hover:bg-gray-300/10 hover:bg-gray-200'
              type='number'
              value={compromisedSeen}
              onChange={(e) => {
                setError(null)
                const val = e.target.value
                const v = val === '' ? '' : +val
                if (v < 0) return
                if (!Number.isInteger(v)) return
                if (v > samples)
                  setError("Compromised Seen can't be more than Samples")
                setCompromisedSeen(v)
              }}
            />
          </label>

          <label className='block text-sm sm:inline-block sm:ml-5'>
            <input
              type='checkbox'
              className='mr-2'
              checked={scaleGraph}
              onChange={() => setScaleGraph(!scaleGraph)}
            />
            Scale graph
          </label>

          {!error && (
            <BinomialGraph
              {...{
                k: compromisedSeen,
                n: samples,
                total: totalVotesCast,
                confidence,
                scaleGraph,
                marginOfError
              }}
            />
          )}
        </>
      )}
    </div>
  )
}
