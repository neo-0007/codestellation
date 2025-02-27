require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ Missing Gemini API key. Please check your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const chatHistory = [];

// Predefined responses for common messages
const responses = {
    name: "I am your AI assistant! How can I assist you today?",
    greeting: "Hello! How can I help you?",
    small_talk: "I'm your AI assistant, but I'm always here to chat!",
    thanks: "You're very welcome! Let me know if you need anything else.",
    goodbye: "Goodbye! Have a great day! 😊"
};

// Categorized predefined messages
const message_categories = {
    name: ["what is your name?", "what's your name?", "your name", "who are you?", "can you tell me your name?"],
    greeting: ["hello", "hi", "hey", "hey there", "good morning", "good afternoon", "good evening"],
    small_talk: ["how are you?", "how are you doing?", "what's up?", "what’s going on?", "how’s it going?"],
    thanks: ["thank you", "thanks", "thanks a lot", "appreciate it"],
    goodbye: ["bye", "goodbye", "see you later", "take care", "see you soon"]
};

async function getChatbotResponse(message) {
    try {
        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });

        // Normalize input (trim spaces and make lowercase)
        const normalizedMessage = message.trim().toLowerCase();

        // Check predefined responses
        for (const category in message_categories) {
            if (message_categories[category].includes(normalizedMessage)) {
                return responses[category];
            }
        }

        // Initialize chat with empty history
        const chat = model.startChat({
            history: [], // Can be extended to maintain past conversation
            generationConfig: {
                maxOutputTokens: 200, // Adjust response length
            },
        });

        chatHistory.push(message);

        console.log(chatHistory);

        // Get response from AI
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
