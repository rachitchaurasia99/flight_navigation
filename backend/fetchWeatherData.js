const axios = require('axios');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const cities = ['New York', 'London', 'Tokyo', 'Sydney'];

async function fetchWeatherData() {
    for (const city of cities) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(url);
        const weatherData = response.data;

        const query = `
            INSERT INTO weather (city, temperature, humidity, pressure, weather, description, timestamp)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            weatherData.name,
            weatherData.main.temp,
            weatherData.main.humidity,
            weatherData.main.pressure,
            weatherData.weather[0].main,
            weatherData.weather[0].description,
            new Date(),
        ];

        await client.query(query, values);
        console.log(`Weather data for ${city} saved to database`);
    }
}

fetchWeatherData().then(() => {
    client.end();
    console.log('Weather data fetching completed');
}).catch(err => console.log(err));
