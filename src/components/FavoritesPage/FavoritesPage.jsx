// src/components/FavoritesPage/FavoritesPage.jsx
import React, { useState } from 'react';
import './FavoritesPage.css';

const FavoritesPage = ({ favorites, onClose, onSelectFavorite, onRemoveFavorite }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="favorites-page-overlay">
      <div className={`favorites-page-content ${isClosing ? 'slideDown' : ''}`}>
        <button className="close-button" onClick={handleClose}>&times;</button>
        <h2>Favoritos Salvos</h2>
        {favorites.length === 0 ? (
          <p>Nenhum favorito salvo.</p>
        ) : (
          <ul className="favorites-list">
            {favorites.map((fav, index) => (
              <li key={index} className="favorites-list-item">
                <div className="favorite-info" onClick={() => onSelectFavorite(fav.city)}>
                  <span className="favorite-city">{fav.city}, {fav.countryName}</span>
                  <span className="favorite-current-temp">Atual: {fav.currentTemp}°C</span> {/* Adicionado */}
                  <span className="favorite-temps">Min: {fav.minTemp}°C / Max: {fav.maxTemp}°C</span>
                  <span className="favorite-condition">
                    {fav.conditionIcon && (
                      <img src={fav.conditionIcon} alt={fav.conditionText} className="condition-icon" />
                    )}
                    {fav.conditionText}
                  </span>
                </div>
                <button onClick={() => onRemoveFavorite(fav.city)} className="remove-favorite">&times;</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
