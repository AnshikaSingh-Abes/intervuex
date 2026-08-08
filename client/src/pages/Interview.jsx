import { useState } from "react";
import "./Interview.css";

function Interview() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;

    setSubmitted(true);
    setAnswer("");
  };

  return (
    <main className="interview-page">

      {/* TOP BAR */}

      <header className="interview-topbar">

        <div className="interview-brand">
          IntervueX
        </div>

        <div className="interview-progress">
          <span>INTERVIEW</span>
          <strong>04</strong>
          <span>/ 10</span>
        </div>

      </header>

      {/* MAIN INTERVIEW */}

      <section className="interview-layout">

        {/* LEFT */}

        <div className="interviewer-panel">

          <div className="agent-label">
            <span className="agent-status"></span>
            AI INTERVIEWER · LIVE
          </div>

          <div className="question-container">

            <span className="question-number">
              QUESTION 04
            </span>

            <h1>
              Tell me about a project where
              something went wrong and how
              you fixed it.
            </h1>

            <p>
              Take your time. I'm interested in your
              reasoning, not just the final result.
            </p>

          </div>

          <div className="listening-state">

            <div className="pulse"></div>

            <div>
              <strong>
                {submitted ? "Processing answer..." : "Listening"}
              </strong>

              <span>
                {submitted
                  ? "The agent is evaluating your response."
                  : "Speak naturally. Your answer is being analyzed."}
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <aside className="evidence-panel">

          <div className="panel-title">
            <div>
              <span>LIVE ANALYSIS</span>
              <h3>Evidence Map</h3>
            </div>

            <span className="analysis-dot"></span>
          </div>

          {/* SKILLS */}

          <div className="skill-section">

            <div className="skill-row">
              <span>Communication</span>

              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: "82%" }}
                />
              </div>

              <small>82</small>
            </div>

            <div className="skill-row">
              <span>Problem Solving</span>

              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: "68%" }}
                />
              </div>

              <small>68</small>
            </div>

            <div className="skill-row">
              <span>Technical Depth</span>

              <div className="skill-bar">
                <div
                  className="skill-fill"
                  style={{ width: "54%" }}
                />
              </div>

              <small>54</small>
            </div>

          </div>

          {/* EVIDENCE */}

          <div className="evidence-list">

            <div className="evidence-heading">
              Detected Evidence
            </div>

            <div className="evidence-row">
              <span className="check">✓</span>
              Ownership
            </div>

            <div className="evidence-row">
              <span className="check">✓</span>
              Decision making
            </div>

            <div className="evidence-row muted">
              <span>○</span>
              Technical depth
            </div>

          </div>

          {/* AGENT DECISION */}

          <div className="agent-decision">

            <span>AGENT DECISION</span>

            <strong>
              → Explore technical depth
            </strong>

            <p>
              Your last answer showed strong
              ownership but limited technical detail.
            </p>

          </div>

        </aside>

      </section>

      {/* ANSWER BAR */}

      <section className="answer-section">

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />

        <div className="answer-controls">

          <span>
            {answer.length} characters
          </span>

          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
          >
            Submit Answer →
          </button>

        </div>

      </section>

    </main>
  );
}

export default Interview;