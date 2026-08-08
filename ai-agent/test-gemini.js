// require("dotenv").config();

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// async function testGemini() {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-3.6-flash",
//       contents: "Say hello to the IntervueX team in one sentence.",
//     });

//     console.log("Gemini response:");
//     console.log(response.text);
//   } catch (error) {
//     console.error("Gemini API error:");
//     console.error(error.message);
//   }
// }

// testGemini();
const { generateAIResponse } = require("./services/gemini");

async function test() {
  try {
    const answer = await generateAIResponse(
      "Explain artificial intelligence in one simple sentence."
    );

    console.log("AI response:");
    console.log(answer);
  } catch (error) {
    console.error("AI error:");
    console.error(error.message);
  }
}

test();