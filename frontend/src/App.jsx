import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Jobs from "./pages/JobSearch";
import Skills from "./pages/Skills";
import Mock from "./pages/Mock";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// ✅ Navbar component
function Navbar({ user, handleLogout }) {
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "#1e90ff" }}>CareerPilot 🚀</h2>
      <div style={navLinks}>
        <Link to="/" style={navLink}>Home</Link>
        <Link to="/jobs" style={navLink}>Jobs</Link>
        <Link to="/resume" style={navLink}>Resume</Link>
        <Link to="/mock" style={navLink}>Mock</Link>
        <Link to="/skills" style={navLink}>Skills</Link>
        {user ? (
          <>
            <Link to="/profile" style={navLink}>Profile</Link>
            <button onClick={handleLogout} style={logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLink}>Login</Link>
            <Link to="/signup" style={navLink}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// ✅ Main App
function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div style={appContainer}>
        <Navbar user={user} handleLogout={handleLogout} />
        <div style={contentWrapper}>
          <Routes>
            {/* 👇 Home loads first, visible to everyone */}
            <Route path="/" element={<Home user={user} />} />

            {/* Open-access routes */}
            <Route path="/jobs" element={<Jobs user={user} />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/mock" element={<Mock />} />
            <Route path="/skills" element={<Skills />} />

            {/* Auth routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setUser={setUser} />} />

            {/* Profile (optional, still visible even if logged out) */}
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// 🎨 Styles (Blue-Black Theme)
const appContainer = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#121212",
  color: "#e0e0e0",
  fontFamily: "Arial, sans-serif",
};

const navStyle = {
  backgroundColor: "#1f1f1f",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
};

const navLinks = { display: "flex", gap: "18px" };

const navLink = {
  color: "#e0e0e0",
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  transition: "0.3s",
};

const logoutBtn = {
  background: "#e74c3c",
  border: "none",
  color: "white",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

const contentWrapper = {
  flex: 1,
  padding: "80px 20px 20px 20px",
};

export default App;
