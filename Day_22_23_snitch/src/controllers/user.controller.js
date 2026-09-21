import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import {
    generateToken,
    verifyRefreshToken
} from '../utils/auth.util.js'

export const registerController = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const isExist = await userModel.findOne({ email });

        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
                errors: [
                    {
                        path: "email",
                        msg: "user already exists with this email"
                    }
                ]
            })
        }

        const user = await userModel.create({
            email,
            name,
            passwordHash: await bcrypt.hash(password, 10)
        })

        const { accessToken, refreshToken } = generateToken({ userId: user._id, role: user.role });

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },

                accessToken
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const { accessToken, refreshToken } = generateToken({ userId: user._id, role: user.role });

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "User loggedin successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },

                accessToken
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }
}

export const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh toke is required pleas login again"
            })
        }

        console.log(refreshToken);

        const decoded = verifyRefreshToken(refreshToken);
        console.log(decoded)

        const { id } = decoded;
        console.log(id)

        const user = await userModel.findById(id);

        if (refreshToken != user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            })

            return res.status(401).json({
                success: false,
                message: "Refresh token mismatch"
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateToken({ userId: user._id, role: user.role });

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "Token rotated successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },

                accessToken
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        })
    }
}

export const meController = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}