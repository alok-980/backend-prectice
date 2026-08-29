const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB is connected");
    } catch (error) {
        console.log("connection to DB failed", error);
    }
}

module.exports = connectDB;