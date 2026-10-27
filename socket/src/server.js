import app from './app/app.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io'

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log("user connected.")
    console.log(socket.id)
    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
})

httpServer.listen(3000, () => {
    console.log("server is running on port:", 3000);
})