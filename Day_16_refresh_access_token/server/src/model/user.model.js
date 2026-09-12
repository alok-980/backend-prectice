import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    hashedPassword: {
        type: String,
        required: true,
    },

    refreshToken: {
        type: String,
        default: null
    }
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel;