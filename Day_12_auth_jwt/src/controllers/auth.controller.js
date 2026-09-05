import dotenv from "dotenv";
dotenv.config();

import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.create({
            name, email, password
        })

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET
        )

        res.status(201).json({
            success: true,
            message: "user register successfully",
            data: {
                user,
                token
            }
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export const accountController = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}