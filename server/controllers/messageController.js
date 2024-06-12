const Messages = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        readBy: msg.readBy || [], // Include the readBy field
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
module.exports.markAsRead = async (req, res) => {
  try {
    const { messageId, userId } = req.body;
    const message = await Messages.findById(messageId);

    if (!message) {
      return res.status(404).send({ message: "Message not found" });
    }

    // Ensure there's an array to hold read users
    if (!message.readBy) {
      message.readBy = [];
    }

    // Add the userId to the readBy array if not already present
    if (!message.readBy.includes(userId)) {
      message.readBy.push(userId);
      await message.save();
    }

    res.status(200).send({ message: "Message marked as read" });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).send({ message: "An error occurred" });
  }
};
// In messageController.js
module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const newMessage = await Messages.create({
      sender: from,
      users: [from, to],
      message: { text: message },
    });

    res.status(201).send(newMessage);
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
