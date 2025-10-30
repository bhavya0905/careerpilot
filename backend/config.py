import os

class Config:
    SECRET_KEY = os.environ.get("FLASK_SECRET_KEY", "fallback_secret_key_change_me")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "supersecretkey123_production_ready")
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", "uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB limit

    DB_CONFIG = {
        "host": os.environ.get("DB_HOST", "localhost"),
        "user": os.environ.get("DB_USER", "root"),
        "password": os.environ.get("DB_PASSWORD", "Root@123"),
        "database": os.environ.get("DB_NAME", "careerpilot"),
        "port": int(os.environ.get("DB_PORT", 3306))
    }

    # 🔑 RapidAPI config — add your real key here
    RAPIDAPI_KEY = os.environ.get("RAPIDAPI_KEY", "828e7b9e30msh59c7231200383c7p1794aejsn0bd155215d80")
    RAPIDAPI_URL = "https://jsearch.p.rapidapi.com/search"
    RAPIDAPI_HEADERS = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }
