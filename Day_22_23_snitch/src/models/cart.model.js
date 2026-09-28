import mongoose from 'mongoose';

const cartScheme = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },

            quantity: {
                type: Number,
                default: 1,
                min: 1
            },

            size: {
                type: String,
                enum: ["XS", "S", "M", "L", "Xl", "XXL"]
            }
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const cartModel = mongoose.model("carts", cartScheme);

export default cartModel;