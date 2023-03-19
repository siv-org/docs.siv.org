import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, PointElement, LineElement } from 'chart.js'
import { useState } from 'react'

ChartJS.register(PointElement, LineElement)

export const SampleSizesGraph = ({ minK, sampleSizes }) => {
  const [showGraph, setShowGraph] = useState(false)
  if (!sampleSizes) return null

  const xValues = [...Array(sampleSizes.length)].map((_, i) => i + minK)

  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'Samples Size Needed',
        data: sampleSizes,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  }

  return (
    <>
      <p className='mt-4 text-sm text-blue-400 cursor-pointer hover:underline'>
        <a onClick={() => setShowGraph(!showGraph)}>
          {showGraph ? 'Hide' : 'Show'} sample sizes graph
        </a>
      </p>
      {showGraph && (
        <Line
          data={data}
          options={{
            scales: {
              x: {
                type: 'linear',
                display: true,
                position: 'bottom'
              }
            }
          }}
        />
      )}
    </>
  )
}
