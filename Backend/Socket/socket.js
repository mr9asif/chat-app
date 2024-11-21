const {Server} = require("socket.io");
const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        method:["GET", "POST"]
    }
});

 const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {}; 

io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId !== "undefine") userSocketMap[userId]=socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        delete userSocketMap[userId],
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    });
})


// export { app, getReceiverSocketId, io, server };
module.exports={app, getReceiverSocketId, io, server }

