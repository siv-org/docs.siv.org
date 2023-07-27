import { RotateRightOutlined } from '@ant-design/icons'
import { Switch } from './Switch'
import { Fragment, useReducer, useState } from 'react'
import { useEffect, useCallback } from 'react'

import { Score, tableData } from './compare-data'

const getScore = (s: Score): number => (typeof s === 'number' ? s : s[0])

const methods = ['SIV', 'Mail', 'In Person']

type OpenedModalIndex = [number, number, number] | null

export const CompareTableModal = (): JSX.Element => {
  const [bountyEnabled, toggleBounty] = useReducer((t) => !t, true)
  const [openedModalIndex, setOpenedModalIndex] =
    useState<OpenedModalIndex>(null)
  function getModalContent(openedModalIndex: OpenedModalIndex) {
    if (!openedModalIndex) return null
    const [cat_index, row_index, col_index] = openedModalIndex

    const cat = tableData[cat_index]
    const row = cat.rows[row_index]
    const scores = bountyEnabled
      ? row.scores_with_bounty || row.scores
      : row.scores
    const score = scores[col_index]

    return {
      title: `${methods[col_index]} - ${row.d_name}: ${getScore(score)} / 10`,
      advantages: score[1]?.adv || '',
      disadvantages: score[1]?.disadv || ''
    }
  }
  const modalContent = getModalContent(openedModalIndex)

  const closeModal = () => setOpenedModalIndex(null)
  const goToNext = useCallback(() => {
    setOpenedModalIndex((prevIndex) => {
      let newIndex: [number, number, number] = [...prevIndex]
      newIndex[2]++
      if (newIndex[2] >= methods.length) return prevIndex // Close if reached right most column

      return newIndex
    })
  }, [])
  const goToPrev = useCallback(() => {
    setOpenedModalIndex((prevIndex) => {
      let newIndex: [number, number, number] = [...prevIndex]
      newIndex[2]--
      if (newIndex[2] < 0) return prevIndex // Close if reached left most column

      return newIndex
    })
  }, [])

  const handleKeyDown = useCallback(
    (event) => {
      if (!openedModalIndex) return

      if (event.key === 'ArrowRight') goToNext()
      if (event.key === 'ArrowLeft') goToPrev()
    },
    [openedModalIndex]
  )
  // Activate keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <main className='mt-8'>
      {/* Line w/ Bounty Reward Switch */}
      <div>
        <Switch
          checked={bountyEnabled}
          onClick={toggleBounty}
          label='With Vote Seller Bounty Rewards'
        />{' '}
        <a
          className='text-blue-500 hover:underline'
          href='/research-in-progress/vote-sellers-dilemma'
        >
          (learn more)
        </a>
      </div>

      {/* Landscape Orientation tip */}
      <section className='hidden py-2 mt-2 mb-4 text-center bg-blue-500/30 portrait:block'>
        <RotateRightOutlined /> &nbsp; <b className='font-bold'>Tip:</b> Looks
        better in Landscape orientation
      </section>

      {/* Table */}
      <section className='pb-4 mt-6 mb-40 overflow-x-scroll'>
        <table className='mx-auto border-collapse'>
          <thead>
            <tr className='border-white border-[3px] dark:border-white/20 border-b-0 text-xs space-x-4'>
              <th className='text-left '>Category</th>
              <th className='text-left min-w-[120px]'>Description</th>
              <th>Name</th>
              <th className='w-[12%]'>{methods[0]}</th>
              <th className='w-[12%]'>{methods[1]}</th>
              <th className='w-[12%]'>{methods[2]}</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((cat, c_i) => (
              <Fragment key={c_i}>
                {cat.rows.map((row, i) => (
                  <tr
                    className={
                      i == 0 &&
                      'border-t-[#e4e4e4] dark:border-t-white/20 border-t-4 first:border-t '
                    }
                    key={i}
                  >
                    {i === 0 && (
                      <td
                        className='bg-white text-[#555] dark:bg-[rgb(17,17,17)] dark:text-white/70'
                        rowSpan={cat.rows.length}
                      >
                        {cat.name}&nbsp;&nbsp;
                      </td>
                    )}
                    <td className='text-sm opacity-70'>{row.desc}</td>
                    <td className='!pr-3 text-center'>{row.d_name}</td>
                    {[
                      ...(bountyEnabled && row.scores_with_bounty
                        ? row.scores_with_bounty
                        : row.scores)
                    ].map((s, j) => (
                      <td
                        className='text-center text-black cursor-pointer hover:opacity-70'
                        key={j}
                        style={{
                          backgroundColor: {
                            1: '#ef4444',
                            2: '#f87171',
                            3: '#fca5a5',
                            4: '#fecaca',
                            5: 'white',
                            6: '#bbf7d0',
                            7: '#86efac',
                            8: '#4ade80',
                            9: '#22c55e'
                          }[getScore(s)]
                        }}
                        onClick={() => setOpenedModalIndex([c_i, i, j])}
                      >
                        {getScore(s)}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {!!modalContent && (
        // Outer container
        <div
          className='fixed inset-0 z-10 overflow-y-auto'
          onClick={closeModal}
        >
          {/* Centre contents on small screens */}
          <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 opacity-75 bg-zinc-900/70'></div>
            </div>
            <div
              className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-20 sm:align-middle sm:max-w-xl sm:w-full pt-[5px] overflow-y-auto max-h-[70vh]'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='relative px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                {/* Prev arrow */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 cursor-pointer left-4 top-1/2 hover:text-gray-700'
                  onClick={goToPrev}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>

                {/* Next arrow */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:text-gray-700'
                  onClick={goToNext}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>

                {/* Close X btn */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='absolute w-6 h-6 cursor-pointer text-zinc-500 top-4 right-4 hover:text-gray-700'
                  onClick={closeModal}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>

                {/* Modal Content */}
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-left sm:mt-0 sm:ml-4'>
                    <h3
                      className='text-lg font-medium leading-6 text-gray-900'
                      id='modal-title'
                    >
                      {modalContent.title}
                    </h3>
                    <div className='mt-2 text-sm text-sky-900'>
                      <div className='mt-3 mb-1 text-xs text-teal-900/80'>
                        Advantages:
                      </div>
                      {modalContent.advantages
                        .split('\n')
                        .map((advantage, index) => (
                          <div className='mb-2' key={index}>
                            + {advantage}
                          </div>
                        ))}
                      <div className='mt-3 mb-1 text-xs opacity-60'>
                        Disadvantages:
                      </div>
                      {modalContent.disadvantages
                        .split('\n')
                        .map((disadvantage, index) => (
                          <div className='mb-2' key={index}>
                            - {disadvantage}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal bottom row */}
              <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
                  <button
                    onClick={() => setOpenedModalIndex(null)}
                    className='inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5'
                  >
                    Close
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
