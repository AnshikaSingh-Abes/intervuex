
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
- strengths must be an array of specific positive observations supported by the candidate's answer.
- If the candidate demonstrated any useful skill, correct technical approach, good reasoning, relevant experience, clear communication, debugging ability, or effective decision-making, include it as a strength.
- Do not leave strengths empty when the answer contains genuine positive evidence.
- Every strength must be directly supported by something the candidate actually said.
- Do not invent achievements, tools, experience, or results.
- strengths must be an array of 0 to 3 specific strengths.
- Only identify strengths that are clearly demonstrated in the candidate's answer.
- Each strength must describe something the candidate actually did well.
- Do not give generic praise such as "good answer" or "strong candidate".
- Strengths can relate to communication, problem solving, technical knowledge, reasoning, decision making, or relevant experience.
- Do not invent strengths that are not supported by the answer.
- If the answer does not demonstrate any meaningful strength, return an empty strengths array.
- evidence must contain only details actually present in the candidate's answer.
- Use the evidence to identify both strengths and weaknesses.
- A strength can be a positive behavior or capability demonstrated in the answer, even if the answer is not perfect.
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
