import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Skills() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("coursera");
  const [suggestions, setSuggestions] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);

  // 🔍 Predefined skill suggestions
  const skillsList = [
    "Python", "JavaScript", "React", "Node.js", "SQL", "MongoDB",
    "Machine Learning", "Data Science", "AWS", "Azure", "Docker",
    "Kubernetes", "C++", "Java", "Cybersecurity", "Blockchain",
    "UI/UX", "Figma", "TensorFlow", "Artificial Intelligence"
  ];

  // 🎯 In-demand skills for career boost
  const inDemandSkills = [
    { name: "SQL", url: "https://www.w3schools.com/sql/" },
    { name: "React", url: "https://react.dev/learn" },
    { name: "Python", url: "https://www.python.org/about/gettingstarted/" },
    { name: "Data Science", url: "https://www.coursera.org/specializations/jhu-data-science" },
    { name: "Machine Learning", url: "https://www.coursera.org/learn/machine-learning" }
  ];

  useEffect(() => {
    // ✅ Get user profile skills from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const skills = userData.skills ? userData.skills.split(",").map(s => s.trim().toLowerCase()) : [];
      setUserSkills(skills);

      // ✅ Find missing skills
      const missing = inDemandSkills.filter(skill => !skills.includes(skill.name.toLowerCase()));
      setMissingSkills(missing);
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = skillsList.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      let searchUrl = "";
      if (platform === "coursera") {
        searchUrl = `https://www.coursera.org/search?query=${encodeURIComponent(query)}`;
      } else if (platform === "udemy") {
        searchUrl = `https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`;
      }
      window.open(searchUrl, "_blank");
    }
  };

  const selectSuggestion = (skill) => {
    setQuery(skill);
    setSuggestions([]);
  };

  const categories = [
    { 
      name: " Programming", 
      resources: [
        { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Python", url: "https://www.python.org/about/gettingstarted/" },
        { name: "C++", url: "https://www.learncpp.com/" }
      ]
    },
    { 
      name: " Data Science", 
      resources: [
        { name: "Machine Learning", url: "https://www.coursera.org/learn/machine-learning" },
        { name: "SQL", url: "https://www.w3schools.com/sql/" },
        { name: "Data Visualization", url: "https://www.tableau.com/learn/training" }
      ]
    },
    { 
      name: " Design", 
      resources: [
        { name: "UI/UX", url: "https://www.interaction-design.org/courses" },
        { name: "Figma", url: "https://help.figma.com/hc/en-us/articles/360040328654-Learn-Design-with-Figma" },
        { name: "Graphic Design", url: "https://www.canva.com/learn/graphic-design/" }
      ]
    },
    { 
      name: " AI & Cloud", 
      resources: [
        { name: "AI/ML", url: "https://www.udemy.com/topic/machine-learning/" },
        { name: "AWS", url: "https://aws.amazon.com/training/" },
        { name: "Azure", url: "https://learn.microsoft.com/en-us/training/azure/" }
      ]
    }
  ];

  const trendingSkills = [
    { name: "AI/ML", url: "https://www.coursera.org/learn/machine-learning" },
    { name: "Cloud Computing", url: "https://aws.amazon.com/training/" },
    { name: "Cybersecurity", url: "https://www.udemy.com/topic/cyber-security/" },
    { name: "Data Engineering", url: "https://www.datacamp.com/tracks/data-engineer" },
    { name: "React.js", url: "https://react.dev/learn" }
  ];

  return (
    <div style={container}>
      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} style={searchBox}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Search for any skill..."
            value={query}
            onChange={handleChange}
            style={searchInput}
          />
          {suggestions.length > 0 && (
            <ul style={suggestionBox}>
              {suggestions.map((s, i) => (
                <li key={i} style={suggestionItem} onClick={() => selectSuggestion(s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={dropdown}>
          <option value="coursera">Coursera</option>
          <option value="udemy">Udemy</option>
        </select>
        <button type="submit" style={searchBtn}>Search</button>
      </form>

      {/* Personalized Suggestions */}
      {missingSkills.length > 0 && (
        <div style={card}>
          <h2 style={title}> Suggested For You</h2>
          <p style={text}>Based on your profile, you may want to learn:</p>
          <ul style={list}>
            {missingSkills.map((skill, i) => (
              <li key={i}>
                <a href={skill.url} target="_blank" rel="noreferrer" style={link}>⭐ {skill.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Card */}
      <div style={card}>
        <h2 style={title}> Skill Development</h2>
        <p style={text}>Boost your knowledge with top learning platforms:</p>
        <ul style={list}>
          <li><a href="https://www.coursera.org/" target="_blank" rel="noreferrer" style={link}>Coursera</a></li>
          <li><a href="https://www.udemy.com/" target="_blank" rel="noreferrer" style={link}>Udemy</a></li>
          <li><a href="https://www.edx.org/" target="_blank" rel="noreferrer" style={link}>edX</a></li>
        </ul>
      </div>

      {/* Categories */}
      <div style={card}>
        <h2 style={title}> Categories</h2>
        {categories.map((cat, i) => (
          <div key={i} style={categoryBox}>
            <h3 style={{ color: "#1e90ff", marginBottom: "6px" }}>{cat.name}</h3>
            <ul style={list}>
              {cat.resources.map((res, j) => (
                <li key={j}>
                  <a href={res.url} target="_blank" rel="noreferrer" style={link}>{res.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trending Skills */}
      <div style={card}>
        <h2 style={title}> Trending Skills</h2>
        <ul style={list}>
          {trendingSkills.map((skill, i) => (
            <li key={i}>
              <a href={skill.url} target="_blank" rel="noreferrer" style={link}> {skill.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Back Button */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a
          href="/home"
          style={backBtn}
          onClick={(e) => {
            e.preventDefault();
            // go back if history exists, otherwise go to /home
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = "/home";
            }
          }}
        >
          ⬅ Back to Home
        </a>
      </div>
    </div>
  );
}

// 🎨 Styles
const container = { display: "flex", flexDirection: "column", alignItems: "center", padding: "40px", gap: "20px" };
const card = {
  backgroundColor: "#1f1f1f",
  padding: "25px",
  borderRadius: "12px",
  maxWidth: "600px",
  width: "100%",
  textAlign: "center",
  color: "#e0e0e0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
};
const categoryBox = {
  backgroundColor: "#2a2a2a",
  padding: "10px",
  borderRadius: "8px",
  margin: "8px 0",
};
const title = { fontSize: "1.6rem", color: "#1e90ff", marginBottom: "12px" };
const text = { marginBottom: "12px", color: "#c0c0c0" };
const list = { listStyle: "none", padding: 0 };
const link = { color: "#1e90ff", textDecoration: "none", fontWeight: "bold", cursor: "pointer" };
const backBtn = {
  display: "inline-block",
  padding: "10px 16px",
  backgroundColor: "#1e90ff",
  color: "white",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};
const searchBox = { display: "flex", gap: "10px", marginBottom: "20px", width: "100%", maxWidth: "600px" };
const searchInput = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #444",
  flex: 1,
  backgroundColor: "#2a2a2a",
  color: "white"
};
const searchBtn = {
  backgroundColor: "#1e90ff",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};
const dropdown = {
  backgroundColor: "#2a2a2a",
  color: "white",
  border: "1px solid #444",
  borderRadius: "6px",
  padding: "10px"
};
const suggestionBox = {
  position: "absolute",
  top: "40px",
  left: 0,
  right: 0,
  backgroundColor: "#2a2a2a",
  border: "1px solid #444",
  borderRadius: "6px",
  listStyle: "none",
  margin: 0,
  padding: "5px 0",
  zIndex: 10
};
const suggestionItem = {
  padding: "8px 12px",
  cursor: "pointer",
  color: "white"
};

export default Skills;
