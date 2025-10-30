import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);

  // ✅ Load user (if logged in)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/search_jobs?query=Developer&location=India"
        );
        const data = await response.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs.slice(0, 30)); // show top 30
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div style={homeContainer}>
      <h1 style={titleStyle}>CareerPilot 🚀</h1>
      <p style={subtitleStyle}>
        {user && user.name
          ? `Welcome, ${user.name}! Explore your personalized career tools.`
          : "Welcome! Explore live jobs, build your resume, and grow your career."}
      </p>

      {/* 🔹 Feature Cards */}
      <div style={cardGrid}>
        <FeatureCard
          title="Resume Optimization"
          text="Upload your resume and get instant ATS feedback with actionable suggestions."
          link="/resume"
        />
        <FeatureCard
          title="Job Search"
          text="Explore live job listings tailored to your skills, salary expectations, and location."
          link="/jobs"
        />
        <FeatureCard
          title="Skill Assessment"
          text="Test and improve your skills with our smart evaluation tools."
          link="/skills"
        />
      </div>

      {/* 🔹 Job Section */}
      <div style={jobsSection}>
        <h2 style={jobsTitle}>🔥 Top Job Openings</h2>
        <div style={jobsGrid}>
          {jobs.map((job, index) => (
            <div
              key={index}
              style={jobCard}
              className="job-card"
              onClick={() =>
                window.open(
                  job.apply_link || job.url || "#",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <div style={jobHeader}>
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={job.company || "Company Logo"}
                    style={jobLogo}
                  />
                )}
                <div>
                  <h3 style={jobTitle}>{job.title}</h3>
                  <p style={jobCompany}>{job.company || "Unknown Company"}</p>
                </div>
              </div>
              <p style={jobLocation}>📍 {job.location || "Remote / Flexible"}</p>
              <p style={jobType}>
                💼 {job.type || "Full-Time"} | 💰 {job.salary || "N/A"}
              </p>
              <button
                style={applyButton}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    job.apply_link || job.url || "#",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                Apply Now
              </button>
            </div>
          ))}

          {jobs.length === 0 && (
            <p style={{ color: "#bbb", gridColumn: "1 / -1" }}>
              No jobs found right now. Please check back later!
            </p>
          )}
        </div>
      </div>

      {/* 🔹 Hover Animation Styles */}
      <style>
        {`
          .job-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .job-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 20px rgba(30,144,255,0.4);
          }
          .job-card:hover img {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

// ✅ Feature Card Component
function FeatureCard({ title, text, link }) {
  return (
    <div style={card}>
      <h2 style={cardTitle}>{title}</h2>
      <p style={cardText}>{text}</p>
      <Link to={link} style={cardButton}>
        Explore
      </Link>
    </div>
  );
}

// 🎨 Blue-Black Theme Styles
const homeContainer = {
  textAlign: "center",
  padding: "40px 20px",
  color: "#e0e0e0",
  background: "linear-gradient(180deg, #0d0d0d 0%, #111b2a 100%)",
  minHeight: "100vh",
};

const titleStyle = {
  fontSize: "2.5rem",
  color: "#1e90ff",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1.2rem",
  marginBottom: "40px",
  color: "#b0b0b0",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "25px",
  maxWidth: "1000px",
  margin: "0 auto 60px",
};

const card = {
  backgroundColor: "#1c1c1c",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
  textAlign: "center",
  transition: "transform 0.3s, box-shadow 0.3s",
};

const cardTitle = {
  fontSize: "1.5rem",
  marginBottom: "12px",
  color: "#1e90ff",
};

const cardText = {
  fontSize: "1rem",
  marginBottom: "20px",
  color: "#c0c0c0",
};

const cardButton = {
  display: "inline-block",
  padding: "10px 18px",
  backgroundColor: "#1e90ff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  transition: "background 0.3s",
};

const jobsSection = {
  marginTop: "60px",
  backgroundColor: "#111",
  padding: "40px 20px",
  borderRadius: "12px",
  maxWidth: "1100px",
  margin: "60px auto",
  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
};

const jobsTitle = {
  color: "#1e90ff",
  fontSize: "1.8rem",
  marginBottom: "25px",
};

const jobsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
};

const jobCard = {
  backgroundColor: "#1a1a1a",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "left",
  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
};

const jobHeader = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "12px",
};

const jobLogo = {
  width: "50px",
  height: "50px",
  objectFit: "contain",
  borderRadius: "8px",
  transition: "transform 0.3s ease",
  backgroundColor: "#fff",
  padding: "4px",
};

const jobTitle = {
  fontSize: "1.1rem",
  color: "#1e90ff",
  marginBottom: "4px",
};

const jobCompany = {
  color: "#e0e0e0",
  fontWeight: "500",
};

const jobLocation = {
  color: "#b0b0b0",
  fontSize: "0.9rem",
  marginBottom: "6px",
};

const jobType = {
  color: "#aaa",
  fontSize: "0.85rem",
  marginBottom: "12px",
};

const applyButton = {
  padding: "8px 16px",
  backgroundColor: "#1e90ff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.3s, transform 0.2s",
};

export default Home;
