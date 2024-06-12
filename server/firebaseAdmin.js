// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./hidd-d43c8-firebase-adminsdk-rjhol-e5d1447e56.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();
module.exports = messaging;
