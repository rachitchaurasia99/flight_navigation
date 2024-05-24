const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
    const result = await client.query('SELECT * FROM weather ORDER BY timestamp DESC LIMIT 10');
    res.json(result.rows);
});

app.get('/api/flights', async (req, res) => {
    const result = await client.query('SELECT * FROM flights ORDER BY timestamp DESC LIMIT 10');
    res.json(result.rows);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
