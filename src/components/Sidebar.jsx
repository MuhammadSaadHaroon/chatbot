import React from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Sidebar({ selectChat }) {

  const createNewChat = async () => {
    const docRef = await addDoc(collection(db, "chats"), {
      userId: auth.currentUser.uid,
      messages: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    // Set the new chat as selected
    selectChat({ id: docRef.id, messages: [] });
  };

  return (
    <div style={{
      width: "300px",
      borderRight: "1px solid gray",
      padding: "10px",
      display: "flex",
      flexDirection: "column"
    }}>
      <button
        onClick={createNewChat}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          background: "#1e1e2e",
          color: "white",
          cursor: "pointer"
        }}
      >
        + New Chat
      </button>
    </div>
  );
}

export default Sidebar;
