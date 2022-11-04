const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

//@desc register new user
//@route POST /api/users
//@acess Public
exports.register = asyncHandler(async (req, res, next) => {
    const { userName, email, password, avatar } = req.body;
    let user = await User.findOne({ email });
    
    if (user) {
        res.status(201)
        throw new Error('the user already exist');
    }
    if (userName === '' || email === '' || password === '') {
        res.status(500)
        throw new Error('empty field(s)')
    }
    user = new User({ userName, email, password, avatar });
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    const token = await jwt.sign({ _id: user.id }, process.env.SECRET_KEY, { expiresIn: '30d' });
    await user.save();
    res.status(200).send({ user, token, msg: 'user registred with success' });
});
//@desc Authenticate a User
//@route POST /api/users
//@acess Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email }); 
    if (!user) {
        res.status(500)
        throw new Error('invalid email')
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(500)
        throw new Error('invalid password')
    }

    const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '30d' });
    res.status(200).send({ user, token, msg: 'login with success' });
});

//@desc Update User
//@route PUT /api/users/:id
//@acess Private

exports.updateUser = asyncHandler(async (req, res, next) => {
    const { _id } = req.params;
    const { file } = req;
    const user = await User.updateOne({ _id }, {
        $set: {
            ...req.body,
            profilePicturePath: file.path
        }
    })
    res.status(200).send({ user ,msg:'User updated with success'})
});

//@desc Get The Current User
//@route GET /api/users/currentUser
//@acess Private
exports.currentUser = asyncHandler(async (req, res, next) => { 
    const { _id, email, userName } = await User.findById(req.user._id);
    res.status(200).send({
        id: _id,
        email,
        userName
    });
    
});