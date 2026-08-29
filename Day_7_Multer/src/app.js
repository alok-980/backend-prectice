const express = require("express");
const connectDB = require('./config/db');
const upload = require('./uploads/upload');
const NoteModel = require("./model/note.model");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

connectDB();

app.get('/health', (req, res) => {
    res.send('Server is running...')
})

app.post('/create', upload.single("image"), async (req, res) => {
    try {
        let body = req.body;
        let file = req.file;

        if (!file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

        const newNote = await NoteModel.create({
            ...body,
            image: imageUrl
        })

        return res.status(200).json({
            message: 'note created successfully',
            data: newNote
        })
    } catch (error) {
        console.log("something whent wrong");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = app;