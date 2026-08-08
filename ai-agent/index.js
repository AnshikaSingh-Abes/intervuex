const processAnswer = require("./engine/interviewEngine");

async function main() {
  try {
    const result = await processAnswer(
      "Tell me about your ML project.",
      "I built a recommendation system using Python."
    );

    console.log("\n=== INTERVIEW RESULT ===\n");

    console.log("Evaluation:");
    console.log(result.evaluation);

    console.log("\nAction:");
    console.log(result.action);

    console.log("\nNext Question:");
    console.log(result.nextQuestion);
  } catch (error) {
    console.error("Interview error:");
    console.error(error.message);
  }
}

main();