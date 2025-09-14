import React from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { x, y, size } = payload[0].payload
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-md rounded text-gray-600">
        <p>
          <strong>X:</strong> {x}
        </p>
        <p>
          <strong>Y:</strong> {y}
        </p>
        {size !== undefined && (
          <p>
            <strong>Size:</strong> {size}
          </p>
        )}
      </div>
    )
  }

  return null
}

const ScatterPlotToo = ({ data }) => {


  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 40, // Adjusted for X-axis label
            left: 60, // Adjusted for Y-axis label
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="x" label={{ value: "Rating gap", position: "bottom", offset: 0 }} />
          <YAxis
            type="number"
            dataKey="y"
            name="y"
            label={{ value: "Number of moves", angle: -90, position: "insideLeft" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ScatterPlotToo

