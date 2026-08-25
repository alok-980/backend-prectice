const NoteModel = require("../models/note.model");

// CREATE
const createNotesController = async (req, res) => {
    try {
        let body = req.body;

        let newNote = await NoteModel.create(body);



        return res.status(200).json({
            message: "note created successfully!",
            data: newNote
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// READ
const getAllNoteController = async (req, res) => {
    try {
        let allNotes = await NoteModel.find();

        return res.status(200).json({
            message: 'notes fetched successfully!',
            totalNotes: allNotes.length,
            data: allNotes
        })
    } catch (error) {
        return res.status(500).json({
            message: "some whent wrong!"
        })
    }
}

// READ ONE
const getSingleNoteController = async (req, res) => {
    try {
        let noteId = req.params.id;

        let note = await NoteModel.findById(noteId);

        return res.status(200).json({
            message: 'note fetched successfully!',
            data: note
        })
    } catch (error) {
        return res.status(500).json({
            message: "some whent wrong!"
        })
    }
}

// UPDATE - PUT
const updateNoteController = async (req, res) => {
    try {
        let noteId = req.params.id;
        let body = req.body;

        let updatedNote = await NoteModel.findByIdAndUpdate(noteId, body, {
            new: true
        });

        return res.status(200).json({
            message: 'note updated successfully!',
            data: updatedNote
        })
    } catch (error) {
        return res.status(500).json({
            message: "some whent wrong!"
        })
    }
}

// DELETE
const deleteNoteController = async (req, res) => {
    try {
        let noteId = req.params.id;

        await NoteModel.findByIdAndDelete(noteId);

        return res.status(200).json({
            message: "note deleted successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "some whent wrong!"
        })
    }
}

module.exports = {
    createNotesController,
    getAllNoteController,
    getSingleNoteController,
    updateNoteController,
    deleteNoteController
}