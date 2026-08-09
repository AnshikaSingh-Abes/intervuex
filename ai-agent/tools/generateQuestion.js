const { generateAIResponse } = require("../services/gemini");

async function generateQuestion(context) {
  const {
    question,
    answer,
    evaluation,
    action,
    history = [],
    role,
    jobDescription,
    mode,
  } = context;

  const prompt = `
You are an expert AI interviewer conducting a professional interview.

Candidate role:
${role || "Not specified"}

Interview mode:
${mode || "Mixed"}

Job description:
${jobDescription || "Not provided"}

Previous interview history:
${JSON.stringify(history, null, 2)}

Current question:
${question}

Candidate's latest answer:
${answer}

Latest evaluation:
${JSON.stringify(evaluation, null, 2)}

Agent decision:
${action}

Your task:
Generate the SINGLE best next interview question.

Interview strategy:
- Use the candidate's previous answers.
- Do not repeat questions already asked.
- If important evidence is missing, ask a focused follow-up.
- If the answer is strong, increase difficulty or explore deeper reasoning.
- If the answer is weak, ask a simpler clarifying question.
- Gradually cover different relevant skills.
- Keep the interview conversational and realistic.
- Questions should be relevant to the target role.
- Do not ask multiple questions at once.

Return ONLY the next question.
Do not include numbering.
Do not include explanations.
Do not include markdown.
`;

  const questionResult = await generateAIResponse(prompt);

  return questionResult.trim();
}

module.exports = generateQuestion;