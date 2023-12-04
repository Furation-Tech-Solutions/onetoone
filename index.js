const db = require("./models/index");
const {
    Message,
    Realtors
} = require("./models/index");
require('dotenv').config()
let {
    PORT
} = process.env;

const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:8080"],
    }
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    "origin": "*"
}));

io.on('connection', (socket) => {
    socket.on('join', (user) => {
        socket.join(user);
    });

    socket.on('message', (data) => {
        const {
            sender,
            receiver,
            message
        } = data;

        Message.create({
            sender,
            receiver,
            message,
        }).then((newMessage) => {
            io.to(receiver).emit('message', newMessage);
        });
    });

    socket.on('disconnect', () => {
        // Handle disconnection if needed
        console.log('User disconnected');
    });
});


db.sequelize.sync().then(() => {
    console.log("db synced and connected");
    server.listen(PORT, () => {
        console.log(`Server Started ${PORT}`);
    });
});