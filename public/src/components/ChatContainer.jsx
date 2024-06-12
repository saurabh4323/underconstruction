import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Menu from "./Menu";
import {
  recieveMessageRoute,
  sendMessageRoute,
  markAsReadRoute,
} from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  // This remains in your useEffect for adding and removing the mousedown event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const storedUser = localStorage.getItem(
        process.env.REACT_APP_LOCALHOST_KEY
      );
      if (storedUser) {
        const user = JSON.parse(storedUser);
        try {
          const response = await axios.post(recieveMessageRoute, {
            from: user._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      }
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const storedUser = localStorage.getItem(
      process.env.REACT_APP_LOCALHOST_KEY
    );
    if (storedUser) {
      const user = JSON.parse(storedUser);
      socket?.emit("send-msg", { to: currentChat._id, from: user._id, msg });

      try {
        const response = await axios.post(sendMessageRoute, {
          from: user._id,
          to: currentChat._id,
          message: msg,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: true, message: msg },
        ]);
        await axios.post(markAsReadRoute, {
          messageId: response.data._id,
          userId: user._id,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  useEffect(() => {
    socket?.on("msg-recieve", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { fromSelf: false, message: msg },
      ]);
    });

    return () => {
      socket?.off("msg-recieve");
    };
  }, [socket]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar" onClick={toggleMenu}>
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt="User Avatar"
            />
            {menuVisible && <Menu ref={menuRef} />}
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.fromSelf ? "sended" : "recieved"}`}
          >
            <div className="content">
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        position: relative;

        img {
          height: 3rem;
          cursor: pointer;
        }
      }

      .username h3 {
        color: white;
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }

    .message {
      display: flex;
      align-items: flex-end;

      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 0.5rem 1rem;
        font-size: 1.1rem;
        border-radius: 10px;
        color: white;
        background-color: #007bff;
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background-color: #007bff;
        color: white;
      }
    }

    .recieved {
      justify-content: flex-start;

      .content {
        background-color: #f1f1f1;
        color: black;
      }
    }
  }
`;
