function chooseNextAction(evaluation) {
  if (evaluation.missingEvidence.length > 0) {
    return "DEEPEN";
  }

  return "NEXT_TOPIC";
}

module.exports = chooseNextAction;