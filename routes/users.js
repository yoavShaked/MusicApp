const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (request, response) => {

    const { error } = validate(request.body);

    if (error) {
        return response.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: request.body.email });

    if (user) {
        return response.status(400).send('user allready exsits');
    }
        
    user = new User({
        email: request.body.email,
        name: request.body.name,
        password: request.body.password
    });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.genToken();
    response.header('x-auth-token', token).send({name: user.name, email: user.email});
});


module.exports = router;