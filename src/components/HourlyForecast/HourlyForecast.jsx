// src/components/HourlyForecast/HourlyForecast.jsx
import React from 'react';
import './HourlyForecast.css';

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  // Função para obter o índice do horário atual
  const getCurrentHourIndex = () => {
    const now = new Date();
    return hourlyData.findIndex(hour => {
      const hourTime = new Date(hour.time);
      return (
        hourTime.getHours() === now.getHours() &&
        hourTime.getMinutes() === 0 // Supondo que os dados são para cada hora cheia
      );
    });
  };

  const currentIndex = getCurrentHourIndex();

  // Se não encontrar o horário atual, iniciar do começo
  const startIndex = currentIndex !== -1 ? currentIndex : 0;

  // Selecionar apenas 5 itens a partir do horário atual
  const selectedHourlyData = hourlyData.slice(startIndex, startIndex + 5);

  return (
    <div className="hourly-forecast">
      <div className="forecast-header">
        <span className="material-symbols-outlined calendar-icon">
          schedule
        </span>
        <h3>Parece que hoje o tempo está divertido e perfeito para passeios no parque, ou relaxar ao ar livre.</h3>
      </div>
      <div className="divider"></div> {/* Divisor adicionado aqui */}
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
            <p className="temp">{Math.round(hour.temp_c)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
