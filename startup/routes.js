const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const songs = require('../routes/songs');
const error = require('../midleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/songs', songs);
    app.use('/api/auth', auth);
    app.use(error);
}