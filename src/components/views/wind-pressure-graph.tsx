import React from 'react';
import { Wind } from '@/types/weather';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface WindPressureGraphProps {
  windData: Wind;
}

const WindPressureGraph: React.FC<WindPressureGraphProps> = ({ windData }) => {
  const data = {
    labels: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
    datasets: [
      {
        label: 'Wind Pressure',
        data: [windData.speed, windData.speed, windData.speed, windData.speed, windData.speed, windData.speed, windData.speed, windData.speed],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
      <h2 className="text-l font-bold mb-2 text-center text-black">Wind Pressure Graph</h2>
      <Radar data={data} options={options} />
    </div>
  );
};

export default WindPressureGraph;
