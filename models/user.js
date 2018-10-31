const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const userScehma = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength:5,
        maxlength:100
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength:7,
        maxlength:100
    }
});

userScehma.methods.genToken = function (){
    return jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY);
}

function validateUser(user) {
    return Joi.validate(user, {
        email: Joi.string().min(5).max(100).required().email(),
        name: Joi.string().required(),
        password: Joi.string().min(7).max(100).required()
    });
}

const User = mongoose.model('User', userScehma);

module.exports = {
    User,
    validate: validateUser
};