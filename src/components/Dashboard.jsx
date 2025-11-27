import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";

function Dashboard() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar selectChat={setSelectedChat} />
        <div style={{ flex: 1, padding: "10px" }}>
          <Chatbot selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
