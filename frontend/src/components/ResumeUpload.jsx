import React, { useState } from "react";

function ResumeUpload({ user }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://127.0.0.1:5000/upload_resume/${user.id}`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Resume</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ResumeUpload;
