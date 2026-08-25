const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        minLength: [10, "min 10 length is required"]
    }
})

const NoteModel = mongoose.model('notes', noteSchema);
module.exports = NoteModel;