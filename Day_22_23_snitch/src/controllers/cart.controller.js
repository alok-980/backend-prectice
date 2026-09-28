import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size } = req.body;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const selectedSize = product.sizes.find(s => s.size === size);

        if (!selectedSize) {
            return res.status(400).json({
                success: false,
                message: "Invalid size"
            })
        }

        if (selectedSize.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            })
        }

        const cart = (await cartModel.findOne({ user: req.user.id })) ?? (await cartModel.create({ user: req.user.id }));

        const productInCart = cart.products.find(p => (p.product.toString() === productId) && (p.size === size));

        if (productInCart) {
            if ((productInCart.quantity + quantity) > selectedSize.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Insufficient stock"
                })
            }

            await cartModel.updateOne(
                {
                    user: req.user.id,
                    "products.product": productId,
                    "products.size": size
                },
                {
                    $inc: {
                        "products.$.quantity": quantity
                    }
                }
            )

            return res.status(200).json({
                success: 200,
                message: "Product quantity updated in cart"
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user.id },
            {
                $push: {
                    products: {
                        product: productId,
                        quantity: quantity,
                        size: size
                    }
                }
            }
        )

        res.status(200).json({
            success: true,
            message: "Product added to cart"
        })
    } catch (error) {
        console.log("add to cart controller error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getCart = async (req, res) => {
    try {
        const cart = (await cartModel.findOne({ user: req.user.id })) ?? (await cartModel.create({ user: req.user.id }));

        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: {
                cart: cart
            }
        })
    } catch (error) {
        console.log("get cart controller error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}