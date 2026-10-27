import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("mongoDB connected");
    } catch (error) {
        console.log("mongoDB connection failed:", error.message);
    }
}

export default connectDB;