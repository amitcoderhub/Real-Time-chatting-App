const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend requests
    methods: ["GET", "POST"]
  }
});

let users = {}; // Store users and their last seen

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining with name
  socket.on("join", (username) => {
    users[socket.id] = { name: username, lastSeen: "Online" };
    io.emit("userStatus", users); // Broadcast updated users list
  });

  // Receive and broadcast messages
  socket.on("message", (data) => {
    io.emit("message", { id: socket.id, text: data.text, sender: data.sender });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      users[socket.id].lastSeen = new Date().toLocaleTimeString();
    }
    io.emit("userStatus", users);
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
