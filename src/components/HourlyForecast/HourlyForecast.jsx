// src/components/HourlyForecast/HourlyForecast.jsx
import React, { useEffect } from 'react';
import './HourlyForecast.css';

const HourlyForecast = ({ hourlyData }) => {
  useEffect(() => {
    console.log('hourlyData recebido:', hourlyData);
  }, [hourlyData]);

  if (!hourlyData || hourlyData.length === 0) return null;

  // Seleciona os primeiros 5 itens
  const selectedHourlyData = hourlyData.slice(0, 5);
  console.log('selectedHourlyData (primeiros 5):', selectedHourlyData);

  // Configuração do formatador para português do Brasil com uma casa decimal
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div className="hourly-forecast">
      <div className="forecast-header">
        <span className="material-symbols-outlined calendar-icon">
          schedule
        </span>
        <h3>It seems like today's weather is fun and perfect for walks in the park, or relaxing outdoors.</h3>
      </div>
      <div className="divider"></div>
      <div className="hourly-items-container">
        {selectedHourlyData.map((hour, index) => (
          <div key={index} className="hourly-item">
            <p className="hour">
              {index === 0
                ? 'Agora'
                : new Date(hour.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <img 
              src={`https:${hour.condition.icon}`} 
              alt={hour.condition.text} 
              className="weather-icon"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = '/path/to/default-icon.png'; // Substitua pelo caminho do ícone padrão
              }}
            />
            <p className="temp">{formatter.format(hour.temp_c)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
