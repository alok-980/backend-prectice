import config from './config.js';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('mongoDB connected');
    } catch (error) {
        console.log('mongoDB connection failed: ', error.message);
    }
}

export default connectDB;