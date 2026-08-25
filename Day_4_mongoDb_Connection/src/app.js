const express = require("express");
const connectDB = require("./config/db");
const NoteModel = require("./model/note.model");

const app = express();

app.use(express.json());

connectDB();

app.get('/health', (req, res) => {
    res.send("server is running...");
})

app.post('/create', async (req, res) => {
    const { title, description } = req.body;

    const data = await NoteModel.create({
        title,
        description
    })

    res.send({
        success: true,
        message: "note created",
        data
    })
})

module.exports = app;