// LinearChart.js
'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Linec = () => {
  // Sample data (replace with dynamic data if needed)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sample Linear Data',
        data: [10, 20, 15, 30, 25, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'number of opening moves by avg elo',
      },
    },
  };

  return (
    <div className='transition-transform h-[400px] w-[600px] rounded-lg shadow-2xl flex flex-col duration-300 hover:scale-105 z-10 border border-transparent p-4 bg-gray-700/50'>
      <h2 className="text-2xl text-pink-500 text-center uppercase font-semibold mb-8">{options.plugins.title.text} </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Linec;
