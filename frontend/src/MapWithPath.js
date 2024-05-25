import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import axios from 'axios';

const MapWithPath = () => {
  const [path, setPath] = useState([]);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const response = await axios.get('http://localhost:3000/shortestPath?source=Anaa&destination=Aden');
        setPath(response.data.path);
      } catch (error) {
        console.error('Error fetching the path:', error);
      }
    };

    fetchPath();
  }, []);

  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
  };

  const center = path.length > 0 ? { lat: parseFloat(path[0].latitude), lng: parseFloat(path[0].longitude) } : { lat: 0, lng: 0 };
// console.log(path.map(city => ({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) })))
  const polylinePath = path.map(city => ({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }));

  return (
    <LoadScript googleMapsApiKey="AIzaSyA_Z37MjazhOX5jVd0qHHL6XD8bQ8q-yPE">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={3}>
        {path.map((city, index) => (
          <Marker key={index} position={{ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }} label={city.cityName} />
        ))}
        <Polyline path={polylinePath} options={{ strokeColor: '#FF0000', strokeOpacity:0.8, strokeWeight:2, visible: true, fillColor: '#FFFFFF' }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithPath;
