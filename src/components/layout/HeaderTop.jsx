// src/components/Layout/HeaderTop.jsx
import React from 'react';
import './HeaderTop.css';
// Removido: import { FaPlus, FaHeart } from 'react-icons/fa'; // Importando os ícones

const HeaderTop = ({ onLocationClick, currentWeather, favorites, addFavorite, removeFavorite, onSettingsClick }) => {
  // Extraindo a cidade e o nome do país de currentWeather
  const city = currentWeather?.location?.name;
  const countryName = currentWeather?.location?.country;

  // Verifica se a cidade atual já está nos favoritos
  const isFavorite = city && favorites.some(fav => fav.city === city);

  const handleFavoriteClick = () => {
    if (!city || !countryName) return; // Se não tiver a cidade carregada corretamente

    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite({ city, countryName });
    }
  };

  return (
    <header className="header-top">
      {city && (
        <button
          className='button-add'
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        >
          {isFavorite ? (
            <span className="material-symbols-outlined favorite-icon">
              add_task
            </span>
          ) : (
            <span className="material-symbols-outlined add-icon">
              add
            </span>
          )}
        </button>
      )}

      {/* Exibe o nome da cidade e do país somente se ambos estiverem disponíveis */}
      <div className='location-container-header'>
        {city && countryName ? (
          <h2>{city}, {countryName}</h2>
        ) : (
          <h2>Carregando...</h2>
        )}
        <button className="icon-button" onClick={onLocationClick} title="Localização">
          <span className="material-symbols-outlined">
            location_on
          </span>
        </button>
      </div>

      <button
        className="icon-button"
        onClick={onSettingsClick}
        title="Configurações"
        aria-label="Configurações"
      >
        <span className="material-symbols-outlined">
          settings
        </span>
      </button>
    </header>
  );
};

export default HeaderTop;
