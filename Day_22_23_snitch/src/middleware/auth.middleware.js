import { isNamedExportBindings } from "typescript";
import { verifyAccessToken } from "../utils/auth.util.js";


export const authenticated = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
        res.status(400).json({
            success: false,
            message: "Token is required"
        })
    }

    try {
        const decode = verifyAccessToken(accessToken)

        req.user = decode;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "invalid or expire token"
        })
    }
}

export const isSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "You are not authorized person to create product"
        })
    }
    next();
}