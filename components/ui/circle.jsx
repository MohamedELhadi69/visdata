'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CircleGraph({ data,title }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [paths, setPaths] = useState([]);
  const [labels, setLabels] = useState([]);
  const size = 250;

  const handleMouseMove = (event, item) => {
    const { clientX, clientY } = event;
    setHoveredItem(item);
    setTooltipPosition({ x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  useEffect(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    const calculatedPaths = [];
    const calculatedLabels = [];

    data.forEach((item) => {
      const angle = (item.value / total) * 360;
      const endAngle = startAngle + angle;
      const largeArcFlag = angle > 180 ? 1 : 0;
     
      const safeValue = (value) => (isNaN(value) ? 0 : value);
      const x1 = safeValue(Math.cos((startAngle * Math.PI) / 180) * (size / 2))
      const y1 = safeValue(Math.sin((startAngle * Math.PI) / 180) * (size / 2))
      const x2 = safeValue(Math.cos((endAngle * Math.PI) / 180) * (size / 2))
      const y2 = safeValue(Math.sin((endAngle * Math.PI) / 180) * (size / 2))

      const pathData = `M 0 0 L ${x1} ${y1} A ${size / 2} ${size / 2} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      calculatedPaths.push({ pathData, color: item.color, item });

      // Label positioning
      const labelAngle = startAngle + angle / 2;
      const labelRadius = (size / 2) * 0.7;
      const x = Math.cos((labelAngle * Math.PI) / 180) * labelRadius;
      const y = Math.sin((labelAngle * Math.PI) / 180) * labelRadius;

      calculatedLabels.push({ x, y, label: item.label });

      startAngle = endAngle;
    });

    setPaths(calculatedPaths);
    setLabels(calculatedLabels);
  }, [data]);

  return (
    <div className="relative flex flex-col w-fit gap-4 items-center justify-between h-[400px] transition-transform rounded-lg shadow-2xl duration-300 hover:scale-105 z-10 border border-transparent p-4 bg-gray-700/50">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {paths.map((path, index) => (
            <path
              key={index}
              d={path.pathData}
              fill={path.color}
              stroke="white"
              strokeWidth="1"
              onMouseMove={(e) => handleMouseMove(e, path.item)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer"
            />
          ))}
        </g>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {labels.map((label, index) => (
            <text
              key={index}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={size / 20}
            >
              {label.label}
            </text>
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredItem && (
        <div
          className="absolute bg-pink-500 text-white text-xs px-2 py-1 rounded-md shadow-md pointer-events-none"
          style={{
            left: `${(tooltipPosition.x)/2}px`,
            top: `${(tooltipPosition.y)/2}px`,
            transform: 'translate(10px, 10px)',
          }}
        >
          Value: {hoveredItem.value}
        </div>
      )}

      <div>
        <h2 className="text-2xl uppercase text-pink-500 text-center font-semibold mb-8">
          {title}
        </h2>
      </div>
    </div>
  );
}

CircleGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CircleGraph;
