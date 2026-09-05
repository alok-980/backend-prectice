import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/generateToken.util.js"

import { config } from "../config/config.js";
import { json } from "express";

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
            return res.status(409).json({
                success: false,
                message: "User already exist with this email"
            })
        }

        const user = await UserModel.create({
            name, email, password: await bcrypt.hash(password, 10)
        })

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        const cookieOptions = {
            httpOnly: true,
            secure: config.NODE_ENV,
            sameSite: "strict",
        }

        res
            .status(201)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }) // 15 minutes
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }) // 7 days
            .json({
                success: true,
                message: "User registered successfully",
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "email & password is required"
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        const cookieOptions = {
            httpOnly: true,
            secure: config.NODE_ENV,
            sameSite: "strict"
        }

        res
            .status(200)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({
                success: true,
                message: "Login successfully",
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    }
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logoutController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);

        user.refreshToken = "",
            await user.save();

        res
            .status(200)
            .cookie("accessToken", "")
            .cookie("refreshToken", "")
            .json({
                success: true,
                message: "Logout successfully"
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const meController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const newRefreshTokenController = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            res.status(401).json({
                success: false,
                message: "token expire login again"
            })
        }

        const decode = jwt.verify(token, config.JWT_REFRESH_SECRET);

        if (!decode) {
            return res.status(401), json({
                status: false,
                message: "Invalid or expire token"
            })
        }

        const user = await UserModel.findById(decode.id);

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        const cookieOptions = {
            httpOnly: true,
            secure: config.NODE_ENV,
            sameSite: "strict"
        }

        res
            .status(200)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .json({
                success: true
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}