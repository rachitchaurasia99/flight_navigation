import City from './models/city.js'
import fs from 'fs';
const cities = await City.findAll();

const apikey = process.env.WEATHER_API_KEY
    try {
        // Fetch data from AviationStack API
        var weather = {};
        for(let i=0; i<cities.length; i++){
            const lat = cities[i].latitude
            const lon = cities[i].longitude
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
            const data = await response.json();

            // Extract relevant data from the API response
            const city_weather = data;
            if(city_weather["wind"]["speed"] < 20 || city_weather["visibility"] > 100)
                weather[cities[i].name] = "OK"
            else
                weather[cities[i].name] = "BAD"

        }
        fs.writeFileSync('city_weather.json', JSON.stringify({
            weather
        }));

    } catch (error) {
        console.error('Error fetching and storing weather data:', error);
    }

export default null;
