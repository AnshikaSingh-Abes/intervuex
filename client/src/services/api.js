const API_URL = "http://localhost:5000";

export async function startInterview(setup) {
  const response = await fetch(`${API_URL}/api/interview/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setup),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.error || "Failed to start interview"
    );
  }

  return await response.json();
}

export async function submitAnswer(
  question,
  answer,
  history = []
) {
  const response = await fetch(`${API_URL}/api/interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      answer,
      history,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.error ||
        "Failed to process interview answer"
    );
  }

  return await response.json();
}