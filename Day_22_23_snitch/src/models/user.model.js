import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    passwordHash: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "seller"],
        default: "user"
    },

    refreshToken: {
        type: String,
    }
}, { timestamps: true })

const userModel = mongoose.model("users", userSchema);

export default userModel;