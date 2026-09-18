import userModel from "../model/user.model";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
   try {
        const { email, phone, password } = req.body;

        const isExist = await userModel.findOne({ email });

        if(isExist) {
            res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }

        const user = await userModel.create({
            email,
            phone,
            passwordHash: await bcrypt.hash(password, 10)
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    phone: user.phone
                }
            }
        })
   } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error:" + error.message
        })
   } 
}