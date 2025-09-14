'use client'
import React, { useState, useEffect } from 'react';
export default function BarChart({width, data, title}) {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <>
    <div className='transition-transform h-[400px] min-w-[400px] rounded-lg shadow-2xl flex flex-col duration-300 hover:scale-105 z-10 border border-transparent pb-8 px-4 pt-2 bg-gray-700/50'
    style={{width: width}}>
      <h2 className="text-2xl text-pink-500 uppercase text-center font-semibold mb-8"> {title} </h2>
      <div className="grid grid-cols-6 gap-4 h-72 items-end">
        {data.map((item, index) => (
          <div
            key={item.label}
            className="flex flex-col items-center group"
            onMouseEnter={() => setHoveredBar(index)}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <div className='flex flex-col items-end gap-4'>
            <span className=" z-99 cursor-pointer relative -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-xs  py-1 px-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
                 <span> ({((item.value / 20058) * 100).toFixed(2)}%) </span>
                
              </span>

            <div
              className={`w-8 bg-[white] rounded-t-md relative overflow-hidden cursor-pointer z-10 opacity-100 `}
              style={{height:`${(((item.value / maxValue)*100)*240)/100}px`}}

            ></div>
              
            </div>
            <span className="mt-2 text-white  text-sm group-hover:text-pink-500 transition-transform transform group-hover:scale-110 ">
              {item.label}
             
            </span>
          </div>
        ))}
      </div></div></>
  );
}
