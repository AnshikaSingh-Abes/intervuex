const generateQuestion = require("./tools/generateQuestion");

async function test() {
  try {
    const question = await generateQuestion({
      interviewQuestion:
        "What algorithm did you use for your recommendation system?",

      candidateAnswer:
        "I used Random Forest because it performed well on my dataset.",

      evaluation: {
        score: 2,
        strengths: [
          "Identified Random Forest",
          "Gave a reason for choosing it"
        ],
        weaknesses: [
          "Answer lacked technical depth"
        ],
        evidence: [
          "Candidate used Random Forest",
          "Candidate said it performed well"
        ],
        missingEvidence: [
          "Evaluation metrics",
          "Baseline comparison"
        ]
      },

      nextAction: "DEEPEN"
    });

    console.log("Next interview question:");
    console.log(question);
  } catch (error) {
    console.error("Question generation error:");
    console.error(error.message);
  }
}

test();