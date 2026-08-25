const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, minLength: 10 }
})

const NoteModel = mongoose.model('notes', noteSchema);
module.exports = NoteModel;