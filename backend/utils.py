import hashlib
import re
import os
import requests
from PyPDF2 import PdfReader, errors as pdf_errors
from rapidfuzz import fuzz
from config import Config

# -------------------- Skill Synonyms --------------------
SKILL_SYNONYMS = {
    "js": "JavaScript", "javascript": "JavaScript",
    "py": "Python", "python": "Python",
    "ml": "Machine Learning", "machine learning": "Machine Learning",
    "reactjs": "React", "react": "React",
    "sql": "SQL", "aws": "AWS", "excel": "Excel", "java": "Java"
}

# -------------------- Security --------------------
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

# -------------------- Resume Parsing --------------------
def extract_skills_from_pdf(filepath):
    skills_found = set()
    try:
        if not os.path.exists(filepath):
            return []
        with open(filepath, "rb") as f:
            reader = PdfReader(f)
            text = " ".join([p.extract_text() or "" for p in reader.pages]).lower()
            for key, canonical in SKILL_SYNONYMS.items():
                if re.search(rf"\b{re.escape(key)}\b", text):
                    skills_found.add(canonical)
    except Exception as e:
        print(f"Error parsing PDF: {e}")
    return list(skills_found)

# -------------------- External Jobs Fetching --------------------
def fetch_external_jobs(query, limit=10):
    """Fetch real jobs from RapidAPI (e.g., JSearch/Naukri API)."""
    if not Config.RAPIDAPI_KEY or Config.RAPIDAPI_KEY == "YOUR_RAPIDAPI_KEY":
        print("⚠️ RapidAPI key not set. Returning no external jobs.")
        return []

    url = Config.RAPIDAPI_URL
    headers = Config.RAPIDAPI_HEADERS
    params = {"query": query, "num_pages": 1}

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        jobs_raw = data.get("data", []) if isinstance(data, dict) else []

        standardized_jobs = []
        for job in jobs_raw:
            standardized_jobs.append({
                "id": f"ext_{job.get('job_id') or job.get('id')}",
                "title": job.get("job_title", job.get("title", "N/A")),
                "company": job.get("employer_name", "N/A"),
                "description": job.get("job_description", job.get("description", "")),
                "location": job.get("job_city", job.get("location", "Remote/Unknown")),
                "apply_link": job.get("job_apply_link") or job.get("job_url") or "",
                "source": "Naukri/RapidAPI"
            })
        return standardized_jobs[:limit]

    except requests.RequestException as e:
        print(f"Error fetching external jobs: {e}")
        return []

# -------------------- Ranking --------------------
def compute_fuzzy_score(resume_skills, job_text):
    if not resume_skills:
        return 0
    job_text_lower = job_text.lower()
    score = 0
    for skill in resume_skills:
        s = skill.lower()
        if s in job_text_lower:
            score += 5
        for word in re.findall(r"\b\w+\b", job_text_lower):
            if fuzz.ratio(s, word) > 85:
                score += 3
    return score

def rank_jobs(all_jobs, resume_skills):
    for job in all_jobs:
        text = f"{job.get('title','')} {job.get('description','')}"
        job["score"] = compute_fuzzy_score(resume_skills, text)
    return sorted(all_jobs, key=lambda x: x.get("score", 0), reverse=True)
