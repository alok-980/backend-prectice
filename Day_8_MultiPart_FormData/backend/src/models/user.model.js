const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    images: [{
        type: String,
    }] 
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;