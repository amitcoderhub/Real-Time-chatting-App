import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "./Message";
import InputBox from "./InputBox";

const socket = io("http://localhost:8080");

const ChatWindow = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    socket.emit("join", username);

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);

      // Scroll to bottom when new message arrives
      const chatWindow = document.getElementById("chatWindow");
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    });

    socket.on("userStatus", (updatedUsers) => {
      // Only show active users
      setUsers(updatedUsers);
    });

    return () => {
      socket.off("message");
      socket.off("userStatus");
    };
  }, [username]);

  const sendMessage = (messageText) => {
    if (messageText.trim()) {
      socket.emit("message", { text: messageText, sender: username });
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Title (Fixed at the top & Centered) */}
      <h1 className="chat-title">Chat App</h1>

      {/* "See More Users Online" Button */}
      <button className="show-status-btn" onClick={() => setShowStatus(!showStatus)}>
        {showStatus ? "Hide Online Users" : "See More Users Online"}
      </button>

      {/* Status Section (Show/Hide based on button click) */}
      {showStatus && (
        <div className="status-container">
          <p><strong>🙋 You:</strong> {username}</p>
          {Object.keys(users).length === 0 ? (
            <p>No users online</p>
          ) : (
            Object.keys(users).map((user, index) => (
              <p key={index}>👤 {user} Online</p>
            ))
          )}
        </div>
      )}

      {/* Chat Window */}
      <div className="chat-window" id="chatWindow">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isOwnMessage={msg.sender === username} />
        ))}
      </div>

      {/* Input Box */}
      <InputBox sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
