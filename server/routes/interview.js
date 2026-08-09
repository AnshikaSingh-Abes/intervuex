const express = require("express");
const { analyzeAnswer } = require("../services/aiService");

const router = express.Router();

// Start a new interview
router.post("/start", (req, res) => {
  const { role, experience, difficulty } = req.body;

  if (!role) {
    return res.status(400).json({
      success: false,
      message: "Role is required",
    });
  }

  const interview = {
    id: Date.now().toString(),
    role,
    experience: experience || "fresher",
    difficulty: difficulty || "medium",
    status: "started",
    currentQuestion: 1,
  };

  res.json({
    success: true,
    message: "Interview started successfully",
    interview,
  });
});

// Submit an interview answer
router.post("/answer", async (req, res) => {
  try {
    const { interviewId, answer, role } = req.body;

    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is required",
      });
    }

    if (!answer || !answer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer is required",
      });
    }

    const analysis = await analyzeAnswer({
      role: role || "Software Developer",
      answer,
    });

    res.json({
      success: true,
      message: "Answer received successfully",
      analysis,
      nextQuestion:
        "Can you explain the technical decisions you made in this project?",
    });
  } catch (error) {
    console.error("Answer analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze answer",
    });
  }
});

module.exports = router;