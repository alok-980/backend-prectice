import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [ 3, "name must be at least 3 characters long" ],
        maxLength: [ 30, "name must be at most 30 characters long" ],
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please provide a valid email" ],
        trim: true
    },

    hashedPassword: {
        type: String,
        required: true,
        select: false
    },

    refreshToken: {
        type: String,
        default: null,
    }
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel;