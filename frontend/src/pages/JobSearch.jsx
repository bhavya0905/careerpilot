import React, { useState } from "react";
import { Briefcase, MapPin, Search, Filter } from "lucide-react";

const jobSearchStyles = `
/* Modern and Professional Job Search UI/UX Styles (PREMIUM DARK THEME)
  Color Palette: 
  - Primary Accent Blue: #4299e1 (Vibrant Light Blue)
  - Dark Background: #1a202c (Deep Charcoal)
  - Card/Container Background: #2d3748 (Sleek Dark Gray)
  - Text Light: #e2e8f0 (Off-white)
  - Success Green: #38a169 (Vibrant Emerald Green)
*/

:root {
    --primary-accent-color: #4299e1; 
    --background-dark: #1a202c; 
    --card-background: #2d3748; 
    --text-light: #e2e8f0; 
    --text-muted-dark: #a0aec0;
    --border-dark: #4a5568; 
    
    /* Enhanced Shadow/Glow for Dark Theme */
    --card-shadow-dark: 0 4px 16px rgba(0, 0, 0, 0.5), 0 0 5px rgba(66, 153, 225, 0.05);
    --hover-shadow-dark: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(66, 153, 225, 0.2); 

    /* Apply Button */
    --success-gradient-dark: linear-gradient(135deg, #38a169, #2f855a); 
    --success-gradient-hover-dark: linear-gradient(135deg, #48bb78, #38a169);
    --success-shadow: 0 4px 15px rgba(56, 161, 105, 0.4);
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-dark); 
    color: var(--text-light); 
}

.job-search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 1rem;
    min-height: 100vh;
}

/* --- Header --- */
.main-header {
    font-size: 2.5rem;
    font-weight: 900; /* Bolder font weight */
    color: var(--text-light); 
    margin-bottom: 2.5rem;
    text-align: center;
    letter-spacing: -0.5px; /* Tighter tracking */
}

.main-header span {
    color: var(--primary-accent-color); 
}

/* --- Search & Filters Containers (Premium Card Style) --- */
.search-container, .filters-bar {
    width: 100%;
    max-width: 900px;
    background-color: var(--card-background); 
    border: 1px solid var(--border-dark); 
    border-radius: 0.75rem; /* Slightly reduced radius for modern look */
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--card-shadow-dark);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Smoother transition curve */
}

.search-container:hover {
    box-shadow: var(--hover-shadow-dark);
}

.search-bar-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.search-input-wrapper {
    position: relative;
    flex: 1 1 300px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted-dark); 
    width: 1.25rem;
    height: 1.25rem;
}

.search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem; 
    border: 1px solid var(--border-dark); 
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: #242b38; 
    color: var(--text-light); 
    transition: border-color 0.2s, box-shadow 0.2s;
}

/* Enhanced Focus Effect (Subtle Glow) */
.search-input:focus {
    border-color: var(--primary-accent-color);
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-accent-color), 0 0 8px rgba(66, 153, 225, 0.7); 
}

.search-button {
    background-color: var(--primary-accent-color);
    color: var(--background-dark); 
    font-weight: 700;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease-out;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(66, 153, 225, 0.4);
}

.search-button:hover {
    background-color: #3182ce; 
    transform: translateY(-2px); /* Stronger lift */
    box-shadow: 0 6px 15px rgba(66, 153, 225, 0.6);
}

/* --- Filters Section --- */
.filters-bar {
    padding: 1.25rem 1.5rem; /* Increased vertical padding for better spacing */
    margin-bottom: 2.5rem; /* More space before results */
}

.filter-heading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-accent-color); 
    font-weight: 600;
}

.filter-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem; /* Slightly larger text */
    color: var(--text-light); 
}

.filter-checkbox {
    appearance: none;
    width: 1.1rem;
    height: 1.1rem;
    border: 2px solid var(--primary-accent-color);
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    top: 1px;
}

.filter-checkbox:checked {
    background-color: var(--primary-accent-color);
    border-color: var(--primary-accent-color);
    box-shadow: 0 0 5px var(--primary-accent-color); /* Subtle check glow */
}

.filter-select, .filter-salary-input {
    padding: 0.6rem 1rem;
    border: 1px solid var(--border-dark); 
    border-radius: 0.5rem;
    font-size: 0.9rem;
    background-color: #242b38; 
    color: var(--text-light); 
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
}

/* Enhanced Focus Effect (Subtle Glow) */
.filter-select:focus, .filter-salary-input:focus {
    border-color: var(--primary-accent-color);
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-accent-color), 0 0 8px rgba(66, 153, 225, 0.7);
}

/* --- Job Results Grid --- */
.job-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
}

/* --- Job Card (Soft Hover Lift) --- */
.job-card {
    background-color: var(--card-background); 
    border-radius: 0.75rem; 
    padding: 1.5rem;
    box-shadow: var(--card-shadow-dark);
    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border-left: 4px solid var(--primary-accent-color); /* Thinner accent border */
}

.job-card:hover {
    transform: translateY(-6px); /* Stronger lift effect */
    box-shadow: var(--hover-shadow-dark); 
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.job-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-light); 
    line-height: 1.3;
}

.job-icon {
    color: var(--primary-accent-color); 
    flex-shrink: 0;
    margin-left: 1rem;
}

.job-company {
    color: var(--text-light); 
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.job-location {
    color: var(--text-muted-dark); 
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
}

.job-footer {
    padding-top: 1rem;
    border-top: 1px solid #4a5568; 
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* --- Apply Button (Dynamic Gradient/Hover) --- */
.apply-button {
    background: var(--success-gradient-dark); 
    color: var(--text-light); 
    padding: 0.6rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: var(--success-shadow);
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.3); /* Subtle text depth */
}

.apply-button:hover {
    background: var(--success-gradient-hover-dark);
    box-shadow: 0 8px 20px rgba(56, 161, 105, 0.6); /* Stronger shadow glow */
    transform: translateY(-3px) scale(1.01); /* More pronounced lift and slight scale */
}

/* --- Loading State --- */
.loading-spinner {
    display: block;
    width: 50px;
    height: 50px;
    border: 5px solid var(--border-dark); 
    border-top-color: var(--primary-accent-color); 
    border-radius: 50%;
    animation: spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite; /* Custom timing for better spin */
    margin-bottom: 1rem;
    box-shadow: 0 0 10px rgba(66, 153, 225, 0.4);
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* --- No Results State --- */
.no-jobs-message {
    text-align: center;
    margin-top: 5rem;
    padding: 2rem;
    background-color: #242b38; /* Slightly darker than card for contrast */
    border-radius: 1rem;
    box-shadow: var(--card-shadow-dark);
    max-width: 500px;
    border: 1px solid var(--border-dark);
}

.no-jobs-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-accent-color); /* Use accent color for title */
    margin-bottom: 0.5rem;
}

.no-jobs-text {
    color: var(--text-muted-dark); 
    font-size: 1rem;
}

/* --- Responsiveness (Mobile First) --- */
@media (max-width: 768px) {
    .main-header {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }

    .job-search-container {
        padding: 1rem;
    }

    .search-bar-group {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .search-input-wrapper {
        flex: 1 1 100%;
    }

    .search-button {
        width: 100%;
    }

    .filters-bar {
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        gap: 1rem;
    }

    .filter-select, .filter-salary-input {
        width: 100%;
    }
    
    .job-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .job-card {
        padding: 1rem;
    }
}
`;

