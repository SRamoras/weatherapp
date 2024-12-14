// src/components/Card.jsx
import React from 'react';
import './Card2.css';

const Card = () => {
  return (
    <div className="card2">
      <h1>Weather-App</h1>
      <p>A React-based application that provides real-time weather updates for any location. Features include current temperature, humidity, wind speed, and detailed weather conditions, all presented with a clean and responsive design for an optimal user experience across devices.</p>
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
        </div> 
      </div>

  );
};

export default Card;
