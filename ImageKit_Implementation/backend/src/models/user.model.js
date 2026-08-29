const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number
    },

    address: {
        type: String
    },

    image: {
        type: String
    }
})

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;