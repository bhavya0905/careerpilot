import React from "react";

function Mock() {
  const url = "https://www.pramp.com/";

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>🎤 Mock Interviews</h2>
        <p style={text}>
          Practice real-time interviews with peers and improve your confidence.
        </p>
        <a href={url} target="_blank" rel="noreferrer" style={button}>
          Start on Pramp
        </a>
      </div>
    </div>
  );
}

// 🎨 Styles
const container = { display: "flex", justifyContent: "center", padding: "40px" };
const card = {
  backgroundColor: "#1f1f1f",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "500px",
  textAlign: "center",
  color: "#e0e0e0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
};
const title = { fontSize: "1.8rem", color: "#1e90ff", marginBottom: "15px" };
const text = { fontSize: "1rem", marginBottom: "20px", color: "#c0c0c0" };
const button = {
  display: "inline-block",
  padding: "10px 18px",
  backgroundColor: "#1e90ff",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Mock;
