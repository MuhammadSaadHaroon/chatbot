import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

function Navbar() {
  const logoutUser = () => signOut(auth);

  return (
    <div style={{
      width: "100% !important", height: "60px", backgroundColor: "#1e1e2e", color: "white",
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px"
    }}>
      <h2>Chatbot App</h2>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span>{auth.currentUser?.email}</span>
        <button onClick={logoutUser} style={{
          padding: "8px 15px", background: "#ff3e3e", border: "none", color: "white",
          borderRadius: "5px", cursor: "pointer"
        }}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
