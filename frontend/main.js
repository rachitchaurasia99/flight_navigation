import Globe from 'globe.gl';
import City from './models/city.js';

// Create the globe
const globe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  (document.getElementById('globe-container'));

// Sample data for cities
const cities = City.findAll();

// Convert the data into a format Globe.gl can use
const cityPoints = cities.map(city => ({
  lat: parseFloat(city.latitude),
  lng: parseFloat(city.longitude),
  size: 0.1,
  color: 'red',
  name: city.name
}));

// Add the points to the globe
globe
  .pointsData(cityPoints)
  .pointAltitude('size')
  .pointColor('color')
  .pointLabel('name');
