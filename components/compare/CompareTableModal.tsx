import { RotateRightOutlined } from '@ant-design/icons'
import { Switch } from './Switch'
import { Fragment, useReducer, useState } from 'react'
import { useEffect } from 'react'

import { Score, tableData } from './compare-data'

const getScore = (s: Score): number => (typeof s === 'number' ? s : s[0])

const methods = ['SIV', 'Mail', 'In Person']

export const CompareTableModal = (): JSX.Element => {
  const [bountyEnabled, toggleBounty] = useReducer((t) => !t, true)
  const [modalContent, setModalContent] = useState(null)

  useEffect(() => {
    // If modalContent is not null, the modal is open, so we want to prevent scrolling on the body.
    if (modalContent) {
      document.body.style.overflow = 'hidden'
    } else {
      // If modalContent is null, the modal is closed, so we restore scrolling on the body.
      document.body.style.overflow = 'auto'
    }
  }, [modalContent])

  return (
    <main>
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
      <section className='hidden py-2 mt-2 mb-4 text-center bg-blue-500/30 portrait:visible'>
        <RotateRightOutlined /> &nbsp; <b>Tip:</b> Looks better in Landscape
        orientation
      </section>
      <section className='mt-4 mb-40 overflow-x-scroll'>
        <table>
          <thead>
            <tr className='border-white border-[3px] dark:border-white/20 border-b-0 '>
              <th>Category</th>
              <th style={{ minWidth: 120 }}>Description</th>
              <th>Name</th>
              <th>{methods[0]}</th>
              <th>{methods[1]}</th>
              <th>{methods[2]}</th>
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
                        className='text-center cursor-pointer hover:opacity-70'
                        key={j}
                        style={{
                          color: 'black',
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
                        onClick={() => {
                          setModalContent({
                            title: `${methods[j]} - ${row.d_name}: ${getScore(
                              s
                            )} / 10`,
                            advantages: s[1]?.adv || '',
                            disadvantages: s[1]?.disadv || ''
                          })
                        }}
                      >
                        {getScore(s)}
                        {typeof s !== 'number' && (
                          <span className='hidden'>
                            {methods[j]} - {row.d_name}: {s[0]} / 10
                            <br />
                            <br />
                            <i>Advantages:</i> <br />
                            {!!s[1].adv &&
                              s[1].adv
                                .split('\n')
                                .map((l) => ` + ${l}`)
                                .join('\n')}
                            <br />
                            <br />
                            <i>Disadvantages:</i> <br />
                            {s[1].disadv
                              .split('\n')
                              .map((l) => ` - ${l}`)
                              .join('\n')}
                          </span>
                        )}
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
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div
              className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-20 sm:align-middle sm:max-w-xl sm:w-full'
              style={{
                maxHeight: '70vh',
                overflowY: 'auto',
                paddingTop: '5px'
              }}
            >
              <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
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
              <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
                  <button
                    onClick={() => setModalContent(null)}
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

      <style jsx>{`
        main {
          margin-top: 2rem;
        }

        h2 {
          text-align: center;
        }

        i {
          opacity: 0.5;
          padding: 0 1rem;
          font-weight: 400;
        }

        @media (max-width: 515px) and (orientation: portrait) {
          .portrait\:visible {
            display: block;
          }
        }

        table {
          border-collapse: collapse;
          margin: 0 auto;
        }

        th {
          padding: 0 1rem;
        }

        th:nth-child(-n + 2) {
          text-align: left;
          padding-left: 3px;
        }

        td {
          padding: 5px 4px;
        }

        .bold {
          font-weight: 600;
        }

        @media (max-width: 700px) {
          main {
            padding: 0 5px;
          }

          th {
            padding: 0 5px;
          }
        }
      `}</style>
    </main>
  )
}
