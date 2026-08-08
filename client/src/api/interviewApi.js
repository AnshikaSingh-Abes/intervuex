const API_BASE_URL = "http://localhost:5000";

export async function submitAnswer(question, answer) {
  const response = await fetch(`${API_BASE_URL}/api/interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to process answer");
  }

  return response.json();
}