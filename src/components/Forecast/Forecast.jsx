// src/components/Forecast/Forecast.jsx
import React from 'react';
import './Forecast.css';

const Forecast = ({ data }) => {
  if (!data || !data.forecast || !data.forecast.forecastday) return null;

  const forecastDays = data.forecast.forecastday;

  return (
    <div className="forecast">
      {/* Adicionando o ícone de calendário antes do título */}
      <div className="forecast-header">
        <span className="material-symbols-outlined calendar-icon">
          calendar_month
        </span>
        <h3>Daily Forecast</h3>
      </div>
      <div className="divider"></div> {/* Divisor adicionado aqui */}
      <div className="forecast-container">
        {forecastDays.map((day, index) => {
          const date = new Date(day.date);
          const formattedDate = date.toLocaleDateString('pt-BR', {
            weekday: 'short',
          }).toUpperCase();

          return (
            <div key={index} className="forecast-item">
              <div className='max-min-container-fore-first'>
                <img 
                  src={day.day.condition.icon} 
                  alt={day.day.condition.text} 
                />   
                <p className='day-time-fore'>{formattedDate}</p>
                <p className='condition-text'>{day.day.condition.text}</p>
              </div>
              <div className='max-min-container-fore'>
                <p>{Math.round(day.day.maxtemp_c)}°</p>
                <p>/</p>
                <p>{Math.round(day.day.mintemp_c)}°</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
