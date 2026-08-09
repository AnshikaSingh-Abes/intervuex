require("dotenv").config({
  path: "../ai-agent/.env"
});

const express = require("express");
const cors = require("cors");

const processAnswer = require("../ai-agent/engine/interviewEngine");
const generateQuestion = require("../ai-agent/tools/generateQuestion");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "IntervueX backend is running!"
  });
});


// ===============================
// START INTERVIEW
// ===============================

app.post("/api/interview/start", async (req, res) => {
  try {
    const {
      role,
      jobDescription,
      mode,
      resumeName
    } = req.body;

    if (!role || !jobDescription || !mode) {
      return res.status(400).json({
        error:
          "Role, job description, and interview mode are required."
      });
    }

    const firstQuestion = await generateQuestion({
      role,
      jobDescription,
      mode,
      resumeName,
      action: "START",
      instruction:
        "This is the first question of the interview. Start naturally and assess the candidate's relevant experience."
    });

    res.json({
      question: firstQuestion
    });

  } catch (error) {

    console.error(
      "Start interview error:",
      error
    );

    res.status(500).json({
      error: "Failed to start interview."
    });
  }
});


// ===============================
// SUBMIT INTERVIEW ANSWER
// ===============================

app.post("/api/interview", async (req, res) => {
  try {

    const {
      question,
      answer,
      history = [],
      role,
      jobDescription,
      mode
    } = req.body;


    // Validate required fields

    if (!question || !answer) {
      return res.status(400).json({
        error:
          "Question and answer are required."
      });
    }


    // Send everything to interview engine

    const result = await processAnswer(
      question,
      answer,
      history,
      {
        role,
        jobDescription,
        mode
      }
    );


    // Send AI result to frontend

    res.json(result);

  } catch (error) {

    console.error(
      "Interview error:",
      error.message
    );

    res.status(500).json({
      error:
        "Failed to process interview answer."
    });
  }
});


// ===============================
// START SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});