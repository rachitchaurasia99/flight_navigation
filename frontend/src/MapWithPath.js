// import React, { useEffect, useState, useCallback } from 'react';
// import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
// import axios from 'axios';

// const MapWithPath = () => {
//   const [path, setPath] = useState([]);

//   useEffect(() => {
//     const fetchPath = async () => {
//       try {
//         // const response = await axios.get('http://localhost:3000/shortestPath?source=Anaa&destination=Aden');
//         const response = await axios.get('http://localhost:3000/shortestPath?source=Adelaide&destination=Aden');
//         // const response = await axios.get('http://localhost:3000/shortestPath?source=Anaa&destination=Aden');
//         setPath(response.data.path);
//       } catch (error) {
//         console.error('Error fetching the path:', error);
//       }
//     };

//     fetchPath();
//   }, []);

//   const mapContainerStyle = {
//     height: '100vh',
//     width: '100%',
//   };

//   const center = path.length > 0 ? { lat: parseFloat(path[0].latitude), lng: parseFloat(path[0].longitude) } : { lat: 0, lng: 0 };
// // console.log(path.map(city => ({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) })))
//   const polylinePath = path.map(city => ({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }));

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyA_Z37MjazhOX5jVd0qHHL6XD8bQ8q-yPE">
//       <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={3}>
//         {path.map((city, index) => (
//           <Marker key={index} position={{ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }} label={city.cityName} />
//         ))}
//         <Polyline path={polylinePath} options={{ strokeColor: '#FF0000', strokeOpacity:0.8, strokeWeight:2, visible: true, fillColor: '#FFFFFF' }} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapWithPath;

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import axios from 'axios';

const MapWithPath = () => {
  const [path, setPath] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const fetchPath = async (src, dest) => {
    try {
      const response = await axios.get(`http://localhost:3000/shortestPath?source=${src}&destination=${dest}`);
      setPath(response.data.path);
    } catch (error) {
      console.error('Error fetching the path:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPath(source, destination);
  };

  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
  };

  const center = path.length > 0 ? { lat: parseFloat(path[0].latitude), lng: parseFloat(path[0].longitude) } : { lat: 0, lng: 0 };

  const polylinePath = path.map(city => ({ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }));

  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
        <label>
          Source:
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Destination:
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <button type="submit" style={{ marginLeft: '10px' }}>Get Path</button>
      </form>
      <LoadScript googleMapsApiKey="AIzaSyA_Z37MjazhOX5jVd0qHHL6XD8bQ8q-yPE">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={3}>
          {path.map((city, index) => (
            <Marker key={index} position={{ lat: parseFloat(city.latitude), lng: parseFloat(city.longitude) }} label={city.cityName} />
          ))}
          <Polyline path={polylinePath} options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2, visible: true, fillColor: '#FFFFFF' }} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapWithPath;
