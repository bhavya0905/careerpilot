import React from "react";
// Import necessary routing components. Switched from BrowserRouter to HashRouter 
// to avoid "Failed to execute 'assign' on 'Location'" error in restricted environments.
import { NavLink, HashRouter as Router, Routes, Route } from "react-router-dom";

// Define the Navbar component which uses NavLink and NavButton
function Navbar({ user, handleLogout }) {
  // Base styles for the Navbar structure
  const navStyle = {
    backgroundColor: "#2c3e50",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  // Base styles for the links (updated for clickability)
  const linkBase = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    position: "relative",
    padding: "8px 10px", // Increased padding
    transition: "color 0.3s ease, transform 0.15s ease, background-color 0.15s ease",
    cursor: "pointer", // Makes it look clickable
    borderRadius: '6px',
    userSelect: 'none',
  };

  const logoutBtn = {
    background: "#e74c3c",
    border: "none",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.1s ease",
    fontWeight: '600'
  };

  // Helper component to handle link logic and hover state
  const NavButton = ({ to, label }) => {
    // State to manage hover, which helps with the "clickable" look
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <NavLink
        key={to}
        to={to}
        end
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={linkBase}
      >
        {({ isActive }) => {
          // Calculate dynamic styles for the inner span based on both component state (isHovered) and router state (isActive)
          const dynamicStyles = {
            display: "inline-block",
            // 1. Links that are active look yellow (or on hover for a clickable effect)
            color: isActive || isHovered ? "#f1c40f" : "white",
            // Hover effect for clickable look
            transform: isHovered ? "translateY(-1px)" : "translateY(0)",
            backgroundColor: isHovered && !isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
            position: "relative",
            padding: "0 0", 
            transition: "color 0.3s ease, transform 0.15s ease, background-color 0.15s ease",
          };

          return (
            <span
              style={dynamicStyles}
            >
              {label}
              {/* 2. Add underline under the active links */}
              <span
                style={{
                  content: "''",
                  position: "absolute",
                  left: 0,
                  bottom: "-4px", // Positioned slightly lower
                  height: "3px",  // Thicker underline
                  // Underline is visible only when isActive is true
                  width: isActive ? "100%" : "0%",
                  backgroundColor: "#f1c40f",
                  transition: "width 0.3s ease-in-out",
                }}
              ></span>
            </span>
          );
        }}
      </NavLink>
    );
  };
  
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "white", margin: 0, fontWeight: '700' }}>CareerPilot 🚀</h2>
      <div style={navLinks}>
        {/* Render primary navigation links using the new NavButton component */}
        {[
          ["/home", "Home"],
          ["/jobs", "Jobs"],
          ["/resume", "Resume"],
          ["/mock", "Mock"],
          ["/skills", "Skills"],
        ].map(([to, label]) => (
          <NavButton key={to} to={to} label={label} />
        ))}

        {user ? (
          <>
            <NavButton to="/profile" label="Profile" />
            <button
              onClick={handleLogout}
              style={logoutBtn}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#c0392b")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#e74c3c")
              }
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavButton to="/login" label="Login" />
            <NavButton to="/signup" label="Signup" />
          </>
        )}
      </div>
    </nav>
  );
}

// --- Inline Styles for Placeholder Page Components ---
const cardStyle = {
  padding: '32px',
  textAlign: 'center',
  color: '#4b5563',
  backgroundColor: 'white',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  borderRadius: '12px',
  marginTop: '32px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '56rem', // Approx max-w-lg in Tailwind
};

const titleStyle = {
  fontSize: '1.875rem',
  fontWeight: '700',
  marginBottom: '16px',
  color: '#2c3e50',
};

const textStyle = {
  fontSize: '1.125rem',
};

// --- Placeholder Page Components for Router Demo using inline styles ---
const HomePage = () => (
  <div style={cardStyle}>
    <h2 style={titleStyle}>Welcome Home!</h2>
    <p style={textStyle}>This is the main dashboard for CareerPilot. Navigate using the links above.</p>
  </div>
);

const GenericPage = ({ title }) => (
  <div style={cardStyle}>
    <h2 style={titleStyle}>{title} Section</h2>
    <p style={textStyle}>This content demonstrates that routing is active and your Navbar links are working correctly.</p>
  </div>
);

const ProfilePage = ({ user }) => (
  <div style={cardStyle}>
    <h2 style={titleStyle}>User Profile</h2>
    <p style={textStyle}>Welcome, **{user.name}**! You are viewing your career profile.</p>
  </div>
);

const LoginPage = () => <GenericPage title="Login/Signup" />;
const NotFound = () => <GenericPage title="404 Page Not Found" />;
// ----------------------------------------------------


// Main App component to export and provide the Router context
function App() {
  // Mock authentication state using useState
  const [user, setUser] = React.useState({ name: 'Jane Doe' });

  // Mock logout function
  const handleLogout = () => {
    setUser(null);
    console.log("User logged out.");
  };

  // Set global body styles using inline CSS
  React.useEffect(() => {
    // Apply global style
    document.body.style.backgroundColor = '#f3f4f6'; // Equivalent to bg-gray-100
    document.body.style.fontFamily = 'sans-serif'; // Equivalent to font-sans
  }, []);

  const appContainerStyle = {
    minHeight: '100vh',
  };

  const mainContentStyle = {
    padding: '24px', // Simplified padding: p-6
  };


  return (
    // Replaced BrowserRouter with HashRouter
    <Router>
      <div style={appContainerStyle}>
        <Navbar user={user} handleLogout={handleLogout} />
        
        <main style={mainContentStyle}>
          <Routes>
            {/* Note: HashRouter automatically prefixes routes with '#/' */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/jobs" element={<GenericPage title="Jobs" />} />
            <Route path="/resume" element={<GenericPage title="Resume Builder" />} />
            <Route path="/mock" element={<GenericPage title="Mock Interviews" />} />
            <Route path="/skills" element={<GenericPage title="Skill Assessment" />} />
            
            {user ? (
              <Route path="/profile" element={<ProfilePage user={user} />} />
            ) : (
              <Route path="/profile" element={<LoginPage />} />
            )}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
