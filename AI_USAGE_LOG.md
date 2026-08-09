# AI Usage Log

## Project: IntervueX

IntervueX is an AI-powered interview platform that conducts adaptive interviews, evaluates candidate responses, identifies missing evidence, and generates a final interview performance report.

AI tools were used during development as an assistance layer for implementation, debugging, architecture discussions, and documentation.

---

## 1. AI Tool Used

### ChatGPT

ChatGPT was used as a development assistant throughout the project.

Primary uses included:

- Understanding and planning project architecture
- Generating and improving code
- Debugging frontend and backend issues
- Designing the adaptive interview flow
- Improving AI evaluation logic
- Structuring interview reports
- Debugging API communication
- Improving error handling
- Creating project documentation

---

## 2. AI-Assisted Features

### Adaptive Interview Questions

AI was used to help generate interview questions based on:

- Candidate role
- Job description
- Interview mode
- Previous question
- Candidate answer
- Previous interview history
- Detected evidence
- Missing evidence

The AI interviewer can adapt its next question according to the candidate's previous response.

---

### Answer Evaluation

AI was used to evaluate candidate answers across multiple dimensions:

- Overall performance
- Communication
- Problem solving
- Technical depth
- Strengths
- Weaknesses
- Missing evidence

The evaluation is used by the interview engine to decide what should happen next.

---

### Evidence Detection

AI was used to identify evidence from candidate responses.

Examples of detected evidence include:

- Technical implementation details
- Problem-solving approaches
- Debugging experience
- Use of development tools
- Reusable components
- API-related decisions

Evidence is displayed in the live interview analysis panel.

---

### Adaptive Agent Decisions

The AI agent can determine an appropriate next action based on the candidate's response.

Possible actions include:

- `DEEPEN`
- `CLARIFY`
- `MOVE_ON`
- `NEXT_TOPIC`

These decisions influence the next interview question.

---

### Interview Report

AI-generated evaluation data is used to build the final interview report.

The report includes:

- Overall score
- Communication score
- Problem-solving score
- Technical-depth score
- Interview consistency
- Strengths
- Improvement areas
- Missing evidence
- Question-by-question evaluation
- Agent journey

---

## 3. Development Assistance

AI assistance was also used for debugging development issues.

Examples included:

### Backend debugging

Identifying issues such as:

- Undefined variables
- Incorrect function usage
- API response handling
- Interview engine errors
- Backend/frontend communication issues

### Frontend debugging

Assistance was used for:

- React component errors
- State management
- Session storage handling
- Navigation issues
- Interview submission flow
- Report rendering
- Vite errors

### Git and GitHub

AI assistance was used for:

- Understanding Git commands
- Creating commits
- Pushing changes to GitHub
- Understanding branches and merging

---

## 4. Human Responsibility

AI-generated code and suggestions were reviewed, tested, modified, and integrated by the developer.

The developer was responsible for:

- Deciding which suggestions to use
- Integrating code into the project
- Testing the application
- Debugging implementation issues
- Connecting frontend and backend components
- Configuring environment variables
- Managing the GitHub repository
- Final project decisions

AI was used as an assistance tool and not as a replacement for development decisions.

---

## 5. AI Development Workflow

The general development workflow was:

1. Identify a feature or problem.
2. Discuss the requirement with AI.
3. Generate or modify a possible implementation.
4. Integrate the implementation into the project.
5. Run the application locally.
6. Test the feature.
7. Identify errors or unexpected behaviour.
8. Use AI assistance for debugging.
9. Modify the implementation where required.
10. Retest the application.
11. Commit the final working changes to GitHub.

---

## 6. Important AI-Generated Components

The project uses AI-assisted development for components including:

- Interview question generation
- Answer evaluation
- Interview decision making
- Evidence extraction
- Adaptive follow-up questions
- Interview report generation
- Frontend interview state handling
- Backend interview processing

---

## 7. Example AI Prompt Categories

Examples of prompts used during development included:

### Interview Question Generation

> Generate the next interview question based on the candidate's previous answer, detected evidence, and missing evidence.

### Answer Evaluation

> Evaluate the candidate's answer for communication, problem solving, technical depth, strengths, weaknesses, and missing evidence.

### Debugging

> Identify the cause of the runtime error and suggest the required code changes.

### Frontend

> Help implement the React state and UI flow required to submit an interview answer and display the AI evaluation.

### Report

> Structure the interview evaluation data into a clear performance report containing scores, strengths, weaknesses, and missing evidence.

---

## 8. AI Limitations

AI-generated responses can sometimes contain:

- Incorrect assumptions
- Code that requires modification
- Syntax errors
- Incomplete implementations
- Inconsistent output structures

Therefore, AI-generated suggestions were tested and adjusted before being used in the final application.

---

## 9. Final Statement

AI was used as a development assistant throughout the IntervueX project.

The final implementation was reviewed, integrated, tested, and controlled by the developer. AI assistance primarily supported development speed, debugging, reasoning, and implementation rather than replacing the developer's responsibility for the project.