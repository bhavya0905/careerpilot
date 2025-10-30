import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Resume() {
  const [darkMode, setDarkMode] = useState(false);
  const [template, setTemplate] = useState("modern");
  const [palette, setPalette] = useState("blue");
  const resumeRef = useRef(null);

  // ✅ PDF Export
  const downloadPDF = async () => {
    const input = resumeRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save("Resume.pdf");
  };

  // === Choose template styles dynamically ===
  const styles = getTemplateStyles(template, darkMode, palette);

  return (
    <div
      style={{
        ...container,
        backgroundColor: darkMode ? "#121212" : "#eaeaea",
        color: darkMode ? "#f0f0f0" : "#333",
      }}
    >
      {/* Resume Paper */}
      <div ref={resumeRef} style={styles.resumePaper}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarName}>Bhavya Jain</h2>
          <h4 style={styles.subtitle}>Full Stack Developer</h4>

          <h3 style={styles.sidebarSection}>Contact</h3>
          <p>📧 bhavya@example.com</p>
          <p>📱 +91 9876543210</p>
          <p>
            <a href="https://linkedin.com/in/username" style={styles.link}>
              LinkedIn
            </a>
          </p>
          <p>
            <a href="https://github.com/username" style={styles.link}>
              GitHub
            </a>
          </p>

          <h3 style={styles.sidebarSection}>Skills</h3>
          {renderSkill("JavaScript", "90%", "#f0db4f")}
          {renderSkill("React", "85%", "#61dafb")}
          {renderSkill("Node.js", "80%", "#68a063")}

          <h3 style={styles.sidebarSection}>Certifications</h3>
          <ul style={{ paddingLeft: "20px", textAlign: "left" }}>
            <li>AWS Certified Developer</li>
            <li>Google Cloud Fundamentals</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main style={styles.mainContent}>
          <section>
            <h2 style={styles.sectionTitle}>Profile</h2>
            <p style={styles.bodyText}>
              Passionate developer with expertise in MERN stack, API
              integrations, and scalable applications.
            </p>
          </section>

          <section>
            <h2 style={styles.sectionTitle}>Experience</h2>
            <div style={styles.timelineItem}>
              <h3>Software Engineer @ TechCorp</h3>
              <span style={styles.dateText}>2022 - Present</span>
              <p style={styles.bodyText}>
                - Developed scalable APIs <br />
                - Improved system performance by 30% <br />
                - Led 3 junior developers
              </p>
            </div>
            <div style={styles.timelineItem}>
              <h3>Intern @ StartupX</h3>
              <span style={styles.dateText}>2021 - 2022</span>
              <p style={styles.bodyText}>
                - Built frontend features with React <br />
                - Integrated REST APIs and improved UI/UX
              </p>
            </div>
          </section>

          <section>
            <h2 style={styles.sectionTitle}>Projects</h2>
            <div style={styles.projectCard}>
              <h3>CareerPilot</h3>
              <p style={styles.bodyText}>
                AI-powered career guidance platform with resume analysis & job
                recommendations.
              </p>
              <a href="https://github.com/username/careerpilot" style={styles.link}>
                GitHub
              </a>
            </div>
            <div style={styles.projectCard}>
              <h3>Portfolio Website</h3>
              <p style={styles.bodyText}>
                Personal portfolio built with React and Flask backend.
              </p>
              <a href="https://username.github.io" style={styles.link}>
                Live Demo
              </a>
            </div>
          </section>

          <section>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div style={styles.timelineItem}>
              <h3>B.Tech in CSE</h3>
              <span style={styles.dateText}>2018 - 2022</span>
              <p style={styles.bodyText}>XYZ University</p>
            </div>
          </section>
        </main>
      </div>

      {/* Actions */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={downloadPDF} style={button}>
          ⬇ Download PDF
        </button>
        <button onClick={() => setDarkMode(!darkMode)} style={button}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={button}
        >
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
          <option value="creative">Creative</option>
        </select>
        <select
          value={palette}
          onChange={(e) => setPalette(e.target.value)}
          style={button}
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
        <a
          href="https://enhancv.com"
          target="_blank"
          rel="noreferrer"
          style={{ ...button, textDecoration: "none", display: "inline-block" }}
        >
          🚀 Optimize on Enhancv
        </a>
      </div>
    </div>
  );
}

