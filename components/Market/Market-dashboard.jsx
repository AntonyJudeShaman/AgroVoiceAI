import React from 'react'
import Plot from 'react-plotly.js'

export const PlotComponent = ({ data }) => {
  return (
    <div>
      <h2>Market Prices of Items</h2>
      <Plot
        data={[
          {
            x: data.map(item => item.marketPrice),
            y: data.map(item => item.name),
            type: 'bar',
            orientation: 'h',
            marker: { color: 'skyblue' }
          }
        ]}
        layout={{
          title: 'Market Prices of Items',
          xaxis: { title: 'Price (₹)' },
          yaxis: { title: 'Items' }
        }}
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  )
}
