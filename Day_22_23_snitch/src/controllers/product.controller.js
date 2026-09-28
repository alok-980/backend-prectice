import productModel from '../models/product.model.js';
import { uploadFile } from '../services/storage.service.js';

export const createProduct = async (req, res) => {
    try {
        const fileUrls = [];

        for (let i = 0; i < req.files.length; i++) {
            const response = await uploadFile({
                buffer: req.files[i].buffer,
                fileName: req.files[i].originalname
            })

            fileUrls.push(response.url);
        }

        const product = await productModel.create({
            title: req.body.title,
            description: req.body.description,
            images: fileUrls,
            price: {
                amount: req.body.price.amount,
                currency: req.body.price.currency
            },
            sizes: req.body.sizes,
            seller: req.user.id
        })

        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: {
                product
            }
        })

    } catch (error) {
        console.log("create product controller error:", error.message)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const listAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({ published: true });

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: {
                products
            }
        })
    } catch (error) {
        console.log("list all product API error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const listAllProductToSeller = async (req, res) => {
    try {
        const products = await productModel.find();

        res.status(200).json({
            success: false,
            message: "Product fetched successfully",
            data: {
                products
            }
        })
    } catch (error) {
        console.log("list all product to seller controller error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const toggleProductLising = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not find"
            })
        }

        const isProductListed = product.published ? false : true;

        await productModel.findByIdAndUpdate(id, {
            published: isProductListed
        })

        const successMessage = isProductListed ? "Product published successfully" : "Product unpublished successfully";

        res.status(200).json({
            success: true,
            message: successMessage
        })
    } catch (error) {
        console.log("toggle product lising API error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}