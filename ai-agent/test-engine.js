const processAnswer = require("./engine/interviewEngine");

async function test() {
  try {
    const result = await processAnswer(
      "What algorithm did you use for your recommendation system?",
      "I used Random Forest because it performed well on my dataset."
    );

    console.log("\n=== INTERVIEW RESULT ===\n");

    console.log("Evaluation:");
    console.log(result.evaluation);

    console.log("\nAction:");
    console.log(result.action);

    console.log("\nNext Question:");
    console.log(result.nextQuestion);
  } catch (error) {
    console.error("Interview engine error:");
    console.error(error.message);
  }
}

test();