const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongoDB connected');
    } catch (error) {
        console.log("mongoDB connection failed");
    }
}

module.exports = connectDB;