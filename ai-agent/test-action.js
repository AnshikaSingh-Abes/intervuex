const chooseNextAction = require("./tools/chooseNextAction");

const evaluation = {
  score: 2,
  strengths: [
    "Identified Random Forest"
  ],
  weaknesses: [
    "Answer lacked technical depth"
  ],
  evidence: [
    "Candidate used Random Forest"
  ],
  missingEvidence: [
    "Evaluation metrics",
    "Baseline comparison"
  ]
};

const action = chooseNextAction(evaluation);

console.log("Next action:");
console.log(action);