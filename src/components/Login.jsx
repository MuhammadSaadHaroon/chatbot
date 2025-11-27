import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid gray"
  };
  const btnStyle = {
    width: "100%", padding: "10px", marginTop: "10px", background: "#1e1e2e", color: "white",
    border: "none", borderRadius: "5px", cursor: "pointer"
  };

  return (
    <div style={{
      width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
      background: "#eaeaea"
    }}>
      <div style={{ width: "350px", padding: "30px", borderRadius: "10px", background: "white", boxShadow: "0px 0px 10px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={inputStyle}/>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={inputStyle}/>
          <button type="submit" style={btnStyle}>Login</button>
        </form>
        <button onClick={handleGoogleLogin} style={{ ...btnStyle, background: "#4285F4", marginTop: "10px" }}>
          Continue with Google
        </button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
