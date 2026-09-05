import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoute from "./routes/post.route.js"

const app = express();

app.use(express.json());
app.use(cors())

connectDB();

app.get('/health', (req, res) => {
    res.send('server is running');
})

app.use('/post', postRoute);

export default app;