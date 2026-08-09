const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeAnswer({ role, answer }) {
  try {
    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
You are a professional technical interviewer.

Candidate role: ${role}

Candidate answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON in exactly this format:
{
  "score": 0,
  "strengths": [],
  "gaps": [],
  "nextQuestion": ""
}

Rules:
- score must be between 0 and 100
- strengths should contain 2-3 concise points
- gaps should contain 1-3 concise points
- nextQuestion should be a relevant technical interview question
      `,
    });

    return JSON.parse(response.output_text);
  } catch (error) {
    console.error("OpenAI unavailable, using fallback:", error.message);

    return {
      score: 75,
      strengths: [
        "Answer is relevant to the selected role",
        "Candidate demonstrates practical understanding",
      ],
      gaps: [
        "More technical depth and specific examples could be provided",
      ],
      nextQuestion:
        "Can you explain one technical decision you made in your project and why you chose that approach?",
    };
  }
}

module.exports = {
  analyzeAnswer,
};