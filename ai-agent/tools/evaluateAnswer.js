function evaluateAnswer(question, answer) {
  return {
    score: 0,
    strengths: [],
    weaknesses: [],
    evidence: [],
    missingEvidence: []
  };
}

module.exports = evaluateAnswer;