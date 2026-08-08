import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./Report.css";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  useEffect(() => {
    // First preference: data passed through navigation
    if (location.state?.results?.length) {
      setResults(location.state.results);
      return;
    }

    // Otherwise load from sessionStorage
    const savedResults = sessionStorage.getItem("interviewResults");

    if (savedResults) {
      try {
        const parsed = JSON.parse(savedResults);
        setResults(parsed);
      } catch (error) {
        console.error("Could not read interview results:", error);
      }
    }
  }, [location.state]);

  // --------------------------------------------------
  // CALCULATE OVERALL SCORES
  // --------------------------------------------------

  const overall = useMemo(() => {
    if (!results.length) {
      return {
        score: 0,
        communication: 0,
        problemSolving: 0,
        technicalDepth: 0,
      };
    }

    let communicationTotal = 0;
    let problemSolvingTotal = 0;
    let technicalDepthTotal = 0;
    let scoreTotal = 0;

    results.forEach((item) => {
      const evaluation = item.evaluation || {};

      communicationTotal += Number(evaluation.communication || 0);
      problemSolvingTotal += Number(evaluation.problemSolving || 0);
      technicalDepthTotal += Number(evaluation.technicalDepth || 0);

      scoreTotal += Number(evaluation.score || 0);
    });

    return {
      score: Math.round(scoreTotal / results.length),
      communication: Math.round(
        communicationTotal / results.length
      ),
      problemSolving: Math.round(
        problemSolvingTotal / results.length
      ),
      technicalDepth: Math.round(
        technicalDepthTotal / results.length
      ),
    };
  }, [results]);

  // --------------------------------------------------
  // COLLECT ALL STRENGTHS / WEAKNESSES
  // --------------------------------------------------

  const strengths = useMemo(() => {
    const items = [];

    results.forEach((result) => {
      const list = result.evaluation?.strengths || [];

      list.forEach((item) => {
        if (item && !items.includes(item)) {
          items.push(item);
        }
      });
    });

    return items.slice(0, 6);
  }, [results]);

  const weaknesses = useMemo(() => {
    const items = [];

    results.forEach((result) => {
      const list = result.evaluation?.weaknesses || [];

      list.forEach((item) => {
        if (item && !items.includes(item)) {
          items.push(item);
        }
      });
    });

    return items.slice(0, 6);
  }, [results]);

  const missingEvidence = useMemo(() => {
    const items = [];

    results.forEach((result) => {
      const list = result.evaluation?.missingEvidence || [];

      list.forEach((item) => {
        if (item && !items.includes(item)) {
          items.push(item);
        }
      });
    });

    return items.slice(0, 8);
  }, [results]);

  // --------------------------------------------------
  // RECOMMENDATION
  // --------------------------------------------------

  const recommendation = useMemo(() => {
    if (overall.score >= 80) {
      return {
        title: "Strong interview performance",
        text:
          "The candidate demonstrated strong communication, reasoning, and technical understanding across the interview.",
      };
    }

    if (overall.score >= 60) {
      return {
        title: "Proceed with deeper validation",
        text:
          "The candidate showed promising skills, but some areas need deeper technical evidence and stronger examples.",
      };
    }

    return {
      title: "Further preparation recommended",
      text:
        "The interview showed several areas where stronger examples, clearer reasoning, and deeper technical evidence would improve the performance.",
    };
  }, [overall.score]);

  // --------------------------------------------------
  // NO RESULTS
  // --------------------------------------------------

  if (!results.length) {
    return (
      <main className="report-page">

        <header className="report-header">
          <div className="report-brand">IntervueX</div>

          <span className="report-status">
            INTERVIEW REPORT
          </span>
        </header>

        <section className="report-container">

          <div className="report-intro">
            <p className="section-eyebrow">
              INTERVIEW REPORT
            </p>

            <h1>
              No interview
              <span>data found.</span>
            </h1>

            <p>
              Complete an interview first so IntervueX can
              generate your detailed performance analysis.
            </p>

            <Link
              to="/interview"
              className="report-button"
            >
              Start Interview →
            </Link>
          </div>

        </section>
      </main>
    );
  }

  return (
    <main className="report-page">

      {/* HEADER */}

      <header className="report-header">

        <div className="report-brand">
          IntervueX
        </div>

        <span className="report-status">
          INTERVIEW COMPLETE
        </span>

      </header>


      {/* MAIN */}

      <section className="report-container">

        {/* INTRO */}

        <div className="report-intro">

          <p className="section-eyebrow">
            INTERVIEW REPORT
          </p>

          <h1>
            Evidence,
            <span>not just scores.</span>
          </h1>

          <p>
            Your interview was evaluated across demonstrated
            skills, reasoning quality, communication, and
            technical depth.
          </p>

        </div>


        {/* OVERALL SCORE */}

        <section className="score-card">

          <div>

            <span className="score-label">
              OVERALL SCORE
            </span>

            <div className="score-number">
              {overall.score}
              <span>/100</span>
            </div>

            <p className="score-summary">
              Based on {results.length} interview response
              {results.length !== 1 ? "s" : ""}, IntervueX
              evaluated your communication, problem solving,
              and technical depth.
            </p>

          </div>


          <div className="recommendation">

            <span>
              AGENT RECOMMENDATION
            </span>

            <strong>
              {recommendation.title}
            </strong>

            <p>
              {recommendation.text}
            </p>

          </div>

        </section>


        {/* SKILLS */}

        <section className="report-section">

          <div className="report-section-title">

            <span>01</span>

            <div>
              <p>SKILL EVALUATION</p>

              <h2>
                What the agent observed
              </h2>
            </div>

          </div>


          <div className="report-skills">

            <Skill
              name="Communication"
              score={overall.communication}
              width={`${overall.communication}%`}
              description={
                overall.communication >= 75
                  ? "Clear and structured communication was demonstrated."
                  : "Try to structure answers more clearly and provide stronger context."
              }
            />

            <Skill
              name="Problem Solving"
              score={overall.problemSolving}
              width={`${overall.problemSolving}%`}
              description={
                overall.problemSolving >= 75
                  ? "Good reasoning and practical problem-solving evidence."
                  : "Explain your reasoning, debugging process, and decisions in more detail."
              }
            />

            <Skill
              name="Technical Depth"
              score={overall.technicalDepth}
              width={`${overall.technicalDepth}%`}
              description={
                overall.technicalDepth >= 75
                  ? "Strong technical evidence was present in the responses."
                  : "Add implementation details, technical decisions, trade-offs, and measurable outcomes."
              }
            />

            <Skill
              name="Interview Consistency"
              score={overall.score}
              width={`${overall.score}%`}
              description={
                overall.score >= 75
                  ? "Performance remained strong across the interview."
                  : "Work on maintaining consistent detail and depth across answers."
              }
            />

          </div>

        </section>


        {/* STRENGTHS */}

        <section className="report-section">

          <div className="report-section-title">

            <span>02</span>

            <div>
              <p>STRENGTHS</p>

              <h2>
                What you did well
              </h2>
            </div>

          </div>


          <div className="evidence-grid">

            {strengths.length > 0 ? (

              strengths.map((strength, index) => (

                <article
                  className="evidence-card positive"
                  key={index}
                >

                  <span>
                    ✓ STRENGTH
                  </span>

                  <h3>
                    Strong evidence
                  </h3>

                  <p>
                    {strength}
                  </p>

                </article>

              ))

            ) : (

              <article className="evidence-card">

                <span>
                  ○ OBSERVATION
                </span>

                <h3>
                  More evidence needed
                </h3>

                <p>
                  The interview did not provide enough
                  evidence to identify a strong recurring
                  pattern.
                </p>

              </article>

            )}

          </div>

        </section>


        {/* IMPROVEMENTS */}

        <section className="report-section">

          <div className="report-section-title">

            <span>03</span>

            <div>
              <p>IMPROVEMENT AREAS</p>

              <h2>
                Where you can improve
              </h2>
            </div>

          </div>


          <div className="evidence-grid">

            {weaknesses.length > 0 ? (

              weaknesses.map((weakness, index) => (

                <article
                  className="evidence-card concern"
                  key={index}
                >

                  <span>
                    ○ IMPROVEMENT
                  </span>

                  <h3>
                    Area to strengthen
                  </h3>

                  <p>
                    {weakness}
                  </p>

                </article>

              ))

            ) : (

              <article className="evidence-card">

                <span>
                  ✓ PERFORMANCE
                </span>

                <h3>
                  No major weakness detected
                </h3>

                <p>
                  Continue providing detailed examples
                  and measurable outcomes.
                </p>

              </article>

            )}

          </div>

        </section>


        {/* MISSING EVIDENCE */}

        {missingEvidence.length > 0 && (

          <section className="report-section">

            <div className="report-section-title">

              <span>04</span>

              <div>

                <p>
                  MISSING EVIDENCE
                </p>

                <h2>
                  What your answers could include
                </h2>

              </div>

            </div>


            <div className="evidence-grid">

              {missingEvidence.map(
                (item, index) => (

                  <article
                    className="evidence-card concern"
                    key={index}
                  >

                    <span>
                      + ADD DETAIL
                    </span>

                    <h3>
                      Stronger evidence
                    </h3>

                    <p>
                      {item}
                    </p>

                  </article>

                )
              )}

            </div>

          </section>

        )}


        {/* QUESTION BY QUESTION */}

        <section className="report-section">

          <div className="report-section-title">

            <span>05</span>

            <div>

              <p>
                QUESTION-BY-QUESTION
              </p>

              <h2>
                Your interview performance
              </h2>

            </div>

          </div>


          <div className="journey">

            {results.map((result, index) => {

              const evaluation =
                result.evaluation || {};

              const score =
                Number(evaluation.score || 0);

              const communication =
                Number(
                  evaluation.communication || 0
                );

              const problemSolving =
                Number(
                  evaluation.problemSolving || 0
                );

              const technicalDepth =
                Number(
                  evaluation.technicalDepth || 0
                );

              return (

                <div
                  className="journey-item"
                  key={index}
                >

                  <span>
                    {String(
                      result.questionNumber ||
                      index + 1
                    ).padStart(2, "0")}
                  </span>


                  <div style={{ width: "100%" }}>

                    <h3>
                      {result.question}
                    </h3>

                    <p
                      style={{
                        marginTop: "12px",
                        color: "#a1a1aa",
                      }}
                    >
                      <strong>
                        Your answer:
                      </strong>{" "}
                      {result.answer}
                    </p>


                    {/* SCORE ROW */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(4, 1fr)",
                        gap: "12px",
                        marginTop: "20px",
                      }}
                    >

                      <MiniScore
                        label="Overall"
                        score={score}
                      />

                      <MiniScore
                        label="Communication"
                        score={communication}
                      />

                      <MiniScore
                        label="Problem Solving"
                        score={problemSolving}
                      />

                      <MiniScore
                        label="Technical"
                        score={technicalDepth}
                      />

                    </div>


                    {/* EVIDENCE */}

                    {evaluation.evidence?.length >
                      0 && (

                      <div
                        style={{
                          marginTop: "20px",
                        }}
                      >

                        <small
                          style={{
                            color: "#52525b",
                            letterSpacing: "1px",
                            fontSize: "9px",
                          }}
                        >
                          DETECTED EVIDENCE
                        </small>

                        {evaluation.evidence.map(
                          (item, evidenceIndex) => (

                            <p
                              key={evidenceIndex}
                              style={{
                                marginTop: "7px",
                                color: "#a1a1aa",
                                fontSize: "12px",
                              }}
                            >
                              ✓ {item}
                            </p>

                          )
                        )}

                      </div>

                    )}


                    {/* IMPROVEMENT */}

                    {evaluation.weaknesses?.length >
                      0 && (

                      <div
                        style={{
                          marginTop: "18px",
                        }}
                      >

                        <small
                          style={{
                            color: "#52525b",
                            letterSpacing: "1px",
                            fontSize: "9px",
                          }}
                        >
                          IMPROVEMENT
                        </small>

                        <p
                          style={{
                            marginTop: "7px",
                            color: "#71717a",
                            fontSize: "12px",
                            lineHeight: "1.6",
                          }}
                        >
                          {evaluation.weaknesses[0]}
                        </p>

                      </div>

                    )}

                  </div>

                </div>

              );
            })}

          </div>

        </section>


        {/* AGENT JOURNEY */}

        <section className="report-section">

          <div className="report-section-title">

            <span>06</span>

            <div>

              <p>
                AGENT JOURNEY
              </p>

              <h2>
                How the interview adapted
              </h2>

            </div>

          </div>


          <div className="journey">

            <Journey
              number="01"
              title="Started broad"
              text="The interview began by exploring your experience and project background."
            />

            <Journey
              number="02"
              title="Detected evidence"
              text="The agent evaluated the evidence present in each response."
            />

            <Journey
              number="03"
              title="Identified gaps"
              text="Weak or incomplete areas were identified for deeper evaluation."
            />

            <Journey
              number="04"
              title="Adapted questioning"
              text="Follow-up questions were used to explore missing evidence and technical depth."
            />

          </div>

        </section>


        {/* FINAL */}

        <section className="report-final">

          <p className="section-eyebrow">
            NEXT STEP
          </p>

          <h2>
            Ready to explore
            <span>
              your projects?
            </span>
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


