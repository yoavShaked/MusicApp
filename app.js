const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() => console.log('Connected to MongoDB...')).catch((err) => console.log(err));

app.use(express.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.listen(process.env.PORT, () => console.log('listen to port: ', process.env.PORT));