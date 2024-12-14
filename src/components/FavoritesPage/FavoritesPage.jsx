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

  const getBackgroundClassForCondition = (conditionText, isDay) => {
    if (!conditionText) return isDay ? 'default-background-day' : 'default-background-night';
    const text = conditionText.toLowerCase();

    const getClass = (base) => {
      return isDay ? `${base}-day` : `${base}-night`;
    };

    if (text.includes('sun') || text.includes('clear') || text.includes('sunny')) {
      return getClass('clear-background');
    } else if (text.includes('cloud') || text.includes('overcast')|| text.includes('cloudy') || text.includes('partly')) {
      return getClass('cloudy-background');
    } else if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
      return getClass('rainy-background');
    } else if (text.includes('thunder') || text.includes('tstorm')) {
      return getClass('thunderstorm-background');
    } else if (text.includes('snow') || text.includes('sleet') || text.includes('blizzard')) {
      return getClass('snow-background');
    } else if (text.includes('mist') || text.includes('fog') || text.includes('haze')) {
      return getClass('mist-background');
    } else {
      return getClass('default-background');
    }
  };

  return (
    <div className="favorites-page-overlay" onClick={handleClose}>
      <div 
        className={`favorites-page-content ${isClosing ? 'slideDown' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="favorites-header">
          <h2>Saved Favorites</h2>
          <button className="close-button2" onClick={handleClose}>
            <span className="material-symbols-outlined fav-icon-close">
              cancel
            </span>
          </button>
        </div>
        {favorites.length === 0 ? (
          <p>No favorites saved.</p>
        ) : (
          <ul className="favorites-list">
            {favorites.map((fav, index) => (
              <li 
                key={index}
                className={`favorites-list-item ${getBackgroundClassForCondition(fav.conditionText, fav.isDay)}`}
                onClick={() => onSelectFavorite(fav.city)}
              >
                <div className="favorite-info">
                  <div>
                    <div className='container-info-fav1'>
                      <span className="favorite-current-temp">{fav.currentTemp}°C</span>
                    </div>
                    <div className='container-info-fav'>
                      <span className="favorite-city">{fav.city}, {fav.countryName}</span>
                      <span className="favorite-temps">Min: {fav.minTemp}°C / Max: {fav.maxTemp}°C</span>
                      <span className="favorite-condition">
                        {fav.conditionIcon && (
                          <img src={fav.conditionIcon} alt={fav.conditionText} className="condition-icon" />
                        )}
                        {fav.conditionText}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="remove-favorite" 
                    onClick={(e) => {e.stopPropagation(); onRemoveFavorite(fav.city);}}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
