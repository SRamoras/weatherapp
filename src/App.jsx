// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import HeaderTop from './components/Layout/HeaderTop';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import Favorites from './components/Favorites/Favorites';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
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

  // Controla a barra de busca
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isClosingSearchBar, setIsClosingSearchBar] = useState(false);

  useEffect(() => {
    const fetchLocationByIP = async () => {
      try {
        setError('');
        setLoading(true);
        const response = await getLocationByIP();
        const { loc, city, country } = response.data;
        if (!loc) {
          throw new Error('Localização não encontrada.');
        }
        const [latitude, longitude] = loc.split(',').map(Number);
        setCoords({ latitude, longitude, city, country });
      } catch (err) {
        console.error('Erro ao obter localização por IP:', err);
        setError('Não foi possível obter sua localização.');
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
          console.error('Erro na busca por coordenadas:', err);
          if (err.response) {
            setError(err.response.data.error?.message || 'Erro na resposta da API.');
          } else if (err.request) {
            setError('Nenhuma resposta da API. Verifique sua conexão.');
          } else {
            setError('Erro ao configurar a requisição.');
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
    console.log('Favoritos atualizados no localStorage:', favorites);
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
      setCoords({ latitude: parseFloat(lat), longitude: parseFloat(lon), city: weatherResponse.data.location.name, country: countryName });
      // Fechar a SearchBar com animação
      handleCloseSearchBar();
    } catch (err) {
      console.error('Erro na busca:', err);
      if (err.response) {
        setError(err.response.data.error?.message || 'Erro na resposta da API.');
      } else if (err.request) {
        setError('Nenhuma resposta da API. Verifique sua conexão.');
      } else {
        setError('Erro ao configurar a requisição.');
      }
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = (cityObj) => {
    if (cityObj.city && cityObj.countryName && !favorites.find(fav => fav.city === cityObj.city)) {
      // Certifique-se de que currentWeather e forecast estão disponíveis
      if (currentWeather && forecast) {
        const updatedFavorites = [
          ...favorites, 
          {
            city: cityObj.city,
            countryName: cityObj.countryName,
            currentTemp: currentWeather.current.temp_c, // Adicionado
            minTemp: forecast.forecast.forecastday[0].day.mintemp_c,
            maxTemp: forecast.forecast.forecastday[0].day.maxtemp_c,
            conditionText: currentWeather.current.condition.text,
            conditionIcon: currentWeather.current.condition.icon,
          }
        ];
        setFavorites(updatedFavorites);
        console.log(`Adicionado aos favoritos: ${cityObj.city}`, updatedFavorites);
      } else {
        console.error('Dados meteorológicos não disponíveis para adicionar aos favoritos.');
      }
    } else {
      console.error('Favorito inválido ou já existente:', cityObj);
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(fav => fav.city !== city);
    setFavorites(updatedFavorites);
    console.log(`Removido dos favoritos: ${city}`, updatedFavorites);
  };

  const getBackgroundClass = () => {
    if (!currentWeather || !currentWeather.current || !currentWeather.current.condition) return 'default-background';
    const weatherText = currentWeather.current.condition.text.toLowerCase();
    if (weatherText.includes('claro') || weatherText.includes('sol') || weatherText.includes('ensolarado')) {
      return 'clear-background';
    } else if (weatherText.includes('nublado') || weatherText.includes('nuvem') || weatherText.includes('parcialmente nublado') || weatherText.includes('overcast') || weatherText.includes('partly')) {
      return 'cloudy-background';
    } else if (weatherText.includes('chuva') || weatherText.includes('chuvisco') || weatherText.includes('garoa') || weatherText.includes('drizzle') || weatherText.includes('shower')) {
      return 'rainy-background';
    } else if (weatherText.includes('trovão') || weatherText.includes('thunder')) {
      return 'thunderstorm-background';
    } else if (weatherText.includes('neve') || weatherText.includes('snow') || weatherText.includes('sleet')) {
      return 'snow-background';
    } else if (weatherText.includes('névoa') || weatherText.includes('nevoeiro') || weatherText.includes('haze') || weatherText.includes('fog') || weatherText.includes('mist')) {
      return 'mist-background';
    } else {
      return 'default-background';
    }
  };

  const getBackgroundClassColor = () => {
    if (!currentWeather || !currentWeather.current || !currentWeather.current.condition) return 'default-background-color';
    const weatherText = currentWeather.current.condition.text.toLowerCase();
    if (weatherText.includes('claro') || weatherText.includes('sol') || weatherText.includes('ensolarado')) {
      return 'clear-background-color';
    } else if (weatherText.includes('nublado') || weatherText.includes('nuvem') || weatherText.includes('parcialmente nublado') || weatherText.includes('overcast') || weatherText.includes('partly')) {
      return 'cloudy-background-color';
    } else if (weatherText.includes('chuva') || weatherText.includes('chuvisco') || weatherText.includes('garoa') || weatherText.includes('drizzle') || weatherText.includes('shower')) {
      return 'rainy-background-color';
    } else if (weatherText.includes('trovão') || weatherText.includes('thunder')) {
      return 'thunderstorm-background-color';
    } else if (weatherText.includes('neve') || weatherText.includes('snow') || weatherText.includes('sleet')) {
      return 'snow-background-color';
    } else if (weatherText.includes('névoa') || weatherText.includes('nevoeiro') || weatherText.includes('haze') || weatherText.includes('fog') || weatherText.includes('mist')) {
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
    // Inicia a animação de fechamento
    setIsClosingSearchBar(true);
    // Após 300ms (tempo da animação), realmente fecha o componente
    setTimeout(() => {
      setShowSearchBar(false);
      setIsClosingSearchBar(false);
    }, 300);
  };

  const handleSearchIconClick = () => {
    if (showSearchBar) {
      // Se já está aberto, iniciar a animação de fechamento
      handleCloseSearchBar();
    } else {
      // Abrir a barra de busca
      setShowSearchBar(true);
    }
  };

  const handleLocationClick = () => {
    if (showSearchBar) {
      // Fechar com animação
      handleCloseSearchBar();
    } else {
      setShowSearchBar(true);
    }
  };
  const minTemp = forecast?.forecast?.forecastday?.[0]?.day?.mintemp_c;
  const maxTemp = forecast?.forecast?.forecastday?.[0]?.day?.maxtemp_c;
  return (
    <div>
      <div className={`main-container-home-page ${getBackgroundClass()} ${getBackgroundClassColor()}`}>
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
            // Passando a prop isClosing para controlar a animação
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
        {/* <Favorites 
          favorites={favorites} 
          onSelectFavorite={handleSearch} 
          onRemoveFavorite={removeFavorite} 
        /> */}
        {showFavoritesPage && (
          <FavoritesPage 
            favorites={favorites} 
            onClose={handleCloseFavoritesPage} 
            onSelectFavorite={handleSearch} 
            onRemoveFavorite={removeFavorite}
          />
        )}
      </div>
      {/* <Header
        onLocationClick={handleLocationClick}
        onSettingsClick={handleSettingsClick}
        onSearchIconClick={handleSearchIconClick}
      /> */}
    </div>
  );
};

export default App;
