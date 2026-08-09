const express = require("express");

const router = express.Router();

// Analyze a project
router.post("/analyze", (req, res) => {
  const { projectUrl, projectName } = req.body;

  if (!projectUrl) {
    return res.status(400).json({
      success: false,
      message: "Project URL is required",
    });
  }

  const analysis = {
    projectName: projectName || "Untitled Project",
    projectUrl,
    score: 78,

    strengths: [
      "Project structure is organized",
      "Frontend and backend are separated",
      "Reusable components are used",
    ],

    gaps: [
      "Testing coverage can be improved",
      "More documentation would be helpful",
      "Error handling can be strengthened",
    ],

    technologies: [
      "React",
      "Node.js",
      "Express",
    ],
  };

  res.json({
    success: true,
    message: "Project analyzed successfully",
    analysis,
  });
});

module.exports = router;