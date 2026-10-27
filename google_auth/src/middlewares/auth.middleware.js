
import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';
import config from '../config/config.js';

export async function requireAuth(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: 'Not logged in',
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            config.ACCESS_TOKEN_SECRET
        );

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired',
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        console.error('Authentication middleware error:', error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}
