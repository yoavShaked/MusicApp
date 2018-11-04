const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const songs = require('../routes/songs');
const error = require('../midleware/error');
const cors = require('cors');

module.exports = function(app){
    app.use(express.json());
    app.use(cors());
    app.use('/api/users', users);
    app.use('/api/songs', songs);
    app.use('/api/auth', auth);
    app.use(error);
}