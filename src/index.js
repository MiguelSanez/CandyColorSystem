const dotenv = require('dotenv');
const { spawnServer } = require('./server');

dotenv.config();

spawnServer();