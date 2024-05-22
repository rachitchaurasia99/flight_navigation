import express from 'express';
import bodyParser from 'body-parser'
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

export default app;
