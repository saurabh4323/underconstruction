const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();

// Existing routes
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
const { markAsRead } = require("../controllers/messageController");

router.post("/markasread", markAsRead);

// New endpoint for updating read status
router.post("/markAsRead", async (req, res) => {
  try {
    const { messageId, userId } = req.body;
    const message = await Messages.findById(messageId);

    if (message && !message.readBy.includes(userId)) {
      message.readBy.push(userId);
      await message.save();
      res.json({ msg: "Message marked as read" });
    } else {
      res.json({ msg: "Message not found or already marked as read" });
    }
  } catch (ex) {
    res.status(500).json({ msg: "Error marking message as read" });
  }
});

router.post("/send", addMessage);

module.exports = router;
