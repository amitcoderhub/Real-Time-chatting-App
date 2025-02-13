import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import "./style.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    if (username.trim()) {
      setEntered(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  return (
    <div className="app">
      {!entered ? (
        <div className="username-container">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger on Enter key press
          />
          <button onClick={handleEnter}>Enter Chat</button>
        </div>
      ) : (
        <ChatWindow username={username} />
      )}
    </div>
  );
};

export default App;
