// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDJCF91IBRb_oSmZsgak57jgUF1I3fxYLY",
  authDomain: "hidd-d43c8.firebaseapp.com",
  projectId: "hidd-d43c8",
  storageBucket: "hidd-d43c8.appspot.com",
  messagingSenderId: "960417271598",
  appId: "1:960417271598:web:d3cd53d75d565c457d74bf",
  measurementId: "G-YYC7E3348K",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  //  console.log("Received background message ", payload);
  // const notificationTitle = "Background Message Title";
  const notificationOptions = {
    // body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
