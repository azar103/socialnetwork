const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    content: {
        type: String,
        required:  true
    },
    postPath: {
        type: String
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('post', PostSchema)