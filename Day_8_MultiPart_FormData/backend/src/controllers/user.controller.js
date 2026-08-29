const UserModel = require("../models/user.model");

const createUserController = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        let filePath = [];

        filePath = req.files.map((image) => image.path)

        const newUser = await UserModel.create({
            name,
            email,
            images: filePath
        });

        res.status(200).json({
            message: "user created successfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            meaasge: error.message
        })
    }
}

module.exports = {
    createUserController
}