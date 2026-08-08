const { generateAIResponse } = require("../services/gemini");

async function generateQuestion(context) {
  const prompt = `
You are an expert interviewer.

Based on the interview context below, generate the SINGLE best next interview question.

Interview context:
${JSON.stringify(context, null, 2)}

Rules:
- Ask only ONE question.
- The question must directly relate to the candidate's previous answer.
- If there is missing evidence, ask specifically about that missing evidence.
- Do not repeat information the candidate already provided.
- Do not ask multiple questions at once.
- Keep the question natural and conversational.
- Return ONLY the question. Do not add explanations.
`;

  const question = await generateAIResponse(prompt);

  return question.trim();
}

module.exports = generateQuestion;