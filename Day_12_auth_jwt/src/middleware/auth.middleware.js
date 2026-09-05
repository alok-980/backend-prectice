import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(data.id);

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}