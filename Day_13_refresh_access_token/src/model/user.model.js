import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "min 3 length is required"],
        maxLength: [50, "max 50 length is accepted"]
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    refreshToken: {
        type: String
    }
}, { timestamps: true })

const UserModel = mongoose.model("users", userSchema);

export default UserModel;