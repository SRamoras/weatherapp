
import React from 'react';
import './HeaderTop.css';


const HeaderTop = ({
  onLocationClick,
  currentWeather,
  favorites,
  addFavorite,
  removeFavorite,
  onSettingsClick
}) => {
  
  const city = currentWeather?.location?.name;
  const countryName = currentWeather?.location?.country;

  
  const isFavorite = city && favorites.some(fav => fav.city === city);

  const handleFavoriteClick = () => {
    if (!city || !countryName) return; 

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

     
      <div className='location-container-header'>
     
        <button className="icon-button" onClick={onLocationClick} title="Localização">
             {city && countryName ? (
          <h2>{city}, {countryName}</h2>
        ) : (
          <h2>Carregando...</h2>
        )}
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
       <span class="material-symbols-outlined">
bookmarks
</span>
      </button>
    </header>
  );
};

export default HeaderTop;
