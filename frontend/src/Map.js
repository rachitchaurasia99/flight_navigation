import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 0,
  lng: 0
};

const isValidLatLng = (lat, lng) => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng)
  );
};

const Map = () => {
  const [flightData, setFlightData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get('/api/flights');
        setFlightData(response.data);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchFlightData();
    fetchWeatherData();
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        {flightData.map(flight => (
          isValidLatLng(flight.departure_lat, flight.departure_lon) && isValidLatLng(flight.arrival_lat, flight.arrival_lon) ? (
            <React.Fragment key={flight.id}>
              <Marker
                position={{ lat: flight.departure_lat, lng: flight.departure_lon }}
                label={`Departure: ${flight.departure_airport}`}
              />
              <Marker
                position={{ lat: flight.arrival_lat, lng: flight.arrival_lon }}
                label={`Arrival: ${flight.arrival_airport}`}
              />
              <Polyline
                path={[
                  { lat: flight.departure_lat, lng: flight.departure_lon },
                  { lat: flight.arrival_lat, lng: flight.arrival_lon }
                ]}
                options={{ strokeColor: '#FF0000' }}
              />
            </React.Fragment>
          ) : null
        ))}
        {weatherData.map(weather => (
          isValidLatLng(weather.lat, weather.lon) ? (
            <Marker
              key={weather.id}
              position={{ lat: weather.lat, lng: weather.lon }}
              label={`${weather.city}: ${weather.description}`}
            />
          ) : null
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
