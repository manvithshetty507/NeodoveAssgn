const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const  {Server} = require('socket.io');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const jwt = require('jsonwebtoken');
const Chat = require('./models/chatModel'); 

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', userRouter);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
});
  
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Fetch chat history from MongoDB
    Chat.find()
        .sort({ timestamp: 1 })  // Sort by timestamp in ascending order
        .then((messages) => {
        socket.emit('chat_history', messages);
        })
        .catch((err) => console.error(err));

    socket.on("send_message", (data) => {
        console.log("data", data);
        
        // Save the message to MongoDB
        const chatMessage = new Chat({
        email: data.email,
        username: data.username,
        msg: data.msg,
        timestamp: data.timestamp
        });

        chatMessage.save()
        .then(() => {
            socket.broadcast.emit("received_msg", data);
        })
        .catch((err) => console.error(err));
    });
});
  

// Start the server
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
