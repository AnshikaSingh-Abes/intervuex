const { generateAIResponse } = require("../services/gemini");

async function evaluateAnswer(question, answer) {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer carefully.

Return ONLY valid JSON in exactly this structure:

{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "evidence": [],
  "missingEvidence": []
}

Rules:
- score must be a number from 0 to 10
- strengths should contain specific things the candidate did well
- weaknesses should contain specific problems or gaps
- evidence should contain claims or details actually supported by the candidate's answer
- missingEvidence should contain important information that should have been provided but was not
- Do not invent information that the candidate did not say
`;

  const response = await generateAIResponse(prompt);

  try {
    return JSON.parse(response);
  } catch (error) {
    throw new Error("Gemini returned invalid JSON");
  }
}

module.exports = evaluateAnswer;