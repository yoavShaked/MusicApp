const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).send('No token provided');
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = payload._id;
        next();
    }
    catch(ex){
        res.status(400).send('Access denide');
    }
}