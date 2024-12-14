
import React from 'react';
import './CurrentWeather.css';
import { FaPlus, FaHeart } from 'react-icons/fa'; 

const CurrentWeather = ({ data, onAddFavorite, onRemoveFavorite, favorites, minTemp, maxTemp }) => {
  if (!data) return null;

  const { location, current } = data; 
  
  

  const name = location.name;
  const countryName = location.country;
  const isFavorite = favorites.some(fav => fav.city === name);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(name);
    } else {
      
      onAddFavorite({ city: name, countryName: countryName });
    }
  };

  
  const formatDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="current-weather">


      <div className='info-container-main'>
 
        <div className='container-temp'>
          <div className='temp-container'>
            <p className='temp'>{Math.round(current.temp_c)}</p>
            <span className='degree'>º</span>
          </div>
        </div>
        <p className='condition-text'>{current.condition.text}</p>
        <div className='temp-min-max'>
          <p className='min-temp'>Min: {minTemp !== undefined ? `${Math.round(minTemp)}ºC` : 'N/A'}</p>
          <p className='max-temp'>Max: {maxTemp !== undefined ? `${Math.round(maxTemp)}ºC` : 'N/A'}</p>
        </div>
      </div>

   
    
    </div>
  );
};

export default CurrentWeather;
