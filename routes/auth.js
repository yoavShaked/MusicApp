const express = require('express');
const router = express.Router();
const { User} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (request, response) => {

    const { error } = validateAuth(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: request.body.email });

    if (!user) {
        return response.status(400).send('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if(!validPassword) return response.status(400).send('Invalid email or password');

    const token = user.genToken();
    response.header('x-auth-token', token).send({name: user.name, email: user.email});
});

function validateAuth(req){
    return Joi.validate(req, {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(7).max(100).required()
    })
}

module.exports = router;