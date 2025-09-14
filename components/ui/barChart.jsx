import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const percentage = ((value / 20058) * 100).toFixed(2); // Calculate percentage with 2 decimals

    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-md">
        <p className="font-bold">{`Label: ${label}`}</p>
        <p>{`Value: ${value}`}</p>
        <p className="text-pink-400">{`Percentage: ${percentage}%`}</p>
      </div>
    );
  }
  return null;
};

export default function CustomBarChart({ data, title }) {
  return (
    <div className='transition-transform h-[523px] w-full rounded-lg shadow-2xl flex flex-col duration-300 hover:scale-105 z-10 border border-transparent pb-8 px-4 pt-2 bg-gray-700/50'>
      <h2 className="text-2xl uppercase text-pink-500 text-center font-semibold pt-4 pb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey="value" fill="#DAEBF4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
