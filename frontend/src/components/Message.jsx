import React from "react";

const Message = ({ message, isOwnMessage }) => {
  if (!message) return null;

  return (
    <div className={`message-wrapper ${isOwnMessage ? "sent" : "received"}`}>
      <div className="message-box">
        <strong>{message.sender}:</strong> {message.text}
      </div>
    </div>
  );
};

export default Message;
