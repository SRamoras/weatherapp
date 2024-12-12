// src/components/Favorites/Favorites.jsx
import React, { useEffect, useState, useRef } from 'react';
import './Favorites.css';
import { getCountryInfo } from '../../services/api';
import defaultFlag from '../../assets/default-flag.png';

const Favorites = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  const [flags, setFlags] = useState({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.countryName && !flags[fav.countryName]) {
        getCountryInfo(fav.countryName)
          .then((response) => {
            const data = response.data[0];
            const flagUrl = data?.flags?.png || defaultFlag;
            setFlags((prevFlags) => ({
              ...prevFlags,
              [fav.countryName]: flagUrl,
            }));
          })
          .catch((error) => {
            console.error(`Erro ao obter a bandeira para ${fav.countryName}:`, error);
            setFlags((prevFlags) => ({
              ...prevFlags,
              [fav.countryName]: defaultFlag,
            }));
          });
      }
    });
  }, [favorites, flags]);

  useEffect(() => {
    const checkScroll = () => {
      const container = listRef.current;
      if (!container) return;
      const { scrollLeft, scrollWidth, clientWidth } = container;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollWidth > clientWidth + scrollLeft);
    };

    checkScroll();
    const container = listRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [favorites]);

  const scrollLeftHandler = () => {
    const container = listRef.current;
    if (!container) return;
    container.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRightHandler = () => {
    const container = listRef.current;
    if (!container) return;
    container.scrollBy({ left: 200, behavior: 'smooth' });
  };

  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="favorites-carousel-container">
      <h3>Cidades Favoritas</h3>
      <div className="favorites-carousel">
        {canScrollLeft && (
          <button className="carousel-arrow left" onClick={scrollLeftHandler}>
            &#10094;
          </button>
        )}
        <ul ref={listRef}>
          {favorites.map((fav, index) => (
            <li 
              key={index} 
              className="favorite-item" 
              onClick={() => onSelectFavorite(fav.city)}
            >
              <div className="favorite-content">
                <img 
                  src={flags[fav.countryName] || defaultFlag} 
                  alt={`${fav.countryName} flag`} 
                  className="country-flag"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = defaultFlag; 
                  }}
                />
                <span className="favorite-city">{fav.city}</span>
              </div>
              <button 
                className="remove-button"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  onRemoveFavorite(fav.city); 
                }}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        {canScrollRight && (
          <button className="carousel-arrow right" onClick={scrollRightHandler}>
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default Favorites;
