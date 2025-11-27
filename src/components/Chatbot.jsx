import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message function
  const sendMessage = () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    // Manual bot responses
    let botReply = "Sorry, I can’t answer that.";
    const text = input.toLowerCase();

    if (text === "hello") botReply = "Hi there!";
    else if (text === "how are you") botReply = "I’m good, thanks!";

    const botMsg = { sender: "bot", text: botReply };
    setMessages(prev => [...prev, botMsg]);

    setInput("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            margin: "5px 0"
          }}>
            <div style={{
              background: msg.sender === "user" ? "#DCF8C6" : "#FFF",
              padding: "10px 15px",
              borderRadius: "15px",
              maxWidth: "70%"
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        style={{ padding: "10px", borderRadius: "5px", border: "1px solid gray" }}
      />
    </div>
  );
}

export default Chatbot;
