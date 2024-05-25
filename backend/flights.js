import express from 'express';
const flightsRouter = express.Router();

flightsRouter.get('/fetch-and-store-flights', async (req, res) => {
    try {
        // Fetch data from AviationStack API
        const apikey = AVIATION_STACK_API_KEY
        const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${apikey}`);
        const data = await response.json();

        const flights = data.data;

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching and storing flights data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default flightsRouter;
