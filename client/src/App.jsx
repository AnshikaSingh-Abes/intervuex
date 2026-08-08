import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Landing from "./pages/Landing";
import Setup from "./pages/Setup";
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import ProjectAnalysis from "./pages/ProjectAnalysis";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/report" element={<Report />} />
        <Route path="/project-analysis" element={<ProjectAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;