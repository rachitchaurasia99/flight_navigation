import 'dotenv/config';

import app from './app.js';
import runDbMigrations from './db/migrations/index.js';
import fetchCities from './cities.js'

// fetchCities();
// await runDbMigrations();
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
