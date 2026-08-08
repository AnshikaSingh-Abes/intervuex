
const { generateAIResponse } = require("../services/gemini");

async function evaluateAnswer(question, answer) {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question.

Interview Question:
${question}

Candidate Answer:
${answer}

Return ONLY a valid JSON object.

Use EXACTLY this structure:

{
  "score": 0,
  "communication": 0,
  "problemSolving": 0,
  "technicalDepth": 0,
  "strengths": [],
  "weaknesses": [],
  "evidence": [],
  "missingEvidence": []
}

Rules:

- score must be a number from 0 to 10.
- communication must be a number from 0 to 100.
- problemSolving must be a number from 0 to 100.
- technicalDepth must be a number from 0 to 100.
- strengths must be an array of specific strings.
- weaknesses must be an array of specific strings.
- evidence must contain only details actually present in the candidate's answer.
- missingEvidence must contain important details that the candidate should have provided but did not.
- Evaluate communication based on clarity, structure, relevance, and ability to explain ideas.
- Evaluate problemSolving based on reasoning, obstacles, decisions, troubleshooting, and solutions.
- Evaluate technicalDepth based on technical concepts, tools, implementation details, and technical reasoning.
- Do not invent information.
- Do not assume experience that the candidate did not mention.
- Do not use markdown.
- Do not use code fences.
- Do not write anything before or after the JSON.
`;

  const response = await generateAIResponse(prompt);

  console.log("GROQ RESPONSE:", response);

  try {
    const cleanedResponse = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);

  } catch (error) {
    console.error("JSON PARSE ERROR:", error.message);
    console.error("RAW GROQ RESPONSE:", response);

    throw new Error("AI returned invalid JSON");
  }
}

module.exports = evaluateAnswer;
