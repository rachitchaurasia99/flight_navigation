const axios = require('axios');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const apiKey = process.env.AVIATIONSTACK_API_KEY;

async function fetchFlightData() {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}`;
    const response = await axios.get(url);
    const flightData = response.data.data;

    for (const flight of flightData) {
        const query = `
            INSERT INTO flights (flight_number, departure_airport, arrival_airport, status, timestamp)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [
            flight.flight.iata,
            flight.departure.iata,
            flight.arrival.iata,
            flight.flight_status,
            new Date(),
        ];

        await client.query(query, values);
        console.log(`Flight data for ${flight.flight.iata} saved to database`);
    }
}

fetchFlightData().then(() => {
    client.end();
    console.log('Flight data fetching completed');
}).catch(err => console.log(err));
