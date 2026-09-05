import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB connected!");
    } catch (error) {
        console.log("mongoDB connection failed: ", error.message);
    }
}

export default connectDB;