// notificationService.js
const User = require("./models/userModel");
const messaging = require("./firebaseAdmin"); // Import the initialized messaging instance

async function sendNotificationToAllUsers(message) {
  try {
    const users = await User.find({ fcmToken: { $exists: true, $ne: null } });
    const tokens = users.map((user) => user.fcmToken);

    if (tokens.length > 0) {
      const messagePayload = {
        notification: {
          title: "New Message",
          body: message,
        },
        tokens: tokens,
      };

      messaging
        .sendMulticast(messagePayload)
        .then((response) => {
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    } else {
      console.log("No FCM tokens found");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

module.exports = { sendNotificationToAllUsers };
