const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        });
        console.log(`database connected`);
    } catch (error) {
        console.dir(error);
    }
}


module.exports = connectDB;

