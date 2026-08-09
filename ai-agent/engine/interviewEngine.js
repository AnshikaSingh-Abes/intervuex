const evaluateAnswer = require("../tools/evaluateAnswer");
const chooseNextAction = require("../tools/chooseNextAction");
const generateQuestion = require("../tools/generateQuestion");
const buildEvidence = require("../tools/evidenceEngine");

async function processAnswer(
  question,
  answer,
  history = [],
  setup = {}
) {
  // 1. Evaluate candidate answer
  const evaluation = await evaluateAnswer(
    question,
    answer
  );

  // 2. Decide what the interviewer should do next
  const action = chooseNextAction(evaluation);

  // 3. Build structured evidence
  const questionNumber =
    history.length + 1;

  const evidence = buildEvidence(
    evaluation,
    questionNumber,
    question,
    answer
  );

  // 4. Generate next question
  const nextQuestion = await generateQuestion({
    question,
    answer,
    evaluation,
    action,
    history,
    ...setup
  });

  // 5. Agent observation
  const observation = {
    decision: action,

    strengths:
      evaluation.strengths || [],

    weaknesses:
      evaluation.weaknesses || [],

    evidence,

    missingEvidence:
      evaluation.missingEvidence || [],

    focus:
      evaluation.technicalDepth >=
      evaluation.problemSolving
        ? "Technical Depth"
        : "Problem Solving",
  };

  return {
    evaluation,
    action,
    nextQuestion,
    observation,
    evidence,
  };
}

module.exports = processAnswer;