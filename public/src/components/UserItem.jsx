import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { onlineStatusRoute } from "../utils/APIRoutes"; // Ensure this is the correct path
import axios from "axios";
import { host } from "../utils/APIRoutes";

const UserItem = ({ user }) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io(host); // 'host' should be defined in your utils or environment variables
    socket.emit("add-user", user._id);

    socket.on("update-user-status", (data) => {
      if (data.userId === user._id) {
        setIsOnline(data.isOnline);
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("update-user-status");
      socket.disconnect();
    };
  }, [user._id]);

  return (
    <div className="user-item">
      <span>{user.username}</span>
      {isOnline ? (
        <span className="online-status">Online</span>
      ) : (
        <span className="offline-status"></span>
      )}
    </div>
  );
};

export default UserItem;
