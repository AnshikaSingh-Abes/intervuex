require("dotenv").config({
  path: "../ai-agent/.env"
});
const express = require("express");
const cors = require("cors");

const processAnswer = require("../ai-agent/engine/interviewEngine");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "IntervueX backend is running!"
  });
});

app.post("/api/interview", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        error: "Question and answer are required."
      });
    }

    const result = await processAnswer(question, answer);

    res.json(result);
  } catch (error) {
    console.error("Interview error:", error.message);

    res.status(500).json({
      error: "Failed to process interview answer."
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});