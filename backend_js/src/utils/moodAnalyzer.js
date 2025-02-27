require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ Missing Gemini API key. Please check your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function analyzeMood(messagesArray) {
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });

        // Format messages properly for AI analysis
        const formattedMessages = messagesArray.map(text => `- ${text}`).join("\n");

        // Define a precise prompt
        const prompt = `
        Based on the following conversation, determine the user's overall mood in ONE word.
        You must return only a single word.

        Conversation:
        ${formattedMessages}

        Mood (one word only):
        `;

        // Generate AI response
        const result = await model.generateContent({ contents: [{ parts: [{ text: prompt }] }] });

        if (result && result.response && result.response.text) {
            return result.response.text().trim().toLowerCase(); // Convert to lowercase for consistency
        } else {
            throw new Error("Invalid response from Gemini API");
        }
    } catch (error) {
        console.error("❌ Mood Analysis Error:", error);
        return "neutral"; // Default mood if API fails
    }
}

module.exports = { analyzeMood };
