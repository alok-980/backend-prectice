const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB")
    } catch (error) {
        console.log("faild to connect with DB: ", error)
    }
}

module.exports = connectDB;