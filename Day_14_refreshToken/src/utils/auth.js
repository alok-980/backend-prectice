import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateToken = ({ userId }) => {
    const accessToken = jwt.sign({ id: userId }, config.JWT_ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ id: userId }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' })

    return { accessToken, refreshToken }
}

export const verifyAccessToken = (token) => {

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET)

    return decoded
}

export const verifyRefreshToken = (token) => {
    const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET)

    return decoded
}