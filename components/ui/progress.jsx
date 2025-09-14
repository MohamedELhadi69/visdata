'use client'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState, useEffect } from 'react';

export default function ProgBar({winRate,vicSta,draw,color}){
    return (   
          <>
        <div className="relative w-full max-w-[600px] flex flex-col flex-nowrap h-[523px] justify-between transition-transform rounded-lg shadow-2xl duration-300 hover:scale-105 z-10 border border-transparent  bg-gray-700/50">
                    <div className='flex flex-row flex-nowrap p-4 px-8 '>
                      <div className='w-[250px]'>
                  <CircularProgressbar
  
                    value={(winRate*100)/20058}
                    text={`${Math.round((winRate*100)/20058)}%`}
                    styles={buildStyles({
                      textColor: 'white',
                      pathColor: '#22C55E',
                      trailColor: 'white',
                    })}
                  /></div>
                   <h2 className="text-2xl text-pink-500 text-center uppercase font-semibold mb-8 pl-8 text-center relative top-[40%] ">Win rate as {color}</h2>
                </div>
                <div className="grid gap-4 p-4">
                <div className="flex items-center gap-4">
                            <span className="text-lg font-medium w-24 hover:text-pink-500 transition-transform transform hover:scale-110">Draw</span>
                            <div className="w-[350px] h-4 relative rounded-full bg-white">
                                <div className="h-4 rounded-full bg-[#22C55E]" style={{ width: `${(draw * 100)/20058}%` }} />
                            </div>
                            <span>{draw}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-medium w-24 hover:text-pink-500 transition-transform transform hover:scale-110">On time</span>
                            <div className="w-[350px] h-4 relative rounded-full bg-white">
                                <div className="h-4 rounded-full bg-[#22C55E]" style={{ width: `${(vicSta[0].time * 100)/20058}%` }} />
                            </div>
                            <span>{vicSta[0].time}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-medium w-24 hover:text-pink-500 transition-transform transform hover:scale-110">Resign</span>
                            <div className="w-[350px] h-4 relative rounded-full bg-white">
                                <div className="h-4 rounded-full bg-[#22C55E]" style={{ width: `${(vicSta[0].resign * 100)/20058}%` }} />
                            </div>
                            <span>{vicSta[0].resign}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-medium w-24 hover:text-pink-500 transition-transform transform hover:scale-110">Checkmate</span>
                            <div className="w-[350px] h-4 relative rounded-full bg-white">
                                <div className="h-4 rounded-full bg-[#22C55E]" style={{ width: `${(vicSta[0].mate * 100)/20058}%` }} />
                            </div>
                            <span>{vicSta[0].mate}</span>
                        </div>
                    </div>
                
                
                
                </div>
        </>
    )
}
