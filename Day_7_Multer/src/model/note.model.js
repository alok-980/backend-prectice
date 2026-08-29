const mongoose = require("mongoose");

const noteScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String
    }
})

const NoteModel = new mongoose.model("notes", noteScheme);

module.exports = NoteModel;