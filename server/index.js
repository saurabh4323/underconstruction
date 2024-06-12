const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
// const notificationRoutes = require("./routes/notifications");
const User = require("./models/userModel");
// const { sendNotificationToAllUsers } = require("./notificationService");
const messaging = require("./firebaseAdmin");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// app.use("/api/notifications", notificationRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("DB Connection Error:", err));

app.get("/ping", (req, res) => {
  res.json({ msg: "Ping Successful" });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  socket.on("send-message", async (data) => {
    const { to, message } = data;
    const recipientSocketId = onlineUsers.get(to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receive-message", message);
    }
    await sendNotificationToAllUsers(message); // Function to send notifications
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log("A user disconnected");
      }
    });
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
  });
});

app.post("/api/notifications/send", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }

    await sendNotificationToAllUsers(message);
    res.status(200).json({ success: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});
