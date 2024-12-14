// src/components/PrecipitationMap.jsx
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './PrecipitationMap.css';

const PrecipitationMap = ({ forecast }) => {
  if (!forecast || !forecast.forecastday) return null;

  const { lat, lon } = forecast.location;
  const forecastDays = forecast.forecast.forecastday;

  return (
    <div className="precipitation-map">
      <h3>Mapa de Precipitação</h3>
      <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {forecastDays.map((day, index) => (
          <CircleMarker
            key={index}
            center={[lat, lon]}
            radius={day.day.totalprecip_mm / 2} 
            color="blue"
            fillColor="blue"
            fillOpacity={0.4}
          >
            <Tooltip direction="right" offset={[10, 0]} opacity={1} permanent>
              {`${day.date}: ${day.day.totalprecip_mm} mm`}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PrecipitationMap;
