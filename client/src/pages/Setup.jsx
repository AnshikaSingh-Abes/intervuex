import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setup.css";

function Setup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [mode, setMode] = useState("Mixed");
  const [resume, setResume] = useState(null);

  const handleStart = () => {
    navigate("/interview");
  };

  return (
    <main className="setup-page">
      <section className="setup-container">

        <div className="setup-header">
          <p className="section-eyebrow">INTERVIEW SETUP</p>

          <h1>
            Tell your interviewer
            <span>who you are.</span>
          </h1>

          <p>
            Give IntervueX enough context to create a personalized,
            role-specific interview.
          </p>
        </div>

        {/* Resume */}

        <div className="setup-card">
          <div className="card-label">
            <span>01</span>
            YOUR RESUME
          </div>

          <label className="resume-upload">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
            />

            <div className="upload-icon">↑</div>

            <strong>
              {resume ? resume.name : "Drop your resume here"}
            </strong>

            <span>
              PDF or DOCX · Your resume becomes interview context
            </span>
          </label>
        </div>

        {/* Role */}

        <div className="setup-card">
          <div className="card-label">
            <span>02</span>
            TARGET ROLE
          </div>

          <input
            className="setup-input"
            type="text"
            placeholder="e.g. Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {/* Job Description */}

        <div className="setup-card">
          <div className="card-label">
            <span>03</span>
            JOB DESCRIPTION
          </div>

          <textarea
            className="setup-textarea"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Mode */}

        <div className="setup-card">
          <div className="card-label">
            <span>04</span>
            INTERVIEW MODE
          </div>

          <div className="mode-options">
            {["Technical", "Behavioral", "Mixed"].map((item) => (
              <button
                key={item}
                className={`mode-button ${
                  mode === item ? "active" : ""
                }`}
                onClick={() => setMode(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="setup-footer">
          <div>
            <span className="ready-dot"></span>
            Your interviewer is ready
          </div>

          <button
            className="start-button"
            onClick={handleStart}
          >
            Start Interview →
          </button>
        </div>

      </section>
    </main>
  );
}

export default Setup;