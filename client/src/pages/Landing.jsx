import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <main className="landing">
      {/* HERO */}

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="status-dot"></span>
            AI-POWERED INTERVIEW AGENT
          </div>

          <h1>
            Meet your interviewer,
            <span>not a question generator.</span>
          </h1>

          <p className="hero-description">
            An autonomous AI interviewer that listens to your answers,
            identifies missing evidence, and adapts the next question in real
            time.
          </p>

          <div className="hero-actions">
            <Link to="/setup" className="primary-cta">
              Start Interview →
            </Link>

            <a href="#how-it-works" className="secondary-cta">
              See how it works
            </a>
          </div>
        </div>

        {/* INTERVIEW PREVIEW */}

        <div className="interview-preview">
          <div className="preview-header">
            <div>
              <p className="preview-label">LIVE INTERVIEW</p>
              <h3>Software Engineer</h3>
            </div>

            <span className="live-indicator">● LIVE</span>
          </div>

          <div className="question-box">
            <span className="question-label">AI INTERVIEWER</span>

            <p>
              "You mentioned building a recommendation system. How did you
              evaluate whether your approach was actually working?"
            </p>
          </div>

          <div className="evidence-section">
            <div className="section-heading">
              <span>Evidence detected</span>
              <span>2/3</span>
            </div>

            <div className="evidence-item">
              <span>✓</span>
              Project ownership
            </div>

            <div className="evidence-item">
              <span>✓</span>
              Model selection
            </div>

            <div className="evidence-item missing">
              <span>○</span>
              Evaluation methodology
            </div>
          </div>

          <div className="agent-action">
            <span>AGENT DECISION</span>
            <strong>→ Going deeper on evaluation</strong>
          </div>
        </div>
      </section>

      {/* VALUE STATEMENT */}

      <section className="value-section">
        <p className="section-eyebrow">THE DIFFERENCE</p>

        <h2>
          It doesn't follow questions.
          <span>It follows evidence.</span>
        </h2>

        <p>
          Every answer changes what the interviewer asks next. The agent
          continuously builds an evidence map of your skills instead of
          blindly following a predefined script.
        </p>
      </section>

      {/* FEATURES */}

      <section className="features-section">
        <Feature
          number="01"
          title="Adaptive Interview"
          description="Questions evolve based on your previous answers, confidence, and demonstrated knowledge."
        />

        <Feature
          number="02"
          title="Evidence Driven"
          description="The agent tracks what you have actually demonstrated and identifies gaps worth exploring."
        />

        <Feature
          number="03"
          title="Project Aware"
          description="Your projects become interview material instead of generic resume keywords."
        />
      </section>

      {/* HOW IT WORKS */}

      <section className="how-section" id="how-it-works">
        <div>
          <p className="section-eyebrow">HOW IT WORKS</p>

          <h2>
            From resume
            <br />
            to real interview.
          </h2>
        </div>

        <div className="steps">
          <Step number="01" title="Understand" text="Analyze your resume, role, and projects." />

          <Step number="02" title="Interview" text="Ask an adaptive first question." />

          <Step number="03" title="Probe" text="Follow evidence and uncover gaps." />

          <Step number="04" title="Evaluate" text="Generate an evidence-backed assessment." />
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="final-cta">
        <p className="section-eyebrow">READY?</p>

        <h2>Meet your interviewer.</h2>

        <Link to="/setup" className="primary-cta">
          Start Interview →
        </Link>
      </section>
    </main>
  );
}

function Feature({ number, title, description }) {
  return (
    <article className="feature-card">
      <span>{number}</span>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="step">
      <span>{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Landing;