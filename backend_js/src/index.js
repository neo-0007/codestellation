const dotenv = require("dotenv");
const connectDB = require("./config/mysqlDb");
const app = require("./app.js");
const http = require("http");
const { Server } = require("socket.io");
const { getChatbotResponse } = require("./utils/chatbot");

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

// Test API
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to Pyro Hackathon!" });
});

const start = () => {
    connectDB();

    const server = http.createServer(app);
    const io = new Server(server, { cors: { origin: "*" } });

    // Store chat history for each user
    const userHistories = new Map();

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Initialize history for new user
        userHistories.set(socket.id, []);

        socket.on("sendMessage", async (message) => {
            try {
                const userHistory = userHistories.get(socket.id) || [];

                // Get chatbot response with history
                const reply = await getChatbotResponse(message, userHistory);

                // Update history
                userHistory.push({ role: "user", text: message });
                userHistory.push({ role: "bot", text: reply });

                // Store updated history
                userHistories.set(socket.id, userHistory);

                // Send response back to user
                io.to(socket.id).emit("receiveMessage", { text: reply, sender: "bot" });
            } catch (error) {
                console.error("Error fetching chatbot response:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            userHistories.delete(socket.id); // Clear history on disconnect
        });
    });

    server.listen(PORT, HOST, () => {
        console.log(`App listening at http://${HOST}:${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
        console.error(`Error: ${err.message}`);
        console.error("Shutting down the server due to Unhandled Promise Rejection");

        server.close(() => {
            process.exit(1);
        });
    });
};

start();
