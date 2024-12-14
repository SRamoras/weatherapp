// src/components/Card.jsx
import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">Weather App</h2>
        <p className="card-description">
          Demonstrates my ability to integrate APIs within a React application. This project fetches and displays real-time weather data, including current conditions and hourly forecasts.
        </p>
        <ul className="card-features">
          <li><strong>API Integration:</strong> Utilizes WeatherAPI for comprehensive weather data.</li>
       
          <li><strong>Error Handling:</strong> Manages API errors gracefully.</li>
          <li><strong>Interactive UI:</strong> Features components like Hourly Forecast for enhanced user experience.</li>
        </ul>
        <div className="social-buttons">
          <a href="https://www.linkedin.com/in/diogo-silva-94068613b/" target="_blank" rel="noopener noreferrer">
            <button className="linkedin-button">
              <i className="fab fa-linkedin"></i> LinkedIn
            </button>
          </a>
          <a href="https://github.com/SRamoras" target="_blank" rel="noopener noreferrer">
            <button className="github-button">
              <i className="fab fa-github"></i> GitHub
            </button>
          </a>
        </div>    </div>
      </div>

  );
};

export default Card;
