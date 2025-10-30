# 🚀 CareerPilot

CareerPilot is a smart job and career assistance web app built using Flask (Python) for the backend and React.js for the frontend.  
It helps users search jobs, learn skills, and manage resumes all in one platform.

---

## 🧩 Features

- 🔐 User authentication (Signup & Login)
- 💼 Job search via integrated APIs & local DB
- 🧠 Skill recommendation engine
- 📄 Resume builder with multiple templates
- 📊 Personalized dashboard
- ☁️ Hosted backend (Flask) + frontend (React)

---

## 🏗️ Tech Stack

**Frontend:**
- React.js  
- Inline CSS within the jsx file  
- Axios (for API calls)

**Backend:**
- Python (Flask)  
- MySQL Database  
- Flask-JWT for authentication  
- Flask-CORS for cross-origin handling

---

##Future Improvements
1) AI-powered resume scoring
2) Integration with LinkedIn API
3) Skill progress tracking
4) Mobile-friendly responsive UI

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/bhavya0905/careerpilot.git
cd careerpilot

#Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt
python app.py

#Frontend setup
cd frontend
npm install
npm run dev

# Your app will be running on:
Frontend → http://localhost:3000
Backend → http://localhost:5000


