const evaluateAnswer = require("../tools/evaluateAnswer");
const chooseNextAction = require("../tools/chooseNextAction");
const generateQuestion = require("../tools/generateQuestion");

async function processAnswer(question, answer) {
  const evaluation = await evaluateAnswer(question, answer);

  const action = chooseNextAction(evaluation);

  const nextQuestion = await generateQuestion({
    question,
    answer,
    evaluation,
    action
  });

  return {
    evaluation,
    action,
    nextQuestion
  };
}

module.exports = processAnswer;