import { RotateRightOutlined } from '@ant-design/icons'
import { Switch } from './Switch'
import { Fragment, useReducer } from 'react'

import { Score, tableData } from './compare-data'

const getScore = (s: Score): number => (typeof s === 'number' ? s : s[0])

const methods = ['SIV', 'Mail', 'In Person']

export const CompareTable = (): JSX.Element => {
  const [bountyEnabled, toggleBounty] = useReducer((t) => !t, true)

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
          href='/further-study/vote-sellers-dilemma'
        >
          (learn more)
        </a>
      </div>
      <section className='landscape-reminder'>
        <RotateRightOutlined /> &nbsp; <b>Tip:</b> Looks better in Landscape
        orientation
      </section>
      <section className='table mt-4'>
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
                    ]
                      .reverse()
                      .map((s, j) => (
                        <td
                          className='text-center tooltip'
                          key={j}
                          style={{
                            backgroundColor: {
                              1: '#ef4444',
                              2: '#f87171',
                              3: '#fca5a5',
                              4: '#fecaca',
                              5: '' && 'white',
                              6: '#bbf7d0',
                              7: '#86efac',
                              8: '#4ade80',
                              9: '#22c55e'
                            }[getScore(s)]
                          }}
                        >
                          {getScore(s)}
                          {typeof s !== 'number' && (
                            <span className='tooltip-text'>
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

        .landscape-reminder {
          text-align: center;
          background: #dfebff;
          padding: 7px 0;
          display: none;
          margin-bottom: 1rem;
        }

        @media (max-width: 515px) and (orientation: portrait) {
          .landscape-reminder {
            display: block;
          }
        }

        section.table {
          overflow-x: scroll;
          padding-bottom: 10rem;
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

        .text-center {
          text-align: center;
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

        .tooltip {
          position: relative;
        }

        .tooltip .tooltip-text {
          visibility: hidden;
          width: 340px;
          background-color: #000d;
          color: #fff;
          text-align: left;
          padding: 5px;
          border-radius: 6px;

          /* Position the tooltip text - see examples below! */
          position: absolute;
          z-index: 1;
          right: 105%;
          top: 20%;

          white-space: pre-line;
        }

        .tooltip .tooltip-text::after {
          content: ' ';
          position: absolute;
          top: 9px;
          left: 100%; /* To the right of the tooltip */
          border-width: 7px;
          border-style: solid;
          border-color: transparent transparent transparent #000d;
        }

        .tooltip:hover .tooltip-text {
          visibility: visible;
        }
      `}</style>
    </main>
  )
}