import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store temporary user info (optional)
        localStorage.setItem("user", JSON.stringify({ name: data.username || form.username }));

        alert("✅ Signup successful! Redirecting to Login...");
        navigate("/login"); // redirect after successful signup
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div style={container}>
      <form style={card} onSubmit={handleSubmit}>
        <h2 style={title}>📝 Signup</h2>
        <input
          style={input}
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          style={input}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          style={input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit" style={button}>
          Signup
        </button>
      </form>
    </div>
  );
}

// 🎨 Styles
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  backgroundColor: "#0a0a12",
};

const card = {
  backgroundColor: "#141b29",
  padding: "40px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "400px",
  color: "#e0e0e0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const title = {
  fontSize: "1.8rem",
  color: "#1e90ff",
  marginBottom: "20px",
  textAlign: "center",
};

const input = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #333",
  backgroundColor: "#1e2535",
  color: "#fff",
  fontSize: "1rem",
};

const button = {
  backgroundColor: "#1e90ff",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "10px",
};

export default Signup;
