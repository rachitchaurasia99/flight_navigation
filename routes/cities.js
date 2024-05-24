import City from '../models/city.js'
import express from 'express';
var cityRouter = express.Router();

cityRouter.get('/', async (req, res) => {
    try {
      const cities = await City.findAll();
      res.send(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).send('Internal Server Error');
    }
  });

export default cityRouter;
