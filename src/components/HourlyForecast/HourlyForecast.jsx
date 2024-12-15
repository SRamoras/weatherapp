import React, { useEffect } from 'react';
import './HourlyForecast.css';

const HourlyForecast = ({ hourlyData }) => {
  useEffect(() => {
    console.log('hourlyData received:', hourlyData);
  }, [hourlyData]);

  if (!hourlyData || hourlyData.length === 0) return null;

  const selectedHourlyData = hourlyData.slice(0, 5);
  console.log('selectedHourlyData (first 5):', selectedHourlyData);

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const formatHour = (hour, index) => {
    const displayHour = (currentHour + index) % 24;
    return displayHour.toString().padStart(2, '0') + ':00';
  };

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
                ? 'Now'
                : formatHour(hour.time, index)}
            </p>
            <img 
              src={`https:${hour.condition.icon}`} 
              alt={hour.condition.text} 
              className="weather-icon"
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = '/path/to/default-icon.png'; 
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
