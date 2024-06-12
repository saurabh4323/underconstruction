import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Footer from "./components/Footer.jsx";
import Premium from "./pages/Premium.jsx";
import Noti from "./pages/Noti.jsx";
import Friend from "./pages/Friend.jsx";

export default function App() {
  // index.js or App.js
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }

  function requestLocationPermission() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location permission granted.");
          console.log("Latitude: " + position.coords.latitude);
          console.log("Longitude: " + position.coords.longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("You denied the location request.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    requestLocationPermission();

    // Handle incoming messages
  });

  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            <Route path="/" element={<Chat />} />
            <Route path="/premium" element={<Premium></Premium>} />
            <Route path="/notification" element={<Noti></Noti>} />
            <Route path="/friend" element={<Friend></Friend>} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer></Footer>
    </div>
  );
}
