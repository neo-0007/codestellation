const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getChatbotResponse = async (message) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat();
        const result = await chat.sendMessage(message);
        
        // The response text is directly available on the result object
        return result.response.text();
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        return "An error occurred while communicating with the chatbot.";
    }
};

module.exports = getChatbotResponse;
