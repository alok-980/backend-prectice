const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.get('/', (req, res) => {
    res.send(users);
})

app.post('/user', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send("User registred succesfully")
})

app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    users = users.map((val) => val.id === id ? { ...val, name} : val);

    res.send("User updated successfully");
})

app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    users = users.filter((val) => val.id !== id);

    res.send("User deleted successfully")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})