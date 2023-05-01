type HeaderLabel = string
type Value = string | number
type Cell = [HeaderLabel, Value]
type Row = Cell[]
export const MarkdownTable = ({
  rows,
  headerClassNames = []
}: {
  rows: Row[]
  headerClassNames?: string[]
}) => {
  return (
    <table className='mt-6 text-center'>
      <thead>
        <tr>
          {rows[0].map(([headerLabel], i) => (
            <TH key={i} className={headerClassNames[i]}>
              {headerLabel}
            </TH>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <TR key={i}>
            {row.map(([, value], j) => (
              <TD key={j}>{value}</TD>
            ))}
          </TR>
        ))}
      </tbody>
    </table>
  )
}

// Adapted to match existing styles from https://github.com/shuding/nextra/blob/main/packages/nextra/src/components/th.tsx and sibling files
const TH = ({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) => (
  <th
    className={
      'px-4 py-2 font-semibold border border-gray-300 dark:border-gray-600 ' +
      className
    }
    {...{ children }}
  />
)

const TD = (props: { children: React.ReactNode }) => (
  <td
    className='px-4 py-2 border border-gray-300 dark:border-gray-600'
    {...props}
  />
)

const TR = (props: { children: React.ReactNode }) => (
  <tr className='even:bg-gray-100 even:dark:bg-gray-600/20' {...props} />
)
