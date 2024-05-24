import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const router = express.Router();
import db from './db/index.js';
import Router from './flights.js';
import weatherRouter from './flights.js';
// import d from './services/adjacency_list_generator.js'
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

// app.get('/flights', db.getFlights)
// app.use('/', flightsRouter);
// app.use('/cities', citiesRouter);

export default app;
