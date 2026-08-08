import { Link } from "react-router-dom";
import "./Report.css";

function Report() {
  return (
    <main className="report-page">

      <header className="report-header">
        <div className="report-brand">IntervueX</div>

        <span className="report-status">
          INTERVIEW COMPLETE
        </span>
      </header>

      <section className="report-container">

        <div className="report-intro">
          <p className="section-eyebrow">INTERVIEW REPORT</p>

          <h1>
            Evidence,
            <span>not just scores.</span>
          </h1>

          <p>
            Your interview was evaluated across demonstrated skills,
            reasoning quality, communication, and technical depth.
          </p>
        </div>

        {/* SCORE */}

        <section className="score-card">

          <div>
            <span className="score-label">OVERALL SCORE</span>

            <div className="score-number">
              78<span>/100</span>
            </div>

            <p className="score-summary">
              Strong candidate with good ownership and communication.
              Technical depth needs further validation.
            </p>
          </div>

          <div className="recommendation">
            <span>AGENT RECOMMENDATION</span>

            <strong>Proceed to technical round</strong>

            <p>
              The candidate demonstrated strong problem solving,
              but the agent identified insufficient evidence around
              system design depth.
            </p>
          </div>

        </section>

        {/* SKILLS */}

        <section className="report-section">

          <div className="report-section-title">
            <span>01</span>

            <div>
              <p>SKILL EVALUATION</p>
              <h2>What the agent observed</h2>
            </div>
          </div>

          <div className="report-skills">

            <Skill
              name="Communication"
              score="86"
              width="86%"
              description="Clear explanations with strong structure."
            />

            <Skill
              name="Problem Solving"
              score="82"
              width="82%"
              description="Demonstrated practical reasoning and ownership."
            />

            <Skill
              name="Technical Depth"
              score="61"
              width="61%"
              description="Some technical evidence was missing."
            />

            <Skill
              name="System Design"
              score="67"
              width="67%"
              description="Good high-level thinking; deeper validation recommended."
            />

          </div>

        </section>

        {/* EVIDENCE */}

        <section className="report-section">

  <div className="report-section-title">
    <span>02</span>

    <div>
      <p>EVIDENCE</p>
      <h2>Why the agent reached this conclusion</h2>
    </div>
  </div>

  <div className="evidence-category">

    <div className="evidence-category-header">
      <span>STRENGTHS</span>
      <small>2 signals detected</small>
    </div>

    <div className="evidence-grid">

      <article className="evidence-card positive">
        <span>✓ STRENGTH</span>

        <h3>Strong ownership</h3>

        <p>
          Candidate clearly explained their role in solving
          a production issue and described the decisions they made.
        </p>
      </article>

      <article className="evidence-card positive">
        <span>✓ STRENGTH</span>

        <h3>Clear communication</h3>

        <p>
          Responses were structured and easy to follow,
          with useful context before technical details.
        </p>
      </article>

    </div>

  </div>

  <div className="evidence-category gaps">

    <div className="evidence-category-header">
      <span>GAPS IDENTIFIED</span>
      <small>1 area needs deeper validation</small>
    </div>

    <div className="evidence-grid">

      <article className="evidence-card concern">

        <span>○ GAP IDENTIFIED</span>

        <h3>Technical depth</h3>

        <p>
          The agent could not find enough evidence around
          scalability and trade-off decisions.
        </p>

      </article>

    </div>

  </div>

</section>

        {/* AGENT JOURNEY */}

        <section className="report-section">

          <div className="report-section-title">
            <span>03</span>

            <div>
              <p>AGENT JOURNEY</p>
              <h2>How the interview adapted</h2>
            </div>
          </div>

          <div className="journey">

            <Journey
              number="01"
              title="Started broad"
              text="Asked about the candidate's project ownership."
            />

            <Journey
              number="02"
              title="Detected evidence"
              text="Identified strong ownership and decision making."
            />

            <Journey
              number="03"
              title="Found a gap"
              text="Technical depth was not sufficiently demonstrated."
            />

            <Journey
              number="04"
              title="Probed deeper"
              text="Follow-up questions targeted the missing technical evidence."
            />

          </div>

        </section>

        {/* FINAL */}

        <section className="report-final">

          <p className="section-eyebrow">NEXT STEP</p>

          <h2>
            Ready to explore
            <span>your projects?</span>
          </h2>

          <Link
            to="/project-analysis"
            className="report-button"
          >
            Analyze My Project →
          </Link>

        </section>

      </section>

    </main>
  );
}

function Skill({ name, score, width, description }) {
  return (
    <div className="skill-card">

      <div className="skill-top">
        <strong>{name}</strong>
        <span>{score}</span>
      </div>

      <div className="report-bar">
        <div
          className="report-bar-fill"
          style={{ width }}
        />
      </div>

      <p>{description}</p>

    </div>
  );
}

function Journey({ number, title, text }) {
  return (
    <div className="journey-item">

      <span>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>

    </div>
  );
}

export default Report;