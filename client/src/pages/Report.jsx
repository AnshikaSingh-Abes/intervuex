import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import "./Report.css";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();

  // --------------------------------------------------
  // GET RESULTS
  // --------------------------------------------------

  const resultsFromState = location.state?.results || [];
  const savedResults = sessionStorage.getItem("interviewResults");

  const results = useMemo(() => {
    if (
      Array.isArray(resultsFromState) &&
      resultsFromState.length > 0
    ) {
      return resultsFromState;
    }

    if (savedResults) {
      try {
        const parsed = JSON.parse(savedResults);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error(
          "Failed to parse interview results:",
          error
        );
        return [];
      }
    }

    return [];
  }, [resultsFromState, savedResults]);

  // --------------------------------------------------
  // HELPERS
  // --------------------------------------------------

  const numberValue = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  };

  const getText = (item) => {
    if (!item) return "";

    if (typeof item === "string") {
      return item;
    }

    return (
      item.statement ||
      item.text ||
      item.description ||
      ""
    );
  };

  const getArray = (value) => {
    return Array.isArray(value) ? value : [];
  };

  // --------------------------------------------------
  // OVERALL SCORE
  // --------------------------------------------------

  const overallScore = useMemo(() => {
    if (!results.length) return 0;

    const scores = results.map((result) =>
      numberValue(result.evaluation?.score)
    );

    const total = scores.reduce(
      (sum, score) => sum + score,
      0
    );

    return Math.round(
      (total / results.length) * 10
    );
  }, [results]);

  // --------------------------------------------------
  // SKILL SCORES
  // --------------------------------------------------

  const communicationScore = useMemo(() => {
    if (!results.length) return 0;

    const scores = results.map((result) =>
      numberValue(result.evaluation?.communication)
    );

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [results]);

  const problemSolvingScore = useMemo(() => {
    if (!results.length) return 0;

    const scores = results.map((result) =>
      numberValue(result.evaluation?.problemSolving)
    );

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [results]);

  const technicalDepthScore = useMemo(() => {
    if (!results.length) return 0;

    const scores = results.map((result) =>
      numberValue(result.evaluation?.technicalDepth)
    );

    return Math.round(
      scores.reduce((sum, score) => sum + score, 0) /
        scores.length
    );
  }, [results]);

  // --------------------------------------------------
  // CONSISTENCY
  // --------------------------------------------------

  const consistencyScore = useMemo(() => {
    if (!results.length) return 0;

    const scores = results.map(
      (result) =>
        numberValue(result.evaluation?.score) * 10
    );

    if (scores.length === 1) {
      return Math.round(scores[0]);
    }

    const average =
      scores.reduce(
        (sum, score) => sum + score,
        0
      ) / scores.length;

    const variance =
      scores.reduce(
        (sum, score) =>
          sum + Math.pow(score - average, 2),
        0
      ) / scores.length;

    const deviation = Math.sqrt(variance);

    return Math.round(
      Math.max(
        0,
        Math.min(100, 100 - deviation)
      )
    );
  }, [results]);

  // --------------------------------------------------
  // STRENGTHS
  // --------------------------------------------------

  const strengths = useMemo(() => {
    const items = [];

    results.forEach((result) => {
      const evaluationStrengths =
        result.evaluation?.strengths || [];

      const observationStrengths =
        result.observation?.strengths || [];

      [
        ...evaluationStrengths,
        ...observationStrengths,
      ].forEach((item) => {
        const text = getText(item);

        if (text && !items.includes(text)) {
          items.push(text);
        }
      });
    });

    return items.slice(0, 8);
  }, [results]);

  // --------------------------------------------------
  // WEAKNESSES
  // --------------------------------------------------

  const weaknesses = useMemo(() => {
    const items = [];

    results.forEach((result) => {
      const evaluationWeaknesses =
        result.evaluation?.weaknesses || [];

      const observationWeaknesses =
        result.observation?.weaknesses || [];

      [
        ...evaluationWeaknesses,
        ...observationWeaknesses,
      ].forEach((item) => {
        const text = getText(item);

        if (text && !items.includes(text)) {
          items.push(text);
        }
      });
    });

    return items.slice(0, 8);
  }, [results]);

  // --------------------------------------------------
  // MISSING EVIDENCE
  // --------------------------------------------------

  const missingEvidence = useMemo(() => {
    const items = [];

    results.forEach((result) => {
      const evaluationMissing =
        result.evaluation?.missingEvidence || [];

      const observationMissing =
        result.observation?.missingEvidence || [];

      [
        ...evaluationMissing,
        ...observationMissing,
      ].forEach((item) => {
        const text = getText(item);

        if (text && !items.includes(text)) {
          items.push(text);
        }
      });
    });

    return items.slice(0, 10);
  }, [results]);

  // --------------------------------------------------
  // FEATURE 1
  // CANDIDATE CONFIDENCE SIGNAL
  // --------------------------------------------------

  const confidenceData = useMemo(() => {
    if (!results.length) {
      return {
        score: 0,
        label: "No signal",
        description:
          "Not enough interview data to estimate confidence.",
      };
    }

    let confidencePoints = 0;

    results.forEach((result) => {
      const answer = String(
        result.answer || ""
      ).trim();

      const score = numberValue(
        result.evaluation?.score
      );

      const communication = numberValue(
        result.evaluation?.communication
      );

      if (answer.length >= 80) {
        confidencePoints += 1;
      }

      if (score >= 7) {
        confidencePoints += 1;
      }

      if (communication >= 7) {
        confidencePoints += 1;
      }

      if (
        result.evidence &&
        result.evidence.length > 0
      ) {
        confidencePoints += 1;
      }
    });

    const maxPoints = results.length * 4;

    const score = Math.round(
      (confidencePoints / maxPoints) * 100
    );

    if (score >= 75) {
      return {
        score,
        label: "High confidence signal",
        description:
          "Your responses were generally clear, detailed, and supported by evidence.",
      };
    }

    if (score >= 50) {
      return {
        score,
        label: "Moderate confidence signal",
        description:
          "You showed confidence in several areas, but some answers could use stronger detail and evidence.",
      };
    }

    return {
      score,
      label: "Low confidence signal",
      description:
        "Several answers were brief or lacked supporting evidence. Try explaining your reasoning more explicitly.",
    };
  }, [results]);

  // --------------------------------------------------
  // FEATURE 2
  // INTERVIEW REPLAY
  // --------------------------------------------------

  const [activeReplay, setActiveReplay] =
    useState(null);

  const toggleReplay = (index) => {
    setActiveReplay(
      activeReplay === index ? null : index
    );
  };

  // --------------------------------------------------
  // FEATURE 3
  // WHY DID INTERVIEWER ASK THIS?
  // --------------------------------------------------

  const getQuestionReason = (result) => {
    const action = String(
      result.action || ""
    ).toUpperCase();

    const missing =
      getArray(
        result.evaluation?.missingEvidence
      ).length > 0 ||
      getArray(
        result.observation?.missingEvidence
      ).length > 0;

    if (
      action === "DEEPEN" ||
      action === "FOLLOW_UP"
    ) {
      return "The interviewer asked this to explore your answer more deeply and verify the evidence behind your claim.";
    }

    if (
      action === "CLARIFY" ||
      missing
    ) {
      return "This question was likely asked to clarify an incomplete answer or uncover evidence that was missing from your previous response.";
    }

    if (
      result.evaluation?.technicalDepth !==
        undefined &&
      numberValue(
        result.evaluation?.technicalDepth
      ) < 6
    ) {
      return "This question focused on technical depth to understand how well you could explain implementation details and technical decisions.";
    }

    return "This question was used to evaluate your reasoning, experience, and ability to support your answer with concrete evidence.";
  };

  // --------------------------------------------------
  // FEATURE 4
  // SKILL COVERAGE MAP
  // --------------------------------------------------

  const skillCoverage = useMemo(() => {
    const skills = [
      {
        name: "Communication",
        score: communicationScore,
        colorClass: "coverage-good",
      },
      {
        name: "Problem Solving",
        score: problemSolvingScore,
        colorClass: "coverage-good",
      },
      {
        name: "Technical Depth",
        score: technicalDepthScore,
        colorClass: "coverage-good",
      },
      {
        name: "Evidence",
        score: Math.min(
          100,
          results.length
            ? Math.round(
                (results.filter(
                  (r) =>
                    getArray(r.evidence).length > 0 ||
                    getArray(
                      r.evaluation?.evidence
                    ).length > 0
                ).length /
                  results.length) *
                  100
              )
            : 0
        ),
        colorClass: "coverage-good",
      },
      {
        name: "Reasoning",
        score: problemSolvingScore,
        colorClass: "coverage-good",
      },
      {
        name: "Consistency",
        score: consistencyScore,
        colorClass: "coverage-good",
      },
    ];

    return skills;
  }, [
    communicationScore,
    problemSolvingScore,
    technicalDepthScore,
    consistencyScore,
    results,
  ]);

  // --------------------------------------------------
  // FEATURE 5
  // CONTRADICTION DETECTOR
  // --------------------------------------------------

  const contradictions = useMemo(() => {
    const found = [];

    for (let i = 0; i < results.length; i++) {
      const current = String(
        results[i].answer || ""
      )
        .trim()
        .toLowerCase();

      if (!current) continue;

      for (
        let j = i + 1;
        j < results.length;
        j++
      ) {
        const previous = String(
          results[j].answer || ""
        )
          .trim()
          .toLowerCase();

        if (!previous) continue;

        const currentWords = new Set(
          current
            .split(/\s+/)
            .filter(
              (word) => word.length > 5
            )
        );

        const previousWords = new Set(
          previous
            .split(/\s+/)
            .filter(
              (word) => word.length > 5
            )
        );

        const sharedWords = [
          ...currentWords,
        ].filter((word) =>
          previousWords.has(word)
        );

        const contradictionWords = [
          "never",
          "always",
          "only",
          "none",
          "no",
          "not",
          "never used",
          "didn't",
          "did not",
        ];

        const currentNegative =
          contradictionWords.some((word) =>
            current.includes(word)
          );

        const previousNegative =
          contradictionWords.some((word) =>
            previous.includes(word)
          );

        if (
          sharedWords.length >= 2 &&
          currentNegative !== previousNegative
        ) {
          found.push({
            first: i,
            second: j,
            message:
              "Potential contradiction detected. These answers discuss similar information but appear to differ in certainty or claim.",
          });
        }
      }
    }

    return found.slice(0, 5);
  }, [results]);

  // --------------------------------------------------
  // AGENT JOURNEY
  // --------------------------------------------------

  const agentJourney = useMemo(() => {
    let detectedEvidence = false;
    let identifiedGaps = false;
    let adaptedQuestioning = false;

    results.forEach((result) => {
      if (
        result.evidence?.length > 0
      ) {
        detectedEvidence = true;
      }

      if (
        result.evaluation?.missingEvidence
          ?.length > 0 ||
        result.observation?.missingEvidence
          ?.length > 0
      ) {
        identifiedGaps = true;
      }

      if (
        result.observation ||
        result.action === "DEEPEN" ||
        result.action === "CLARIFY"
      ) {
        adaptedQuestioning = true;
      }
    });

    return {
      startedBroad: results.length > 0,
      detectedEvidence,
      identifiedGaps,
      adaptedQuestioning,
    };
  }, [results]);

  // --------------------------------------------------
  // RECOMMENDATION
  // --------------------------------------------------

  const recommendation = useMemo(() => {
    if (overallScore >= 80) {
      return {
        title:
          "Strong interview performance",
        text:
          "Your answers demonstrated strong communication, reasoning, and technical evidence. Continue refining your examples with measurable outcomes and clear trade-offs.",
      };
    }

    if (overallScore >= 60) {
      return {
        title: "Good foundation",
        text:
          "Your interview showed a solid foundation. Strengthen your examples with clearer reasoning, implementation details, and measurable outcomes.",
      };
    }

    return {
      title:
        "Further preparation recommended",
      text:
        "The interview showed several areas where stronger examples, clearer reasoning, and deeper technical evidence would improve the performance.",
    };
  }, [overallScore]);

  // --------------------------------------------------
  // PROJECT ANALYSIS
  // --------------------------------------------------

  const openProjectAnalysis = () => {
    navigate("/project-analysis");
  };

  // --------------------------------------------------
  // NO RESULTS
  // --------------------------------------------------

  if (!results.length) {
    return (
      <main className="report-page">
        <section className="report-empty">
          <span className="section-eyebrow">
            INTERVIEW REPORT
          </span>

          <h1>
            No interview results found.
          </h1>

          <p>
            Complete an interview first to
            generate your performance report.
          </p>

          <button
            onClick={() => navigate("/setup")}
          >
            Start Interview →
          </button>
        </section>
      </main>
    );
  }

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <main className="report-page">

      {/* HEADER */}

      <section className="report-header">
        <div>
          <span className="section-eyebrow">
            INTERVIEW REPORT
          </span>

          <h1>
            Evidence,
            <span> not just scores.</span>
          </h1>

          <p>
            Your interview was evaluated across
            demonstrated skills, reasoning quality,
            communication, and technical depth.
          </p>
        </div>
      </section>

      {/* OVERALL SCORE */}

      <section className="overall-report-card">
        <div>
          <span className="report-label">
            OVERALL SCORE
          </span>

          <div className="overall-score">
            <strong>{overallScore}</strong>
            <span>/100</span>
          </div>

          <p>
            Based on{" "}
            <strong>{results.length}</strong>{" "}
            interview responses, IntervueX evaluated
            your communication, problem solving,
            and technical depth.
          </p>
        </div>

        <div className="recommendation-box">
          <span>
            AGENT RECOMMENDATION
          </span>

          <h3>
            {recommendation.title}
          </h3>

          <p>
            {recommendation.text}
          </p>
        </div>
      </section>

      {/* =================================================
          FEATURE 1 - CANDIDATE CONFIDENCE
          ================================================= */}

      <section className="report-section feature-section">
        <div className="report-section-header">
          <span>01A</span>

          <div>
            <h2>
              CANDIDATE CONFIDENCE SIGNAL
            </h2>

            <p>
              Confidence inferred from answer
              quality and supporting evidence
            </p>
          </div>
        </div>

        <div className="confidence-card">
          <div className="confidence-score">
            <strong>
              {confidenceData.score}
            </strong>

            <span>/100</span>
          </div>

          <div className="confidence-content">
            <span className="feature-label">
              CONFIDENCE SIGNAL
            </span>

            <h3>
              {confidenceData.label}
            </h3>

            <p>
              {confidenceData.description}
            </p>

            <div className="confidence-bar">
              <div
                style={{
                  width: `${confidenceData.score}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FEATURE 4 - SKILL COVERAGE MAP
          ================================================= */}

      <section className="report-section feature-section">
        <div className="report-section-header">
          <span>01B</span>

          <div>
            <h2>
              SKILL COVERAGE MAP
            </h2>

            <p>
              How broadly your interview evidence
              covered important skills
            </p>
          </div>
        </div>

        <div className="coverage-map">
          {skillCoverage.map(
            (skill, index) => (
              <div
                className="coverage-card"
                key={index}
              >
                <div className="coverage-card-top">
                  <span>
                    {skill.name}
                  </span>

                  <strong>
                    {skill.score}%
                  </strong>
                </div>

                <div className="coverage-track">
                  <div
                    className={
                      skill.colorClass
                    }
                    style={{
                      width: `${skill.score}%`,
                    }}
                  />
                </div>

                <small>
                  {skill.score >= 75
                    ? "Strong coverage"
                    : skill.score >= 50
                    ? "Partial coverage"
                    : "Needs more evidence"}
                </small>
              </div>
            )
          )}
        </div>
      </section>

      {/* SKILL EVALUATION */}

      <section className="report-section">
        <div className="report-section-header">
          <span>02</span>

          <div>
            <h2>
              SKILL EVALUATION
            </h2>

            <p>
              What the agent observed
            </p>
          </div>
        </div>

        <div className="skill-report-grid">

          <div className="skill-report-card">
            <div className="skill-report-top">
              <span>Communication</span>

              <strong>
                {communicationScore}
              </strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: `${communicationScore}%`,
                }}
              />
            </div>

            <p>
              {communicationScore >= 70
                ? "You communicated your ideas clearly and provided useful context."
                : "Try to structure answers more clearly and provide stronger context."}
            </p>
          </div>

          <div className="skill-report-card">
            <div className="skill-report-top">
              <span>
                Problem Solving
              </span>

              <strong>
                {problemSolvingScore}
              </strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: `${problemSolvingScore}%`,
                }}
              />
            </div>

            <p>
              {problemSolvingScore >= 70
                ? "Your answers showed useful reasoning, decisions, and solutions."
                : "Explain your reasoning, debugging process, and decisions in more detail."}
            </p>
          </div>

          <div className="skill-report-card">
            <div className="skill-report-top">
              <span>
                Technical Depth
              </span>

              <strong>
                {technicalDepthScore}
              </strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: `${technicalDepthScore}%`,
                }}
              />
            </div>

            <p>
              {technicalDepthScore >= 70
                ? "You provided relevant technical concepts and implementation details."
                : "Add implementation details, technical decisions, trade-offs, and measurable outcomes."}
            </p>
          </div>

          <div className="skill-report-card">
            <div className="skill-report-top">
              <span>
                Interview Consistency
              </span>

              <strong>
                {consistencyScore}
              </strong>
            </div>

            <div className="report-progress">
              <div
                style={{
                  width: `${consistencyScore}%`,
                }}
              />
            </div>

            <p>
              {consistencyScore >= 70
                ? "Your answers maintained relatively consistent depth throughout the interview."
                : "Work on maintaining consistent detail and depth across answers."}
            </p>
          </div>

        </div>
      </section>

      {/* STRENGTHS */}

      <section className="report-section">
        <div className="report-section-header">
          <span>03</span>

          <div>
            <h2>STRENGTHS</h2>
            <p>What you did well</p>
          </div>
        </div>

        <div className="report-list">
          {strengths.length > 0 ? (
            strengths.map(
              (strength, index) => (
                <div
                  className="report-list-item"
                  key={index}
                >
                  <span className="report-check">
                    ✓
                  </span>

                  <div>
                    <span>
                      STRENGTH
                    </span>

                    <strong>
                      {strength}
                    </strong>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="report-list-item muted">
              <span>○</span>

              <div>
                <span>
                  OBSERVATION
                </span>

                <strong>
                  More evidence needed
                </strong>

                <p>
                  The interview did not provide
                  enough evidence to identify a
                  strong recurring pattern.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* IMPROVEMENT AREAS */}

      <section className="report-section">
        <div className="report-section-header">
          <span>04</span>

          <div>
            <h2>
              IMPROVEMENT AREAS
            </h2>

            <p>
              Where you can improve
            </p>
          </div>
        </div>

        <div className="report-list">
          {weaknesses.length > 0 ? (
            weaknesses.map(
              (weakness, index) => (
                <div
                  className="report-list-item"
                  key={index}
                >
                  <span className="report-warning">
                    !
                  </span>

                  <div>
                    <span>
                      IMPROVEMENT
                    </span>

                    <strong>
                      {weakness}
                    </strong>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="report-list-item muted">
              <span>○</span>

              <div>
                <span>
                  IMPROVEMENT
                </span>

                <strong>
                  No major recurring weakness detected.
                </strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MISSING EVIDENCE */}

      <section className="report-section">
        <div className="report-section-header">
          <span>05</span>

          <div>
            <h2>
              MISSING EVIDENCE
            </h2>

            <p>
              What your answers could include
            </p>
          </div>
        </div>

        <div className="missing-evidence-grid">
          {missingEvidence.length > 0 ? (
            missingEvidence.map(
              (item, index) => (
                <div
                  className="missing-evidence-card"
                  key={index}
                >
                  <span>
                    ADD DETAIL
                  </span>

                  <strong>
                    Stronger evidence
                  </strong>

                  <p>{item}</p>
                </div>
              )
            )
          ) : (
            <div className="missing-evidence-card">
              <span>
                EVIDENCE
              </span>

              <strong>
                Strong evidence coverage
              </strong>

              <p>
                Your answers provided sufficient
                evidence across the evaluated areas.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          QUESTION BY QUESTION
          ================================================= */}

      <section className="report-section">
        <div className="report-section-header">
          <span>06</span>

          <div>
            <h2>
              QUESTION-BY-QUESTION
            </h2>

            <p>
              Your interview performance
            </p>
          </div>
        </div>

        <div className="question-report-list">

          {results.map(
            (result, index) => {

              const score =
                numberValue(
                  result.evaluation?.score
                );

              const communication =
                numberValue(
                  result.evaluation
                    ?.communication
                );

              const problemSolving =
                numberValue(
                  result.evaluation
                    ?.problemSolving
                );

              const technical =
                numberValue(
                  result.evaluation
                    ?.technicalDepth
                );

              const questionEvidence =
                result.evidence ||
                result.evaluation
                  ?.evidence ||
                [];

              const questionWeaknesses =
                result.evaluation
                  ?.weaknesses || [];

              return (
                <div
                  className="question-report-card"
                  key={index}
                >

                  <div className="question-report-header">
                    <span>
                      {String(
                        result.questionNumber ||
                          index + 1
                      ).padStart(2, "0")}
                    </span>

                    <h3>
                      {result.question}
                    </h3>
                  </div>

                  <div className="candidate-answer">
                    <span>
                      YOUR ANSWER
                    </span>

                    <p>
                      {result.answer ||
                        "No answer provided."}
                    </p>
                  </div>

                  {/* WHY THIS QUESTION */}

                  <div className="why-question">
                    <span>
                      WHY DID THE INTERVIEWER ASK THIS?
                    </span>

                    <p>
                      {getQuestionReason(
                        result
                      )}
                    </p>
                  </div>

                  <div className="question-score-grid">

                    <div>
                      <span>Overall</span>
                      <strong>
                        {score}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Communication
                      </span>

                      <strong>
                        {communication}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Problem Solving
                      </span>

                      <strong>
                        {problemSolving}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Technical
                      </span>

                      <strong>
                        {technical}
                      </strong>
                    </div>

                  </div>

                  <div className="question-evidence">
                    <span>
                      DETECTED EVIDENCE
                    </span>

                    {questionEvidence.length >
                    0 ? (
                      questionEvidence.map(
                        (
                          item,
                          evidenceIndex
                        ) => (
                          <div
                            key={
                              evidenceIndex
                            }
                            className="question-evidence-row"
                          >
                            <span>✓</span>

                            <p>
                              {getText(
                                item
                              )}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p className="muted">
                        No specific evidence
                        detected.
                      </p>
                    )}
                  </div>

                  {questionWeaknesses.length >
                    0 && (
                    <div className="question-improvement">
                      <span>
                        IMPROVEMENT
                      </span>

                      <p>
                        {getText(
                          questionWeaknesses[0]
                        )}
                      </p>
                    </div>
                  )}

                  {/* INTERVIEW REPLAY */}

                  <div className="replay-wrapper">

                    <button
                      className="replay-button"
                      onClick={() =>
                        toggleReplay(
                          index
                        )
                      }
                    >
                      {activeReplay ===
                      index
                        ? "Hide Interview Replay ↑"
                        : "▶ View Interview Replay"}
                    </button>

                    {activeReplay ===
                      index && (
                      <div className="replay-panel">

                        <div className="replay-step">
                          <span>
                            01
                          </span>

                          <div>
                            <strong>
                              Interviewer
                            </strong>

                            <p>
                              {result.question ||
                                "Interview question"}
                            </p>
                          </div>
                        </div>

                        <div className="replay-line" />

                        <div className="replay-step">
                          <span>
                            02
                          </span>

                          <div>
                            <strong>
                              Candidate
                            </strong>

                            <p>
                              {result.answer ||
                                "No answer recorded."}
                            </p>
                          </div>
                        </div>

                        <div className="replay-line" />

                        <div className="replay-step">
                          <span>
                            03
                          </span>

                          <div>
                            <strong>
                              Agent Evaluation
                            </strong>

                            <p>
                              Score:{" "}
                              {score}/10.
                              The answer was
                              evaluated for
                              communication,
                              reasoning, and
                              technical depth.
                            </p>
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                </div>
              );
            }
          )}

        </div>
      </section>

      {/* =================================================
          CONTRADICTION DETECTOR
          ================================================= */}

      <section className="report-section feature-section">

        <div className="report-section-header">
          <span>07</span>

          <div>
            <h2>
              CONTRADICTION DETECTOR
            </h2>

            <p>
              Potential inconsistencies across
              your interview answers
            </p>
          </div>
        </div>

        {contradictions.length > 0 ? (
          <div className="contradiction-list">

            {contradictions.map(
              (item, index) => (
                <div
                  className="contradiction-card"
                  key={index}
                >

                  <div className="contradiction-icon">
                    !
                  </div>

                  <div>
                    <span>
                      POTENTIAL CONTRADICTION
                    </span>

                    <h3>
                      Answers{" "}
                      {item.first + 1}{" "}
                      and{" "}
                      {item.second + 1}
                    </h3>

                    <p>
                      {item.message}
                    </p>
                  </div>

                </div>
              )
            )}

          </div>
        ) : (
          <div className="no-contradiction">

            <span>✓</span>

            <div>
              <strong>
                No obvious contradictions detected
              </strong>

              <p>
                Your answers did not contain an
                obvious conflicting pattern based
                on the available interview evidence.
              </p>
            </div>

          </div>
        )}

      </section>

      {/* AGENT JOURNEY */}

      <section className="report-section">

        <div className="report-section-header">
          <span>08</span>

          <div>
            <h2>
              AGENT JOURNEY
            </h2>

            <p>
              How the interview adapted
            </p>
          </div>
        </div>

        <div className="agent-journey">

          <div className="journey-item">
            <div className="journey-number">
              01
            </div>

            <div>
              <h3>
                Started broad
              </h3>

              <p>
                The agent began by exploring
                your experience and project
                background.
              </p>
            </div>
          </div>

          <div className="journey-item">
            <div className="journey-number">
              02
            </div>

            <div>
              <h3>
                Detected evidence
              </h3>

              <p>
                {agentJourney.detectedEvidence
                  ? "The agent identified evidence from your responses and used it during evaluation."
                  : "The agent evaluated your answers for relevant evidence."}
              </p>
            </div>
          </div>

          <div className="journey-item">
            <div className="journey-number">
              03
            </div>

            <div>
              <h3>
                Identified gaps
              </h3>

              <p>
                {agentJourney.identifiedGaps
                  ? "Weak or incomplete areas were identified for deeper evaluation."
                  : "The agent checked responses for missing evidence and gaps."}
              </p>
            </div>
          </div>

          <div className="journey-item">
            <div className="journey-number">
              04
            </div>

            <div>
              <h3>
                Adapted questioning
              </h3>

              <p>
                {agentJourney.adaptedQuestioning
                  ? "Follow-up questions were used to explore missing evidence and technical depth."
                  : "The agent generated follow-up questions based on your responses."}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* NEXT STEP */}

      <section className="report-next-step">

        <div>
          <span>
            NEXT STEP
          </span>

          <h2>
            Ready to explore
            <br />
            your projects?
          </h2>

          <p>
            Analyze a GitHub repository to understand
            your technical projects and generate
            project-aware interview questions.
          </p>
        </div>

        <button
          onClick={openProjectAnalysis}
        >
          Analyze My Project →
        </button>

      </section>

    </main>
  );
}

export default Report;