// src/components/Card.jsx
import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">Purpose of this project</h2>
        <p className="card-description">
          Demonstrates my ability to integrate APIs within a React application. This project fetches and displays real-time weather data, including current conditions and hourly forecasts.
        </p>
        {/* <ul className="card-features">
          <li><strong>API Integration:</strong> Utilizes WeatherAPI for comprehensive weather data.</li>
       
          <li><strong>Error Handling:</strong> Manages API errors gracefully.</li>
          <li><strong>Interactive UI:</strong> Features components like Hourly Forecast for enhanced user experience.</li>
        </ul> */}
         </div>
      </div>

  );
};

export default Card;
