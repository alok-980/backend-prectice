const express = require('express');
const {
    createNotesController,
    getAllNoteController,
    getSingleNoteController,
    updateNoteController,
    deleteNoteController
} = require('../controllers/note.controllers');

const router = express.Router();

router.post('/create', createNotesController)
router.get('/getAllNotes', getAllNoteController)
router.get('/:id', getSingleNoteController)
router.put('/:id', updateNoteController)
router.delete('/:id', deleteNoteController)

module.exports = router;