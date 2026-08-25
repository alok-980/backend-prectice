const express = require("express");
const connectDB = require("./config/db")
const noteRouter = require("./routes/note.route")

const app = express();

app.use(express.json());

connectDB();

app.get('/health', (req, res) => {
    res.send("Server is running...");
})

app.use('/notes', noteRouter);

module.exports = app;