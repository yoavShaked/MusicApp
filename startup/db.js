const mongoose = require('mongoose');

module.exports = function(connectionString){
    mongoose.connect(connectionString)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(err));
}

