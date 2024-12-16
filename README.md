# WeatherApp

![WeatherApp Screenshot](./src/assets/banner.png)

## Description

**WeatherApp** is a web application developed with React that simulates a smartphone interface to display weather information. This project demonstrates the use of various APIs to provide real-time data on weather, location, and country information. Due to API restrictions, some data may be limited. Additionally, to ensure proper location functionality, it is necessary to disable ad blockers.

## Features

- **Current Weather Forecast**: Displays the current weather conditions for a specific city.
- **City Suggestions**: Provides city suggestions as the user types.
- **Extended Forecast**: Shows a 7-day weather forecast, including hourly data.
- **IP-Based Location**: Automatically detects the user's location based on their IP address.
- **Country Information**: Displays detailed information about the country of the current location.
- 
## 🌐 Live Demo

- **Website:** [Storytime Live](https://sramoras.github.io/weatherapp/)
- 
## Technologies Used

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white&style=flat)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=flat)

### APIs Used

- [![WeatherAPI](https://img.shields.io/badge/-WeatherAPI-000000?logo=weatherapi&logoColor=white&style=flat)](https://www.weatherapi.com/)
- [![ipinfo.io](https://img.shields.io/badge/-ipinfo.io-000000?logo=ipinfo&logoColor=white&style=flat)](https://ipinfo.io/)
- [![REST Countries](https://img.shields.io/badge/-REST_Countries-000000?logo=restcountries&logoColor=white&style=flat)](https://restcountries.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SRamoras/weatherapp.git
cd weatherapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of the project and add the following variables:
```bash
VITE_OPENWEATHER_API_KEY=YOUR_WEATHERAPI_KEY
VITE_IPINFO_TOKEN=YOUR_IPINFO_TOKEN
```
- **VITE_OPENWEATHER_API_KEY**: API key from WeatherAPI.
- **VITE_IPINFO_TOKEN**: Access token from ipinfo.io.

### 4. Start the Application
```bash
npm run dev
```

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 📫 Contact

For more information, feel free to reach out:

- **LinkedIn:** [Diogo Silva](https://www.linkedin.com/in/diogo-silva-94068613b/)
- **GitHub:** [SRamoras](https://github.com/SRamoras)

---
