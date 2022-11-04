const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(decoded.id).select('-password');
            next();
     
        } catch (error) {
            res.status(401)
            throw new Error('not authorized')
        }    
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorized, no token')
    }  

});


module.exports = protect;