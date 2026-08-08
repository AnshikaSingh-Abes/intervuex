const API_URL = "http://localhost:5000";

export async function submitAnswer(question, answer) {
  const response = await fetch(`${API_URL}/api/interview`, {
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
    throw new Error("Failed to process interview answer");
  }

  return await response.json();
}