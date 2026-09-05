const UserModel = require('../models/user.model');
const imageKit = require('../config/imagekit.config');

const createUserController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address } = req.body;

        const file = req.file;
        
        const uploadedFile = await imageKit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: 'uploads'
        })

        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            phone,
            address,
            image: uploadedFile.url
        })

        await newUser.save();

        res.status(200).json({
            success: true,
            message: 'user crested successfully',
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllUserController = async (req, res) => {
    try {
        let users = await UserModel.find();

        if (!users) {
            res.status(404).json({
                success: false,
                message: "users not founde"
            })
        }

        res.status(200).json({
            success: true,
            message: 'user fetch successfully',
            totalUser: users.length,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createUserController,
    getAllUserController
}