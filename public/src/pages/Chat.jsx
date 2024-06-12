import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { Link } from "react-router-dom";
import Noti from "./Noti";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu); // Toggle the state to show or hide the menu
  };

  useEffect(() => {
    const getUser = async () => {
      const userData = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );
      if (!userData) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(userData));
      }
    };

    getUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host, {
        transports: ["websocket"], // Ensure websocket transport is used
        reconnection: true, // Enable reconnection
        reconnectionAttempts: 5, // Number of reconnection attempts before giving up
        reconnectionDelay: 1000, // Time to wait before attempting to reconnect
      });

      socket.current.emit("add-user", currentUser._id);

      socket.current.on("connect", () => {
        console.log("Connected to socket server.");
      });

      socket.current.on("disconnect", (reason) => {
        console.log(`Disconnected from socket server. Reason: ${reason}`);
      });

      socket.current.on("reconnect_attempt", (attemptNumber) => {
        console.log(`Attempting to reconnect: Attempt #${attemptNumber}`);
      });

      socket.current.on("receive-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.current.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(data);
          } catch (error) {
            console.error("Failed to fetch contacts:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchContacts();
  }, [currentUser, navigate]);

  const handleSendMessage = () => {
    const message = messageInputRef.current.value;
    if (message.trim()) {
      socket.current.emit(
        "send-message",
        { to: currentChat._id, message },
        (response) => {
          if (response.error) {
            console.error("Message sending error:", response.error);
          }
        }
      );
      messageInputRef.current.value = ""; // Clear input after sending
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  {
    /* <Link to="/register">Create One.</Link> */
  }

  return (
    <Container>
      <div className="header">
        <div className="brand">
          <img src="chatlogo.png" alt="logo" />
          <h1>HIDDCHAT</h1>
        </div>
        <div className="clients">
          <div>
            <Link to="/notification">
              <img src="noti.png" alt="notification" />
            </Link>
            <span onClick={toggleNotificationMenu}>Notifications</span>
          </div>
          <div>
            <Link to="/friend">
              <img src="friends.png" alt="friends" />
            </Link>
            <span>friends</span>
          </div>
        </div>
      </div>

      {showNotificationMenu && <Noti></Noti>}

      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            messages={messages}
            onSendMessage={handleSendMessage}
            messageInputRef={messageInputRef}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #000;

  .header {
    margin-left: 320px;
    display: flex;
    gap: 200px;
    align-items: center;
  }

  .clients {
    display: flex;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      gap: 2px;

      img {
        height: 2.2rem;
        margin-right: 10px;
      }

      span {
        font-size: 0.5rem;
        margin-right: 10px;
        margin-top: 0.2rem;
      }
    }
  }

  .container {
    border: 1px solid #fff;
    border-radius: 4px;
    height: 80vh;
    width: 80vw;
    background-color: #000;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
`;
