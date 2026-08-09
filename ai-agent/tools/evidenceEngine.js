function buildEvidence(
  evaluation,
  questionNumber,
  question,
  answer
) {
  const evidence = evaluation?.evidence || [];

  return evidence.map((item) => ({
    statement: item,
    type: detectEvidenceType(item),
    questionNumber,
    question,
    source: "candidate_answer",
  }));
}

function detectEvidenceType(statement) {
  const text = statement.toLowerCase();

  const technicalKeywords = [
    "react",
    "javascript",
    "api",
    "backend",
    "frontend",
    "database",
    "code",
    "component",
    "function",
    "debug",
    "error",
    "github",
    "node",
    "express",
    "css",
    "html",
  ];

  const problemSolvingKeywords = [
    "problem",
    "issue",
    "bug",
    "debug",
    "fixed",
    "solution",
    "solved",
    "identified",
    "troubleshoot",
    "tested",
  ];

  if (
    technicalKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "technical";
  }

  if (
    problemSolvingKeywords.some((keyword) =>
      text.includes(keyword)
    )
  ) {
    return "problem-solving";
  }

  return "general";
}

module.exports = buildEvidence;