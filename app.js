const express = require('express');
const app = express();
const env = require('dotenv');

env.config();
require('express-async-errors');

require('./startup/db')(process.env.MONGO_DB_CONNECTION);
require('./startup/routes')(app);
require('./startup/production')(app);
app.listen(process.env.PORT, () => console.log('listen to port: ', process.env.PORT));