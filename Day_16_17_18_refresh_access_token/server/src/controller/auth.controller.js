import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyRefreshToken } from "../utils/auth.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.status(401).json({
                success: false,
                message: "User already exist",
                error: {
                    path: "email",
                    message: "User already exist"
                }
            })
        }

        const user = await UserModel.create({
            name,
            email,
            hashedPassword: await bcrypt.hash(password, 10)
        })

        const { accessToken, refreshToken } = generateToken({ userId: user._id });

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },
            accessToken
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const meController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user);

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        console.log(req)

        if (!refreshToken) {
            res.status(400).json({
                success: false,
                message: "Unauthorized, Invalid or expired token"
            })
        }

        const decoded = verifyRefreshToken(refreshToken);

        const user = await UserModel.findById(decoded.id);

        if (refreshToken !== user.refreshToken) {

            user.refreshToken = null
            await user.save()

            res.status(400).json({
                success: false,
                message: "Unauthorized, Invalid or expired token"
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateToken({ userId: user._id })

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            accessToken
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}