const mongoose = require('mongoose');


const { Schema } = mongoose;

const UserSchema = Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicturePath: {
        type: String,
        default:'https://i.postimg.cc/hjpbcTdv/User-avatar-svg.png'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema);