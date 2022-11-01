const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
//@desc signUp
//@route /api/users
//@acess Private

exports.register = asyncHandler(async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (email) {
        res.status(201)
        throw new Error('the user already exist');
    }
    if (userName === '' || email === '' || password === '') {
        res.status(500)
        throw new Error('empty field(s)')
    }
    let user = new User({ userName, email, password });
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '30d' });
    await user.save();
    res.status(200).send({ user, token, msg: 'user registred with success' });
});

exports.login = asyncHandler(async (req, res, next) => {

})