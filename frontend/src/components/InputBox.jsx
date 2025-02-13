import React, { useState } from "react";

const InputBox = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default InputBox;
