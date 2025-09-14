import { Chart, ScatterController, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useRef } from 'react';

// Register the components you will use
Chart.register(ScatterController, LinearScale, PointElement, Title, Tooltip, Legend);

const ScatterPlot = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data) return; // Ensure data is passed before proceeding

    const ctx = chartRef.current.getContext('2d');

    const config = {
      type: 'scatter',
      data: data, // Use the data prop
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            grid: {
              color: 'rgba(200, 200, 200, 0.8)', // Customize the grid color
            },
            ticks: {
              color: 'rgba(200, 200, 200, 0.8)', // Customize the axis label color
            },
            title: {
              display: true,
              text: 'Rating diffrence', // Label for the x-axis
              color: 'rgba(200, 200, 200, 0.8)', // Color for the label text
              font: {
                size: 14, // Font size for the label
                weight: 'bold', // Font weight
              },
            },
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200, 0.8)', // Customize the grid color
            },
            ticks: {
              color: 'rgba(200, 200, 200, 0.8)', // Customize the axis label color
            },
            title: {
              display: true,
              text: 'number of moves', // Label for the x-axis
              color: 'rgba(200, 200, 200, 0.8)', // Color for the label text
              font: {
                size: 14, // Font size for the label
                weight: 'bold', // Font weight
              },
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'rgb(255, 99, 132)', // Customize the legend label color
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Customize tooltip background
            titleColor: '#ffffff', // Customize tooltip title color
            bodyColor: '#ffffff', // Customize tooltip body text color
          },
        },
      },
    };

    const scatterChart = new Chart(ctx, config);

    return () => {
      scatterChart.destroy(); // Cleanup chart instance when component unmounts
    };
  }, [data]); // Re-run effect if data changes

  return <canvas ref={chartRef} />;
};

export default ScatterPlot;
