"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

export default function AreaC({data, title}) {

  const processedData = [{ range: 0, value: 0 }, ...data.filter(d => d.range !== 0)];
  return (
    <div className='transition-transform max-h-[400px] w-[600px] rounded-lg shadow-2xl flex flex-col duration-300 hover:scale-105 z-10 border border-transparent p-4 pb-16 bg-gray-700/50'>
        <h2 className="text-2xl text-pink-500 uppercase text-center font-semibold mb-8">{title} </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={processedData} >
          <XAxis dataKey="range" 
          stroke="white" 
          tick={{ fill: "white" }}
          />
          <YAxis 
          stroke="white" 
          tick={{ fill: "white" }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--muted-foreground))"
            fill="navy"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

