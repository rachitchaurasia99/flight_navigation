import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();
import db from './db/index.js';
import Router from './flights.js';
import weatherRouter from './flights.js';
// import d from './services/adjacency_list_generator.js'
import shortest_path from './services/shortest_path_finder.js'
// import weather from './weather.js'

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})

app.get('/shortestPath', (req, res) => {
    // const S = "Anaa", D = "Aden";
    const source = req.query.source
    const destination = req.query.destination;
    try {
        shortest_path(source, destination) .then((path) => {
            res.json({ path: path });
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

})

// app.get('/flights', db.getFlights)
// app.use('/', flightsRouter);
// app.use('/cities', citiesRouter);

export default app;
