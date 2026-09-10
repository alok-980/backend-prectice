import dotenv from 'dotenv';
dotenv.config();

const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 8000,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET
}

export default config;