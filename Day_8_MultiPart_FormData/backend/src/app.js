const express = require("express");
const cors = require("cors")
const connectDB = require("./config/db")
const userRoute = require("./routes/user.route");

const app = express();

app.use(cors())
app.use(express.json());

connectDB();

app.get('/health', (req, res) => {
    res.send("server running...");
})

app.use('/user', userRoute);

module.exports = app;