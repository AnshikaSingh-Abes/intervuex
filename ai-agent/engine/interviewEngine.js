const evaluateAnswer = require("../tools/evaluateAnswer");
const chooseNextAction = require("../tools/chooseNextAction");
const generateQuestion = require("../tools/generateQuestion");

function processAnswer(question, answer) {

  const evaluation = evaluateAnswer(question, answer);

  const action = chooseNextAction(evaluation);

  const nextQuestion = generateQuestion({
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