// --------------------------------------------------
// SKILL COMPONENT
// --------------------------------------------------

function Skill({
  name,
  score,
  width,
  description,
}) {
  return (

    <div className="skill-card">

      <div className="skill-top">

        <strong>
          {name}
        </strong>

        <span>
          {score}
        </span>

      </div>


      <div className="report-bar">

        <div
          className="report-bar-fill"
          style={{
            width,
          }}
        />

      </div>


      <p>
        {description}
      </p>

    </div>
  );
}


// --------------------------------------------------
// MINI SCORE
// --------------------------------------------------

function MiniScore({
  label,
  score,
}) {
  return (

    <div
      style={{
        border: "1px solid #27272a",
        padding: "10px",
        borderRadius: "8px",
        background: "#09090b",
      }}
    >

      <div
        style={{
          color: "#52525b",
          fontSize: "9px",
          letterSpacing: "1px",
        }}
      >
        {label}
      </div>

      <strong
        style={{
          display: "block",
          marginTop: "5px",
          fontSize: "18px",
        }}
      >
        {score}
      </strong>

    </div>

  );
}


// --------------------------------------------------
// JOURNEY COMPONENT
// --------------------------------------------------

function Journey({
  number,
  title,
  text,
}) {
  return (

    <div className="journey-item">

      <span>
        {number}
      </span>

      <div>

        <h3>
          {title}
        </h3>

        <p>
          {text}
        </p>

      </div>

    </div>

  );
}


export default Report;