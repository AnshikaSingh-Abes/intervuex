const evaluateAnswer = require("./tools/evaluateAnswer");

async function test() {
  try {
    const result = await evaluateAnswer(
      "What algorithm did you use for your recommendation system?",
      "I used Random Forest because it performed well on my dataset."
    );

    console.log("Evaluation:");
    console.log(result);
  } catch (error) {
    console.error("Evaluation error:");
    console.error(error.message);
  }
}

test();