const JobSearch = () => {
  const [query, setQuery] = useState("React Developer");
  const [location, setLocation] = useState("India");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    remote: false,
    jobType: "all",
    minSalary: ""
  });

  const fetchJobs = async () => {
    setLoading(true);
    setJobs([]);

    try {
      let url = `http://127.0.0.1:5000/search_jobs?query=${encodeURIComponent(
        query
      )}&location=${encodeURIComponent(location)}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.jobs) {
        let filteredJobs = data.jobs;

        if (filters.remote) {
          filteredJobs = filteredJobs.filter(
            (job) =>
              job.title.toLowerCase().includes("remote") ||
              job.location.toLowerCase().includes("remote")
          );
        }

        if (filters.jobType !== "all") {
          filteredJobs = filteredJobs.filter((job) =>
            job.title.toLowerCase().includes(filters.jobType)
          );
        }
        
        setJobs(filteredJobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{jobSearchStyles}</style>

      <div className="job-search-container">
        <h1 className="main-header">
          Career<span>Pilot</span> Job Search 🚀
        </h1>

        <div className="search-container">
          <div className="search-bar-group">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search for a job title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="search-input-wrapper">
              <MapPin className="search-icon" />
              <input
                type="text"
                placeholder="Location (e.g. Delhi, Remote)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-input"
              />
            </div>
            <button
              onClick={fetchJobs}
              className="search-button"
            >
              Search Jobs
            </button>
          </div>
        </div>

        <div className="filters-bar">
          <div className="filter-heading">
            <Filter style={{ width: '1.25rem', height: '1.25rem' }} /> Filters
          </div>
          
          <label className="filter-label">
            <input
              type="checkbox"
              checked={filters.remote}
              onChange={(e) => {
                setFilters({ ...filters, remote: e.target.checked });
                // Trigger fetchJobs immediately after state update for Remote filter
                fetchJobs();
              }}
              className="filter-checkbox"
            />
            Remote only
          </label>

          <select
            value={filters.jobType}
            onChange={(e) => {
                setFilters({ ...filters, jobType: e.target.value });
                // Trigger fetchJobs immediately after state update for Job Type filter
                fetchJobs();
            }}
            className="filter-select"
          >
            <option value="all">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="intern">Internship</option>
          </select>

          <input
            type="number"
            placeholder="Min Salary (₹)"
            value={filters.minSalary}
            onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
            className="filter-salary-input"
          />
          
          <button
              onClick={fetchJobs}
              className="search-button"
              style={{ padding: '0.6rem 1.5rem', marginLeft: 'auto' }}
            >
              Apply Filters
          </button>
        </div>

        {loading && (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching amazing careers...</p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="job-grid">
            {jobs.map((job, index) => (
              <div key={index} className="job-card">
                <div>
                  <div className="job-header">
                    <h2 className="job-title">
                      {job.title}
                    </h2>
                    <Briefcase className="job-icon" />
                  </div>
                  <p className="job-company">{job.company}</p>
                  <p className="job-location">{job.location}</p>
                </div>

                <div className="job-footer">
                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apply-button"
                  >
                    Apply Now
                  </a>
                  <span className="job-source">{job.via}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="no-jobs-message">
            <p className="no-jobs-title">
              😕 No matching jobs found
            </p>
            <p className="no-jobs-text">
              Try adjusting your search query, location, or filtering options.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobSearch;
