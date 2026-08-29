const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const userRouter = require('./routes/user.route');

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/health', (req, res) => {
    res.send('server is running...');
})

app.use('/user', userRouter);

module.exports = app;