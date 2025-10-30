from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from werkzeug.utils import secure_filename
import os
import requests

# Local Imports
from config import Config
from models import db_manager
from utils import (
    hash_password,
    verify_password,
    extract_skills_from_pdf,
    rank_jobs
)

# -------------------- Application Factory --------------------
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    upload_folder = app.config.get("UPLOAD_FOLDER", "uploads")
    app.config["UPLOAD_FOLDER"] = os.path.abspath(upload_folder)
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    CORS(app)
    JWTManager(app)

    register_routes(app)
    register_error_handlers(app)

    return app


# -------------------- ROUTES --------------------
def register_routes(app):

    @app.route("/", methods=["GET"])
    def home():
        return jsonify({
            "message": "CareerPilot backend is running ✅",
            "routes": ["/signup", "/login", "/upload_resume", "/search_jobs"]
        }), 200

    # -------------------- Signup --------------------
    @app.route("/signup", methods=["POST"])
    def signup():
        data = request.get_json(force=True, silent=True)
        if not data:
            return jsonify({"error": "Invalid JSON body"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        hashed = hash_password(password)
        status = db_manager.create_user(username, hashed)

        if status == "exists":
            return jsonify({"error": "User already exists"}), 409
        elif status == "error":
            return jsonify({"error": "Database error"}), 500

        return jsonify({"message": "Signup successful ✅"}), 201


    # -------------------- Login --------------------
    @app.route("/login", methods=["POST"])
    def login():
        data = request.get_json(force=True, silent=True)
        if not data:
            return jsonify({"error": "Invalid JSON body"}), 400

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Username and password required"}), 400

        user = db_manager.get_user_by_username(username)
        if not user or not verify_password(password, user["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        access_token = create_access_token(identity=str(user["id"]))
        return jsonify({
            "token": access_token,
            "user": {"id": user["id"], "username": user["username"]}
        }), 200


    # -------------------- Upload Resume --------------------
    @app.route("/upload_resume", methods=["POST"])
    @jwt_required()
    def upload_resume():
        user_id = get_jwt_identity()

        if "resume" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["resume"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400

        if not file.filename.lower().endswith(".pdf"):
            return jsonify({"error": "Only PDF files allowed"}), 415

        filename = secure_filename(f"user_{user_id}_resume.pdf")
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        db_manager.save_resume_path(user_id, filepath)

        skills = extract_skills_from_pdf(filepath)
        return jsonify({
            "message": "Resume uploaded successfully",
            "skills": skills,
            "file_path": filename
        }), 200


    # -------------------- Search Jobs --------------------
    @app.route("/search_jobs", methods=["GET"])
    def search_jobs():
        query = request.args.get("query", "software developer")
        location = request.args.get("location", "India")

        url = Config.RAPIDAPI_URL
        headers = Config.RAPIDAPI_HEADERS
        params = {"query": f"{query} in {location}", "num_pages": "1"}

        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)

            if response.status_code != 200:
                return jsonify({"error": "RapidAPI fetch failed"}), 500

            data = response.json()
            jobs = [
                {
                    "title": job.get("job_title"),
                    "company": job.get("employer_name"),
                    "location": job.get("job_city") or job.get("job_country"),
                    "apply_link": job.get("job_apply_link"),
                    "via": "RapidAPI"
                }
                for job in data.get("data", [])
            ]

            # Optional ranking step (if resume uploaded)
            ranked_jobs = rank_jobs(jobs, query)

            return jsonify({"jobs": ranked_jobs, "count": len(ranked_jobs)}), 200

        except Exception as e:
            print("❌ Error fetching jobs:", e)
            return jsonify({"error": str(e)}), 500


# -------------------- ERROR HANDLERS --------------------
def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify({"error": "Method not allowed"}), 405

    @app.errorhandler(413)
    def too_large(e):
        return jsonify({"error": "File too large (limit 16MB)"}), 413


# -------------------- RUN APP --------------------
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
