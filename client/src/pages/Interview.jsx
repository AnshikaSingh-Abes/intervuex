import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  submitAnswer,
  startInterview,
} from "../services/api";
import "./Interview.css";

function Interview() {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const [questionNumber, setQuestionNumber] = useState(1);

  const [currentQuestion, setCurrentQuestion] = useState("");

  const [agentDecision, setAgentDecision] = useState(
    "→ Preparing your interview..."
  );

  const [evaluation, setEvaluation] = useState(null);

  // Store every question + answer + AI evaluation
  const [allResults, setAllResults] = useState([]);

  // Load previous interview results
  useEffect(() => {
    const savedResults =
      sessionStorage.getItem("interviewResults");

    if (savedResults) {
      setAllResults(JSON.parse(savedResults));
    }
  }, []);

  // Start interview and generate first question
  useEffect(() => {
    const startNewInterview = async () => {
      try {
        const savedSetup =
          sessionStorage.getItem("interviewSetup");

        if (!savedSetup) {
          navigate("/setup");
          return;
        }

        const setup = JSON.parse(savedSetup);

        console.log("Interview setup:", setup);

        setAgentDecision(
          "→ Preparing your personalized interview..."
        );

        const result = await startInterview(setup);

        console.log("Start interview response:", result);

        if (result.question) {
          setCurrentQuestion(result.question);
          setAgentDecision("→ Ready for your answer");
        } else {
          throw new Error("No first question received");
        }
      } catch (error) {
        console.error(
          "Failed to start interview:",
          error
        );

        setAgentDecision(
          "→ Failed to start interview"
        );
      }
    };

    startNewInterview();
  }, [navigate]);

  const handleSubmit = async () => {
    if (
      !answer.trim() ||
      submitted ||
      interviewComplete
    ) {
      return;
    }

    const currentAnswer = answer.trim();

    try {
      setSubmitted(true);

      const result = await submitAnswer(
  currentQuestion,
  currentAnswer,
  allResults
);

      console.log("API Response:", result);

      // Save current evaluation
      if (result.evaluation) {
        setEvaluation(result.evaluation);

        const questionResult = {
          questionNumber,
          question: currentQuestion,
          answer: currentAnswer,
          evaluation: result.evaluation,
        };

        setAllResults((previous) => {
          const updatedResults = [
            ...previous,
            questionResult,
          ];

          sessionStorage.setItem(
            "interviewResults",
            JSON.stringify(updatedResults)
          );

          return updatedResults;
        });
      }

      // Update agent decision
      if (result.action) {
        if (result.action === "DEEPEN") {
          setAgentDecision(
            "→ Explore technical depth"
          );
        } else if (result.action === "CLARIFY") {
          setAgentDecision(
            "→ Ask for clarification"
          );
        } else if (result.action === "MOVE_ON") {
          setAgentDecision(
            "→ Move to next topic"
          );
        } else if (
          result.action === "NEXT_TOPIC"
        ) {
          setAgentDecision(
            "→ Move to next topic"
          );
        } else {
          setAgentDecision(
            `→ ${result.action}`
          );
        }
      }

      // Question 10 = interview finished
      if (questionNumber === 10) {
        setInterviewComplete(true);
        setAgentDecision(
          "→ Interview completed"
        );
        setAnswer("");
        return;
      }

      // Move to next question
      if (
        questionNumber < 10 &&
        result.nextQuestion
      ) {
        console.log("NEXT QUESTION RECEIVED:", result.nextQuestion);

        setCurrentQuestion(result.nextQuestion);

        setQuestionNumber(
          (previous) => previous + 1
        );
      } else {
        console.log("NO NEXT QUESTION:", result);
      }

      setAnswer("");
    } catch (error) {
      console.error(
        "Error submitting answer:",
        error
      );
    } finally {
      setSubmitted(false);
    }
  };

  const communicationScore =
    evaluation?.communication ?? 0;

  const problemSolvingScore =
    evaluation?.problemSolving ?? 0;

  const technicalDepthScore =
    evaluation?.technicalDepth ?? 0;

  const openReport = () => {
    navigate("/report", {
      state: {
        results: allResults,
      },
    });
  };

  return (
    <main>

      {/* TOP BAR */}
      <header className="interview-topbar">

        <div className="interview-brand">
          IntervueX
        </div>

        <div className="interview-progress">
          <span>INTERVIEW</span>

          <strong>
            {String(questionNumber).padStart(
              2,
              "0"
            )}
          </strong>

          <span>/ 10</span>
        </div>

      </header>

      {/* MAIN INTERVIEW */}
      <section className="interview-layout">

        <div className="interviewer-panel">

          <div className="agent-label">
            <span className="agent-status"></span>
            AI INTERVIEWER · LIVE
          </div>

          <div className="question-container">

            <span className="question-number">
              QUESTION{" "}
              {String(questionNumber).padStart(
                2,
                "0"
              )}
            </span>

            <h1>
              {currentQuestion ||
                "Preparing your first question..."}
            </h1>

            <p>
              {interviewComplete
                ? "You have completed all 10 interview questions."
                : "Take your time. I'm interested in your reasoning, not just the final result."}
            </p>

          </div>

          <div className="listening-state">

            <div className="pulse"></div>

            <div>

              <strong>
                {submitted
                  ? "Analyzing your answer..."
                  : interviewComplete
                    ? "Interview completed"
                    : currentQuestion
                      ? "Ready for your answer"
                      : "Preparing interview..."}
              </strong>

              <span>
                {submitted
                  ? "The AI interviewer is evaluating your response."
                  : interviewComplete
                    ? "All 10 questions have been completed."
                    : "Type your answer below and submit when you're ready."}
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT ANALYSIS PANEL */}
        <aside className="evidence-panel">

          <div className="panel-title">

            <div>
              <span>LIVE ANALYSIS</span>
              <h3>Evidence Map</h3>
            </div>

            <span className="analysis-dot"></span>

          </div>

          <div className="skill-section">

            <div className="skill-row">

              <span>Communication</span>

              <div className="skill-bar">

                <div
                  className="skill-fill"
                  style={{
                    width: `${communicationScore}%`,
                  }}
                />

              </div>

              <small>
                {communicationScore}
              </small>

            </div>

            <div className="skill-row">

              <span>Problem Solving</span>

              <div className="skill-bar">

                <div
                  className="skill-fill"
                  style={{
                    width: `${problemSolvingScore}%`,
                  }}
                />

              </div>

              <small>
                {problemSolvingScore}
              </small>

            </div>

            <div className="skill-row">

              <span>Technical Depth</span>

              <div className="skill-bar">

                <div
                  className="skill-fill"
                  style={{
                    width: `${technicalDepthScore}%`,
                  }}
                />

              </div>

              <small>
                {technicalDepthScore}
              </small>

            </div>

          </div>

          <div className="evidence-list">

            <div className="evidence-heading">
              Detected Evidence
            </div>

            {evaluation?.evidence?.length > 0 ? (

              evaluation.evidence.map(
                (item, index) => (

                  <div
                    className="evidence-row"
                    key={index}
                  >

                    <span className="check">
                      ✓
                    </span>

                    {item}

                  </div>

                )
              )

            ) : (

              <div className="evidence-row muted">
                <span>○</span>
                Evidence will appear after
                submission
              </div>

            )}

          </div>

          <div className="agent-decision">

            <span>
              AGENT DECISION
            </span>

            <strong>
              {agentDecision}
            </strong>

            <p>
              {evaluation?.weaknesses?.length >
                0
                ? evaluation.weaknesses[0]
                : interviewComplete
                  ? "All 10 interview questions have been completed."
                  : "Your answer will be evaluated for reasoning, evidence, and technical depth."}
            </p>

          </div>

        </aside>

      </section>

      {/* ANSWER BAR */}
      <section className="answer-section">

        <textarea
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          placeholder={
            interviewComplete
              ? "Interview completed."
              : currentQuestion
                ? "Type your answer here..."
                : "Preparing interview..."
          }
          disabled={
            submitted ||
            interviewComplete ||
            !currentQuestion
          }
        />

        <div className="answer-controls">

          <span>
            {answer.length} characters
          </span>

          <button
            onClick={handleSubmit}
            disabled={
              !answer.trim() ||
              submitted ||
              interviewComplete ||
              !currentQuestion
            }
          >
            {submitted
              ? "Analyzing..."
              : interviewComplete
                ? "Interview Complete ✓"
                : "Submit Answer →"}
          </button>

        </div>

      </section>

      {/* COMPLETION OVERLAY */}
      {interviewComplete && (

        <div className="completion-overlay">

          <div className="completion-modal">

            <div className="completion-icon">
              ✓
            </div>

            <span className="completion-label">
              INTERVIEW COMPLETED
            </span>

            <h2>
              Great job. You've completed the
              interview.
            </h2>

            <p>
              Your responses have been analyzed.
              Review your performance, strengths,
              weaknesses, and areas for
              improvement.
            </p>

            <button
              className="analyze-score-btn"
              onClick={openReport}
            >
              Analyze My Score →
            </button>

          </div>

        </div>

      )}

    </main>
  );
}

export default Interview;