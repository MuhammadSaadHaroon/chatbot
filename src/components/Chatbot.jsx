import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "YOUR_OPENAI_API_KEY", // Replace with your OpenAI API key
  dangerouslyAllowBrowser: true  // Only for development
});

function Chatbot({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Load chat messages when a chat is selected
  useEffect(() => {
    if (selectedChat) setMessages(selectedChat.messages || []);
  }, [selectedChat]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message function
  const sendMessage = async () => {
    if (!input || !selectedChat) return;

    const userMsg = { sender: "user", text: input, timestamp: Timestamp.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      // OpenAI API call
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }]
      });

      const aiReply = response.choices[0].message.content;
      const botMsg = { sender: "bot", text: aiReply, timestamp: Timestamp.now() };

      setMessages(prev => {
        const updated = [...prev, botMsg];
        // Save messages in Firestore
        const chatRef = doc(db, "chats", selectedChat.id);
        updateDoc(chatRef, { messages: updated, updatedAt: serverTimestamp() })
          .catch(err => console.error(err));
        return updated;
      });

    } catch (err) {
      console.error("Error generating AI response:", err);
      const botMsg = { sender: "bot", text: "AI response failed.", timestamp: Timestamp.now() };
      setMessages(prev => [...prev, botMsg]);
    }
  };

  // Enter key handler
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await sendMessage();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {selectedChat ? (
        <>
          <div style={{ flex: 1, overflowY: "auto", padding: "10px", marginBottom: "10px" }}>
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
                  maxWidth: "70%",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
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
        </>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Select or start a new chat</p>
      )}
    </div>
  );
}

export default Chatbot;
