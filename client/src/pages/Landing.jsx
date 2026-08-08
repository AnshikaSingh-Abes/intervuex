import { Link } from "react-router-dom";
import Button from "../components/common/Button";

function Landing() {
  return (
    <main>
      <section>
        <p>AI-POWERED INTERVIEWER</p>

        <h1>
          Meet your interviewer,
          <br />
          not a question generator.
        </h1>

        <p>
          An autonomous AI interviewer that adapts every question to what you
          actually know.
        </p>

        <Link to="/setup">
          <Button>Start Interview →</Button>
        </Link>
      </section>
    </main>
  );
}

export default Landing;