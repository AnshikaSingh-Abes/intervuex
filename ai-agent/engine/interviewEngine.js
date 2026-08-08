const evaluateAnswer = require("../tools/evaluateAnswer");
const chooseNextAction = require("../tools/chooseNextAction");
const generateQuestion = require("../tools/generateQuestion");

async function processAnswer(
  question,
  answer,
  history = []
) {

  const action = chooseNextAction(evaluation);

  const nextQuestion = await generateQuestion({
  question,
  answer,
  evaluation,
  action,
  history
});

  return {
    evaluation,
    action,
    nextQuestion
  };
}

module.exports = processAnswer;