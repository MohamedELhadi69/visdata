"use client";
import React, { useEffect, useState } from "react";
import RefreshButton from "./refreshButton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function MultiBarChart({ data, title, openings }) {
  const [filteredData, setFilteredData] = useState([]);
  const [newTitle, setNewTitle] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  
  let fin;

  const processOccurrences = (result) => {
    if (!Array.isArray(result) || result.length === 0) {
      console.warn('Empty or invalid array');
      return [];
    }
    const sortedArray = [...result].sort((a, b) => (b.count || 0) - (a.count || 0));

    return sortedArray.slice(0, 5);
  };

  function countWinnersByName(firstInput, secondArray) {
    const result = [];

    if (typeof firstInput === 'string') {
      const name = firstInput;
      const cnt = { name: name, White: 0, Black: 0, Draw: 0 };

      secondArray.forEach(item => {
        if (item.opShort === name) {
          if (item.opWinner === "White") {
            cnt.White++;
          } else if (item.opWinner === "Black") {
            cnt.Black++;
          } else if (item.opWinner === "Draw") {
            cnt.Draw++;
          }
        }
      });

      result.push(cnt);
    } else if (Array.isArray(firstInput)) {
      firstInput.forEach(({ name }) => {
        const cnt = { name: name, White: 0, Black: 0, Draw: 0 };

        secondArray.forEach(item => {
          if (item.opShort === name) {
            if (item.opWinner === "White") {
              cnt.White++;
            } else if (item.opWinner === "Black") {
              cnt.Black++;
            } else if (item.opWinner === "Draw") {
              cnt.Draw++;
            }
          }
        });

        result.push(cnt);
      });
    } else {
      throw new Error('Invalid input: firstInput must be a string or an array');
    }

    return result;
  }

  const handleSelection = (event) => {
    const selected = event.target.value;
    setFilteredData(countWinnersByName(selected, openings));
    const tit = title.split('(')[0] + '(' + selected + ')';
    setNewTitle(tit);
    setSelectedValue(selected);
  };

  useEffect(() => {
    if (data && data.length > 0 && openings && openings.length > 0) {
      const filteredData = data.filter(item => item.count > 50);
      fin = processOccurrences(filteredData);
      setFilteredData(countWinnersByName(fin, openings));
      setNewTitle(title);
    }
  }, [data]);

  const handleRefresh = () => {
    const filteredData = data.filter(item => item.count > 50);
    fin = processOccurrences(filteredData);
    setFilteredData(countWinnersByName(fin, openings));
    setNewTitle(title);
    setSelectedValue('');
  };

  return (
    <div className="grid grid-cols-2 justify-between gap-[62svw] w-screen">
      <div className="w-[80svw] relative mx-auto p-4 rounded-lg shadow-lg duration-300 hover:scale-[102%] z-10 transition-transform border border-transparent bg-gray-700/50">
        <div className="flex flex-nowrap justify-between">
          <h2 className="text-2xl font-bold uppercase text-pink-500 text-center mb-4 text-center">
            {newTitle}
          </h2>
          <RefreshButton onClick={handleRefresh} />
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-500 inline-block"></span>
            <span className="text-white">White wins</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 inline-block"></span>
            <span className="text-white">Black wins</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-orange-500 inline-block"></span>
            <span className="text-white">Draw</span>
          </div>
        </div>

        {/* Bar Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />
            <Bar dataKey="White" fill="#3B82F6" name="White wins" />
            <Bar dataKey="Black" fill="#22C55E" name="Black wins" />
            <Bar dataKey="Draw" fill="orange" name="Draw" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <select
        className="h-8 w-fit text-pink-500 rounded-lg shadow-2xl"
        onChange={handleSelection}
        value={selectedValue}
      >
        <option value="" disabled>Select opening</option>
        {data.filter(op => op.count > 50).map((op) => (
          <option key={op.name} value={op.name}>{op.name}</option>
        ))}
      </select>
    </div>
  );
}