/* === Base Styles === */
const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
};

const button = {
  padding: "10px 18px",
  margin: "5px",
  backgroundColor: "#1e90ff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

/* === Template Variants === */
function getTemplateStyles(template, darkMode, palette) {
  const colors = {
    blue: "#1e90ff",
    green: "#28a745",
    red: "#dc3545",
  };

  const accent = colors[palette] || colors.blue;

  const base = {
    resumePaper: {
      display: "flex",
      width: "210mm",
      minHeight: "297mm",
      margin: "0 auto",
      borderRadius: "4px",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      fontFamily: "Arial, sans-serif",
      overflow: "hidden",
      backgroundColor: darkMode ? "#1e1e1e" : "#fff",
      color: darkMode ? "#f0f0f0" : "#333",
    },
    sidebar: {
      flex: "1",
      padding: "20px",
      textAlign: "center",
    },
    sidebarName: { fontSize: "1.6rem", margin: "10px 0" },
    subtitle: { marginBottom: "20px", color: accent },
    sidebarSection: {
      fontSize: "1.2rem",
      margin: "20px 0 10px 0",
      borderBottom: `2px solid ${accent}`,
      paddingBottom: "5px",
    },
    mainContent: { flex: "3", padding: "30px" },
    sectionTitle: {
      fontSize: "1.4rem",
      margin: "20px 0 10px 0",
      color: accent,
      borderBottom: `2px solid ${accent}`,
      paddingBottom: "5px",
    },
    timelineItem: { marginBottom: "15px" },
    projectCard: {
      border: `1px solid ${accent}`,
      borderRadius: "6px",
      padding: "10px",
      marginBottom: "10px",
    },
    bodyText: { fontSize: "0.95rem", lineHeight: "1.4" },
    dateText: { fontStyle: "italic", color: "#777", fontSize: "0.85rem" },
    link: {
      color: accent,
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  if (template === "classic") {
    return {
      ...base,
      resumePaper: { ...base.resumePaper, fontFamily: "Times New Roman, serif" },
      sidebar: { ...base.sidebar, backgroundColor: "#f5f5f5" },
      sectionTitle: {
        ...base.sectionTitle,
        borderBottom: `1px solid ${accent}`,
      },
      projectCard: {
        ...base.projectCard,
        borderLeft: `4px solid ${accent}`,
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
      },
    };
  }

  if (template === "creative") {
    return {
      ...base,
      resumePaper: {
        ...base.resumePaper,
        fontFamily: "Verdana, sans-serif",
        border: `6px solid ${accent}`,
      },
      sidebar: {
        ...base.sidebar,
        backgroundColor: accent,
        color: "#fff",
      },
      sidebarSection: {
        ...base.sidebarSection,
        borderBottom: `2px solid #fff`,
        color: "#fff",
      },
      sectionTitle: {
        ...base.sectionTitle,
        borderBottom: `3px dashed ${accent}`,
      },
      projectCard: {
        ...base.projectCard,
        backgroundColor: "#f0f8ff",
        border: `2px dashed ${accent}`,
      },
    };
  }

  return base; // default = modern
}

/* === Helpers === */
const renderSkill = (name, width, color) => (
  <div style={{ marginBottom: "10px", textAlign: "left" }}>
    <span>{name}</span>
    <div
      style={{
        background: "#ddd",
        borderRadius: "5px",
        overflow: "hidden",
        marginTop: "5px",
      }}
    >
      <div
        style={{
          width: width,
          height: "8px",
          background: color,
        }}
      ></div>
    </div>
  </div>
);

export default Resume;
