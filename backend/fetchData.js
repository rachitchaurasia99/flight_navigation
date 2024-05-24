const schedule = require('node-schedule');
const fetchWeatherData = require('./fetchWeatherData');
const fetchFlightData = require('./fetchFlightData');

// Fetch data every hour
schedule.scheduleJob('0 * * * *', () => {
    fetchWeatherData();
    fetchFlightData();
});
