import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyDJCF91IBRb_oSmZsgak57jgUF1I3fxYLY",
  authDomain: "hidd-d43c8.firebaseapp.com",
  projectId: "hidd-d43c8",
  storageBucket: "hidd-d43c8.appspot.com",
  messagingSenderId: "960417271598",
  appId: "1:960417271598:web:d3cd53d75d565c457d74bf",
  measurementId: "G-YYC7E3348K",
};

initializeApp(firebaseConfig);
const messaging = getMessaging();
export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BKTu2sLZvHQJcbzfAi0S2-bLS6cQ_-vfMuMQVryo4FdYUG0BCPzsvpM-qr8oEM0y3zBRjDQaV9Mra2BbuGirs6A",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Token client:", currentToken);
      } else {
        console.log("no token genertated");
      }
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("message payload:", payload);
      resolve(payload);
    });
  });
};
