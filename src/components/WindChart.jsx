
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WindChart = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  
  const hours = hourlyData.map(hour => new Date(hour.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  const windSpeeds = hourlyData.map(hour => hour.wind_kph);

  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Velocidade do Vento (kph)',
        data: windSpeeds,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
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
        display: true,
        text: 'Velocidade do Vento Horária',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Velocidade (kph)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Hora',
        },
      },
    },
  };

  return (
    <div className="wind-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default WindChart;
