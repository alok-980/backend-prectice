import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        console.log(token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            })
        }

        const decode = jwt.verify(token, config.JWT_ACCESS_SECRET);

        req.user = decode;

        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}