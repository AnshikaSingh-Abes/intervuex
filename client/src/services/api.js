const API_URL = "http://localhost:5000";

export async function submitAnswer(
  question,
  answer,
  history = []
) {
  const response = await fetch(
    `${API_URL}/api/interview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
        history,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to process interview answer"
    );
  }

  return await response.json();
}

export async function startInterview(setup) {
  const response = await fetch(`${API_URL}/api/interview/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setup),
  });

  if (!response.ok) {
    throw new Error("Failed to start interview");
  }

  return await response.json();
}