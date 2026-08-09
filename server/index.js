require("dotenv").config();
const express = require("express");
const cors = require("cors");

const interviewRoutes = require("./routes/interview");
const projectRoutes = require("./routes/project");

const app = express();

app.use(cors());
app.use(express.json());

// Interview API
app.use("/api/interview", interviewRoutes);

// Project API
app.use("/api/project", projectRoutes);

// Home
app.get("/", (req, res) => {
  res.json({
    message: "IntervueX backend is running!"
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "IntervueX API is healthy"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});