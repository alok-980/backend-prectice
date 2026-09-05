import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "server is running..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

app.use("/api/auth", authRoute);

export default app;