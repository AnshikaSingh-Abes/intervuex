const processAnswer = require("./engine/interviewEngine");

const result = processAnswer(
  "Tell me about your ML project.",
  "I built a recommendation system using Python."
);

console.log(result);