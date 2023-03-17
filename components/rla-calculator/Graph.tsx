import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Plugin
} from 'chart.js'

import { memoizedBinomialProbability } from './math'

type HorizontalLinePluginOptions = {
  yValue: number
  color?: string
  lineWidth?: number
}

const horizontalLinePlugin: Plugin<'bar', HorizontalLinePluginOptions> = {
  id: 'horizontalLine',
  afterDraw: (chart, _, options) => {
    const { ctx, scales } = chart
    const { yValue, color, lineWidth } = options

    const yAxis = scales.y

    if (!yAxis) return

    const y = yAxis.getPixelForValue(yValue)

    ctx.save()
    ctx.strokeStyle = color || 'rgba(0, 0, 0, 0.5)'
    ctx.lineWidth = lineWidth || 1
    ctx.beginPath()
    ctx.moveTo(scales.x.left, y)
    ctx.lineTo(scales.x.right, y)
    ctx.stroke()
    ctx.restore()
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  horizontalLinePlugin
)

export const Graph = ({ n, k, total, confidence }) => {
  const [chartData, setChartData] = useState(null)
  const pmf = [...Array(n + 1)].map((_, i) =>
    memoizedBinomialProbability(n, i, k / n)
  )
  let memo = 0

  const scaled = true

  useEffect(() => {
    setChartData({
      labels: [...Array(n + 1)].map((_, i) =>
        scaled ? Math.round(i * (total / n)) : i
      ),
      datasets: [
        {
          label: 'Binomial Probability Density',
          data: pmf,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Cumulative Binomial Probability',
          data: pmf.map((p) => (memo += p)),
          backgroundColor: 'hsla(222, 100%, 60%, 0.6)',
          borderColor: 'hsl(222, 100%, 60%)',
          borderWidth: 1
        }
      ]
    })
  }, [n, k])

  if (!chartData) return null

  return (
    <div>
      <Bar
        height={300}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              max: (k + 2) * 4,
              title: {
                display: true,
                text: 'Estimated Total # of Compromised Votes'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Probability'
              }
            }
          },
          plugins: {
            // @ts-expect-error
            horizontalLine: {
              yValue: confidence, // The y-axis value where you want to draw the horizontal line
              color: 'hsla(120, 100%, 60%, 0.3)',
              lineWidth: 1
            }
          }
        }}
      />
    </div>
  )
}
