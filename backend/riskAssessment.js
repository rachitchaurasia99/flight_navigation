const { AStarFinder, Grid } = require('pathfinding');
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const riskAssessment = (weatherData, flightData) => {
    return weatherData.temperature < 0 || weatherData.weather === 'Snow';
};

const findAlternativeRoute = (graph, startNode, endNode) => {
    const grid = new Grid(graph);
    const finder = new AStarFinder();
    return finder.findPath(startNode[0], startNode[1], endNode[0], endNode[1], grid);
};

const assessFlightRiskAndSuggestRoute = async (flightId) => {
    const weatherQuery = 'SELECT * FROM weather ORDER BY timestamp DESC LIMIT 1';
    const flightQuery = 'SELECT * FROM flights WHERE id = $1';
    const flightValues = [flightId];

    const weatherResult = await client.query(weatherQuery);
    const flightResult = await client.query(flightQuery, flightValues);

    const currentWeather = weatherResult.rows[0];
    const currentFlight = flightResult.rows[0];

    const risk = riskAssessment(currentWeather, currentFlight);
    if (risk) {
        // Example graph; you would replace this with your actual route data
        const graph = [
            [0, 0, 1],
            [1, 0, 0],
            [0, 1, 0],
        ];
        const startNode = [0, 0]; // Replace with actual start coordinates
        const endNode = [2, 2]; // Replace with actual end coordinates
        const alternativeRoute = findAlternativeRoute(graph, startNode, endNode);
        console.log('Alternative Route:', alternativeRoute);
    } else {
        console.log('No risk detected for flight:', currentFlight.flight_number);
    }
};

// Example usage
assessFlightRiskAndSuggestRoute(1).then(() => {
    client.end();
}).catch(err => {
    console.error('Error assessing flight risk:', err);
    client.end();
});
