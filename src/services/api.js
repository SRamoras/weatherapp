// src/services/api.js
import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // Agora usando WeatherAPI
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN; // Permanece o mesmo para localização por IP
const BASE_URL = 'https://api.weatherapi.com/v1';
// Função para mapear a linguagem do usuário para a API WeatherAPI
const getUserLang = () => {
  const langRaw = navigator.language || 'pt-BR';
  const langLower = langRaw.toLowerCase();
  // WeatherAPI usa códigos de idioma tipo 'pt'
  // Vamos simplificar: se 'pt-BR' usa 'pt', caso contrário usa 'en' como fallback
  if (langLower.startsWith('pt')) {
    return 'pt';
  } else {
    return 'en';
  }
};

const userLang = getUserLang();

// Função para obter clima atual por cidade usando WeatherAPI
export const getCurrentWeather = (city) => {
  return axios.get('https://api.weatherapi.com/v1/current.json', {
    params: {
      key: WEATHER_API_KEY,
      q: city,
      lang: userLang
    },
  });
};
export const getCitySuggestions = (query) => {
    return axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: query,
      },
    });
  };
// Função para obter previsão (incluindo horária) até 7 dias usando WeatherAPI
export const getForecast = (city) => {
  return axios.get('https://api.weatherapi.com/v1/forecast.json', {
    params: {
      key: WEATHER_API_KEY,
      q: city,
      days: 7, // Máximo no plano gratuito
      lang: userLang
    },
  });
};

// Obter clima atual por coordenadas (WeatherAPI não suporta diretamente lat/lon sem cidade, mas podemos usar q=lat,lon)
export const getCurrentWeatherByCoords = (lat, lon) => {
  const query = `${lat},${lon}`;
  return axios.get('https://api.weatherapi.com/v1/current.json', {
    params: {
      key: WEATHER_API_KEY,
      q: query,
      lang: userLang
    },
  });
};

// Obter previsão por coordenadas
export const getForecastByCoords = (lat, lon) => {
  const query = `${lat},${lon}`;
  return axios.get('https://api.weatherapi.com/v1/forecast.json', {
    params: {
      key: WEATHER_API_KEY,
      q: query,
      days: 7,
      lang: userLang
    },
  });
};

// Função para obter localização baseada no IP usando ipinfo.io
export const getLocationByIP = () => {
  return axios.get(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
};

// Função para obter informações do país usando REST Countries API buscando por nome do país
export const getCountryInfo = (countryName) => {
  return axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
};
