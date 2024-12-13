// src/services/api.js
import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; 
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN; 
const BASE_URL = 'https://api.weatherapi.com/v1';

// Force English language
const userLang = 'en';

// Current weather by city using WeatherAPI
export const getCurrentWeather = (city) => {
  return axios.get(`${BASE_URL}/current.json`, {
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

// Forecast (including hourly) up to 7 days using WeatherAPI
export const getForecast = (city) => {
  return axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: WEATHER_API_KEY,
      q: city,
      days: 7,
      lang: userLang
    },
  });
};

// Current weather by coordinates
export const getCurrentWeatherByCoords = (lat, lon) => {
  const query = `${lat},${lon}`;
  return axios.get(`${BASE_URL}/current.json`, {
    params: {
      key: WEATHER_API_KEY,
      q: query,
      lang: userLang
    },
  });
};

// Forecast by coordinates
export const getForecastByCoords = (lat, lon) => {
  const query = `${lat},${lon}`;
  return axios.get(`${BASE_URL}/forecast.json`, {
    params: {
      key: WEATHER_API_KEY,
      q: query,
      days: 7,
      lang: userLang
    },
  });
};

// Location by IP using ipinfo.io
export const getLocationByIP = () => {
  return axios.get(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
};

// Country info using REST Countries API
export const getCountryInfo = (countryName) => {
  return axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
};
