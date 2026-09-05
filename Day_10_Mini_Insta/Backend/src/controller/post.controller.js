import imagekit from "../config/imagekit.config.js";
import PostModel from "../model/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        console.log(caption);
        const file = req.file;

        if (!caption || !file) {
            return res.status(400).json({
                success: false,
                message: "all filds are required"
            })
        }

        const imageURL = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: 'uploads'
        })

        const post = new PostModel({
            caption,
            image: imageURL.url
        })

        await post.save();

        res.status(201).json({
            success: true,
            message: "post created successfully",
            data: post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const getAllPost = async (req, res) => {
    try {
        const allPost = await PostModel.find();

        res.status(200).json({
            success: true,
            message: "successfully fetched all posts",
            data: allPost
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}