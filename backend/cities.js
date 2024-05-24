import axios from 'axios';
import City from './models/city.js';
import dotenv from 'dotenv';

dotenv.config();

const params = {
  access_key: process.env.AVIATION_STACK_API_KEY,
};

async function fetchCities() {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/cities', { params });
    const apiResponse = response.data;

    if (Array.isArray(apiResponse.data)) {
      for (const city of apiResponse.data) {
        console.log(`City: ${city.city_name}, Country: ${city.country_iso2}`);
        await City.findOrCreate({
          where: { name: city.city_name, country_iso2: city.country_iso2 },
          defaults: {
            name: city.city_name,
            iata_code: city.iata_code,
            country_iso2: city.country_iso2,
            latitude: city.latitude,
            longitude: city.longitude,
            timezone: city.timezone,
            gmt: city.gmt,
            geoname_id: city.geoname_id,
          }
        });
      }
      console.log('Data successfully stored in the database.');
    } else {
      console.log('No results found in the response.');
    }
  } catch (error) {
    console.error('Error fetching data from the API:', error);
  }
}

export default fetchCities;
