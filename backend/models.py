import mysql.connector
from mysql.connector import Error
from config import Config


class DBManager:
    """Handles all database operations for users, resumes, and jobs."""

    def __init__(self):
        self.db_config = Config.DB_CONFIG

    # ---------------- Connection ----------------
    def get_connection(self):
        """Establish a database connection."""
        try:
            conn = mysql.connector.connect(**self.db_config)
            return conn
        except Error as e:
            print(f"[DB] ❌ Connection error: {e}")
            return None

    def execute_query(self, query, params=None, fetch_one=False, dictionary=False):
        """
        Execute SELECT/INSERT/UPDATE queries safely.
        Returns result or success flag.
        """
        conn = self.get_connection()
        if not conn:
            print("[DB] ⚠️ Connection failed.")
            return False

        cursor = conn.cursor(dictionary=dictionary)
        try:
            cursor.execute(query, params or ())
            if query.strip().upper().startswith("SELECT"):
                result = cursor.fetchone() if fetch_one else cursor.fetchall()
                return result
            else:
                conn.commit()
                return True
        except Error as e:
            print(f"[DB] ❌ Query error: {e}\nQuery: {query}\nParams: {params}")
            return False
        finally:
            cursor.close()
            conn.close()

    # ---------------- User/Auth Methods ----------------
    def create_user(self, username, hashed_password):
        """Register a new user if username not already taken."""
        if not username or not hashed_password:
            print("[DB] ⚠️ Invalid user data.")
            return "error"

        existing = self.get_user_by_username(username)
        if existing:
            return "exists"

        query = "INSERT INTO users (username, password) VALUES (%s, %s)"
        success = self.execute_query(query, (username, hashed_password))
        return "success" if success else "error"

    def get_user_by_username(self, username):
        """Fetch user record by username."""
        query = "SELECT id, username, password FROM users WHERE username = %s"
        return self.execute_query(query, (username,), fetch_one=True, dictionary=True)

    def validate_user_credentials(self, username, hashed_password):
        """Verify user login credentials."""
        query = "SELECT id, username FROM users WHERE username=%s AND password=%s"
        return self.execute_query(query, (username, hashed_password), fetch_one=True, dictionary=True)

    # ---------------- Resume Methods ----------------
    def save_resume_path(self, user_id, filepath):
        """Store or update user's resume path."""
        query = """
            INSERT INTO resumes (user_id, file_path)
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE file_path = VALUES(file_path)
        """
        return self.execute_query(query, (user_id, filepath))

    def get_user_resume_path(self, user_id):
        """Fetch user's saved resume path."""
        query = "SELECT file_path FROM resumes WHERE user_id=%s"
        result = self.execute_query(query, (user_id,), fetch_one=True, dictionary=True)
        return result["file_path"] if result else None

    # ---------------- Job Methods ----------------
    def search_local_jobs(self, keyword=None, filters=None):
        """
        Search locally stored jobs (used for fallback if API fails).
        Supports keyword + filters (remote/full-time/salary).
        """
        sql_query = """
            SELECT id, title,
                   COALESCE(company, 'Confidential') AS company,
                   COALESCE(location, 'Remote') AS location,
                   COALESCE(salary, 'Not specified') AS salary,
                   COALESCE(description, 'No description available') AS description,
                   COALESCE(url, '#') AS url
            FROM jobs
            WHERE title LIKE %s OR description LIKE %s
        """

        search_term = f"%{keyword or ''}%"
        params = [search_term, search_term]

        if filters:
            if filters.get("remote"):
                sql_query += " AND location LIKE '%Remote%'"
            if filters.get("full_time"):
                sql_query += " AND employment_type='Full-time'"
            if filters.get("min_salary"):
                sql_query += " AND salary >= %s"
                params.append(filters["min_salary"])

        return self.execute_query(sql_query, tuple(params), dictionary=True)


# Singleton instance
db_manager = DBManager()
