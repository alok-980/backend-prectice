const express = require("express")

const app = express()

app.use(express.json)

app.get("/", (req, res) => {
    res.send("Server is working fine.")
})

app.post("/create", (req, res) => {
    const { name } = req.body
    res.send(name)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})