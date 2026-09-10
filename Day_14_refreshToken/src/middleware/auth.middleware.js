import UserModel from "../model/user.model.js";
import { verifyAccessToken } from '../utils/auth.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        const decoded = verifyAccessToken(accessToken);

        if (!decoded) {
            res.status(401).json({
                success: false,
                message: "Unauthorized, Invalid or expired token"
            })
        }

        req.user = decoded.id;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized, Invalid or expired token"
        })
    }
}