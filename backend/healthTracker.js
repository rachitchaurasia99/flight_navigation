const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const trackHealthMetrics = (sensorData) => {
    const query = `
        INSERT INTO health_metrics (altitude, pressure, temperature, timestamp)
        VALUES ($1, $2, $3, $4)
    `;
    const values = [
        sensorData.altitude,
        sensorData.pressure,
        sensorData.temperature,
        new Date(),
    ];

    client.query(query, values)
        .then(() => {
            console.log('Health metric saved');
        })
        .catch(err => {
            console.error('Error saving health metric:', err);
        });
};

module.exports = trackHealthMetrics;
