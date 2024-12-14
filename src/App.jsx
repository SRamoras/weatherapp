import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Layout/Header';
import HeaderTop from './components/Layout/HeaderTop';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import Phone from './components/Phone';
import Card from './components/Card';


import '@fortawesome/fontawesome-free/css/all.min.css';

import { 
  getCurrentWeather, 
  getForecast, 
  getCurrentWeatherByCoords, 
  getForecastByCoords, 
  getLocationByIP 
} from './services/api';
import './App.css';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [showFavoritesPage, setShowFavoritesPage] = useState(false);

  
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isClosingSearchBar, setIsClosingSearchBar] = useState(false);

  
  const containerRef = useRef(null);
  const isDownRef = useRef(false);
  const startYRef = useRef(0);
  const scrollTopRef = useRef(0);

  useEffect(() => {
    const fetchLocationByIP = async () => {
      try {
        setError('');
        setLoading(true);
        const response = await getLocationByIP();
        const { loc, city, country } = response.data;
        if (!loc) {
          throw new Error('Location not found.');
        }
        const [latitude, longitude] = loc.split(',').map(Number);
        setCoords({ latitude, longitude, city, country });
      } catch (err) {
        console.error('Error getting location by IP:', err);
        setError('Unable to get your location.');
      } finally {
        setLoading(false);
      }
    };
    fetchLocationByIP();
  }, []);

  useEffect(() => {
    const fetchWeatherByCoords = async () => {
      if (coords) {
        try {
          setError('');
          setLoading(true);
          const { latitude, longitude } = coords;
          const weatherResponse = await getCurrentWeatherByCoords(latitude, longitude);
          setCurrentWeather(weatherResponse.data);
          const forecastResponse = await getForecastByCoords(latitude, longitude);
          setForecast(forecastResponse.data);
        } catch (err) {
          console.error('Error fetching by coordinates:', err);
          if (err.response) {
            setError(err.response.data.error?.message || 'API response error.');
          } else if (err.request) {
            setError('No API response. Check your connection.');
          } else {
            setError('Request setup error.');
          }
          setCurrentWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWeatherByCoords();
  }, [coords]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favorites updated in localStorage:', favorites);
  }, [favorites]);

  const handleSearch = async (city) => {
    try {
      setError('');
      setLoading(true);
      const weatherResponse = await getCurrentWeather(city);
      setCurrentWeather(weatherResponse.data);
      const forecastResponse = await getForecast(city);
      setForecast(forecastResponse.data);
      const { lat, lon } = weatherResponse.data.location;
      const countryName = weatherResponse.data.location.country;
      setCoords({ 
        latitude: parseFloat(lat), 
        longitude: parseFloat(lon), 
        city: weatherResponse.data.location.name, 
        country: countryName 
      });
      
      handleCloseSearchBar();
    } catch (err) {
      console.error('Search error:', err);
      if (err.response) {
        setError(err.response.data.error?.message || 'API response error.');
      } else if (err.request) {
        setError('No API response. Check your connection.');
      } else {
        setError('Request setup error.');
      }
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (cityObj) => {
    if (cityObj.city && cityObj.countryName && !favorites.find(fav => fav.city === cityObj.city)) {
      if (currentWeather && forecast) {
        const updatedFavorites = [
          ...favorites, 
          {
            city: cityObj.city,
            countryName: cityObj.countryName,
            currentTemp: currentWeather.current.temp_c,
            minTemp: forecast.forecast.forecastday[0].day.mintemp_c,
            maxTemp: forecast.forecast.forecastday[0].day.maxtemp_c,
            conditionText: currentWeather.current.condition.text,
            conditionIcon: currentWeather.current.condition.icon,
            isDay: currentWeather.current.is_day === 1
          }
        ];
        setFavorites(updatedFavorites);
        console.log(`Added to favorites: ${cityObj.city}`, updatedFavorites);
      } else {
        console.error('Weather data not available to add to favorites.');
      }
    } else {
      console.error('Invalid or already existing favorite:', cityObj);
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(fav => fav.city !== city);
    setFavorites(updatedFavorites);
    console.log(`Removed from favorites: ${city}`, updatedFavorites);
  };

  const getBackgroundClass = () => {
    if (!currentWeather || !currentWeather.current || !currentWeather.current.condition) return 'default-background';
    const weatherText = currentWeather.current.condition.text.toLowerCase();
    const isDay = currentWeather.current.is_day === 1; 

    const getClass = (base) => {
      return isDay ? `${base}-day` : `${base}-night`;
    };

    if (weatherText.includes('sun') || weatherText.includes('clear') || weatherText.includes('sunny')) {
      return getClass('clear-background');
    } else if (weatherText.includes('cloud') || weatherText.includes('overcast') || weatherText.includes('partly')) {
      return getClass('cloudy-background');
    } else if (weatherText.includes('rain') || weatherText.includes('drizzle') || weatherText.includes('shower')) {
      return getClass('rainy-background');
    } else if (weatherText.includes('thunder') || weatherText.includes('tstorm')) {
      return getClass('thunderstorm-background');
    } else if (weatherText.includes('snow') || weatherText.includes('sleet') || weatherText.includes('blizzard')) {
      return getClass('snow-background');
    } else if (weatherText.includes('mist') || weatherText.includes('fog') || weatherText.includes('haze')) {
      return getClass('mist-background');
    } else {
      return getClass('default-background');
    }
  };

  const getBackgroundClassColor = () => {
    if (!currentWeather || !currentWeather.current || !currentWeather.current.condition) return 'default-background-color';
    const weatherText = currentWeather.current.condition.text.toLowerCase();

    if (weatherText.includes('sun') || weatherText.includes('clear') || weatherText.includes('sunny')) {
      return 'clear-background-color';
    } else if (weatherText.includes('cloud') || weatherText.includes('overcast') || weatherText.includes('partly')) {
      return 'cloudy-background-color';
    } else if (weatherText.includes('rain') || weatherText.includes('drizzle') || weatherText.includes('shower')) {
      return 'rainy-background-color';
    } else if (weatherText.includes('thunder') || weatherText.includes('tstorm')) {
      return 'thunderstorm-background-color';
    } else if (weatherText.includes('snow') || weatherText.includes('sleet') || weatherText.includes('blizzard')) {
      return 'snow-background-color';
    } else if (weatherText.includes('mist') || weatherText.includes('fog') || weatherText.includes('haze')) {
      return 'mist-background-color';
    } else {
      return 'default-background-color';
    }
  };

  const handleSettingsClick = () => {
    setShowFavoritesPage(true);
  };

  const handleCloseFavoritesPage = () => {
    setShowFavoritesPage(false);
  };

  const handleCloseSearchBar = () => {
    
    setIsClosingSearchBar(true);
 
    setTimeout(() => {
      setShowSearchBar(false);
      setIsClosingSearchBar(false);
    }, 300);
  };

  const handleSearchIconClick = () => {
    if (showSearchBar) {
      handleCloseSearchBar();
    } else {
      setShowSearchBar(true);
    }
  };

  const handleLocationClick = () => {
    if (showSearchBar) {
      handleCloseSearchBar();
    } else {
      setShowSearchBar(true);
    }
  };

  const minTemp = forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c;
  const maxTemp = forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c;

  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      isDownRef.current = true;
      container.classList.add('active-cursor');
      startYRef.current = e.pageY - container.offsetTop;
      scrollTopRef.current = container.scrollTop;
    };

    const handleMouseLeave = () => {
      isDownRef.current = false;
      container.classList.remove('active-cursor');
    };

    const handleMouseUp = () => {
      isDownRef.current = false;
      container.classList.remove('active-cursor');
    };

    const handleMouseMove = (e) => {
      if (!isDownRef.current) return;
      e.preventDefault();
      const y = e.pageY - container.offsetTop;
      const walk = (y - startYRef.current) * 1; 
      container.scrollTop = scrollTopRef.current - walk;
    };

    
    const handleTouchStart = (e) => {
      isDownRef.current = true;
      startYRef.current = e.touches[0].pageY - container.offsetTop;
      scrollTopRef.current = container.scrollTop;
    };

    const handleTouchEnd = () => {
      isDownRef.current = false;
    };

    const handleTouchMove = (e) => {
      if (!isDownRef.current) return;
      const y = e.touches[0].pageY - container.offsetTop;
      const walk = (y - startYRef.current) * 1; 
      container.scrollTop = scrollTopRef.current - walk;
    };

    
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchmove', handleTouchMove);

    
    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);

      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Phone/>
      <div 
        ref={containerRef}
        className={`main-container-home-page ${getBackgroundClass()} ${getBackgroundClassColor()} ${showFavoritesPage ? 'no-scroll' : ''}`}
      >
        <HeaderTop 
          currentWeather={currentWeather}
          favorites={favorites}
          onLocationClick={handleLocationClick}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          onSettingsClick={handleSettingsClick}
        />
        {showSearchBar && (
          <SearchBar
            onSearch={handleSearch}
            onClose={handleCloseSearchBar}
            isClosing={isClosingSearchBar}
          />
        )}
        {loading && <div className="spinner"></div>}
        {error && <p className="error">{error}</p>}
        <div className="app">
          <CurrentWeather 
            data={currentWeather} 
            onAddFavorite={addFavorite} 
            onRemoveFavorite={removeFavorite} 
            favorites={favorites}
            minTemp={minTemp}
            maxTemp={maxTemp}
          />
          {forecast && forecast.forecast && forecast.forecast.forecastday && forecast.forecast.forecastday.length > 0 && (
            <HourlyForecast hourlyData={forecast.forecast.forecastday[0].hour} />
          )}
          {forecast && <Forecast data={forecast} />}
        </div>
        {showFavoritesPage && (
          <FavoritesPage 
            favorites={favorites} 
            onClose={handleCloseFavoritesPage} 
            onSelectFavorite={handleSearch} 
            onRemoveFavorite={removeFavorite}
          />
        )}
      </div>

      <Card />
    </div>
  );
};

export default App;
