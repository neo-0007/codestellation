require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ Missing Gemini API key. Please check your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function getChatbotResponse(message) {
    try {
        // Use the latest available Gemini model
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });

        const chat = model.startChat({
            history: [], // Add conversation history if needed
            generationConfig: {
                maxOutputTokens: 200, // Adjust response length
            },
        });

        const result = await chat.sendMessage(message);
        
        if (result && result.response && result.response.text) {
            return result.response.text();
        } else {
            throw new Error("Invalid response from Gemini API");
        }
    } catch (error) {
        console.error("❌ Chatbot Error:", error);
        return "Sorry, I am having trouble responding right now. Please try again later.";
    }
}

module.exports = { getChatbotResponse };
