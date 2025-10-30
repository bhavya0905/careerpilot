import React, { useState } from "react";

function Profile({ user }) {
  const [resume, setResume] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file.name);

      // Dummy ATS score for now
      const score = Math.floor(Math.random() * 40) + 60;
      setAtsScore(score);

      if (score < 75) {
        setSuggestedCourses([
          { name: "Python for Everybody", link: "https://www.coursera.org/specializations/python" },
          { name: "React Frontend Course", link: "https://www.udemy.com/course/react-the-complete-guide/" },
        ]);
      } else {
        setSuggestedCourses([]);
      }
    }
  };

  if (!user) {
    return (
      <p style={{ textAlign: "center", padding: "40px", color: "#e0e0e0" }}>
        ⚠️ Please login to view your profile.
      </p>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>👤 Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Skills:</strong> {user.skills || "Not provided"}</p>

        <h3 style={subtitle}>📄 Upload Resume</h3>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={fileInput} />
        {resume && <p style={text}>Uploaded: {resume}</p>}

        {atsScore && (
          <div style={atsBox}>
            <h3 style={subtitle}>📊 ATS Score: <span style={{ color: "#1e90ff" }}>{atsScore}%</span></h3>
            {suggestedCourses.length > 0 ? (
              <div>
                <h4 style={subtitle}>🚀 Suggested Courses</h4>
                <ul style={list}>
                  {suggestedCourses.map((course, i) => (
                    <li key={i}>
                      <a href={course.link} target="_blank" rel="noreferrer" style={link}>
                        {course.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p style={successText}>✅ Your resume looks strong!</p>
            )}
          </div>
        )}
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
  maxWidth: "600px",
  width: "100%",
  color: "#e0e0e0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
};
const title = { fontSize: "2rem", color: "#1e90ff", marginBottom: "15px" };
const subtitle = { fontSize: "1.2rem", color: "#1e90ff", marginTop: "20px", marginBottom: "10px" };
const text = { color: "#c0c0c0", marginBottom: "10px" };
const fileInput = { marginTop: "10px", marginBottom: "15px" };
const atsBox = { marginTop: "20px", padding: "15px", backgroundColor: "#2a2a2a", borderRadius: "10px" };
const list = { listStyle: "none", padding: 0 };
const link = { color: "#1e90ff", textDecoration: "none", fontWeight: "bold" };
const successText = { color: "#27ae60", fontWeight: "bold" };

export default Profile;
