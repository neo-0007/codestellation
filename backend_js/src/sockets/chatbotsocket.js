const { getChatbotResponse } = require("../utils/chatbot");

const chatbotHistory = []; // Store chatbot conversation

const chatbotSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected to chatbot");

        socket.on("chatbotMessage", async (message) => {
            try {
                // Store user message
                chatbotHistory.push({ role: "user", text: message });

                // Get chatbot response
                const reply = await getChatbotResponse(message);

                // Store chatbot response
                chatbotHistory.push({ role: "bot", text: reply });

                // Emit chatbot response only to the sender
                socket.emit("receiveChatbotMessage", { text: reply, sender: "bot" });

            } catch (error) {
                console.error("Error fetching chatbot response:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected from chatbot");
        });
    });
};

module.exports = chatbotSocket;
