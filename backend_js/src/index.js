const dotenv = require("dotenv");
const connectDB = require("./config/mysqlDb");
const app = require("./app.js");
const http = require("http");
const { Server } = require("socket.io");
const { getChatbotResponse } = require("./utils/chatbot");
const { analyzeMood } = require("./utils/moodAnalyzer"); // Import mood analysis function
const Group = require("./models/groups.model.js");
const mysql = require("mysql2/promise");
const config = require("./config/mysqlConfig");
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Store chat history (resets when user disconnects)
const chatHistory = [];

process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});

// Test API
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to Pyro Hackathon!" });
});

const moodStorage = { mood: "neutral" }; // Store the last analyzed mood

app.get("/get-mood", async (req, res) => {
    try {
        // If chat history is empty, return the stored mood
        if (chatHistory.length === 0) {
            return res.status(200).json({ mood: moodStorage.mood, message: "No new chat history yet." });
        }
        
        // Analyze mood from chat history
        const mood = await analyzeMood(chatHistory.map(msg => msg.text));
        
        // Store analyzed mood in memory
        moodStorage.mood = mood;
        console.log("Analyzed Mood:", mood);
        
        res.status(200).json({ mood });
    } catch (error) {
        console.error("Error getting mood:", error);
        res.status(500).json({ error: "Failed to analyze mood." });
    }
});

app.post("/create-group", async (req, res) => {
    const { groupName } = req.body;
    
    if (!groupName || !groupName.trim()) {
        return res.status(400).json({ message: "Group name is required." });
    }
    
    try {
        const group = new Group({ groupName: groupName });
        await group.save();
        res.status(201).json({ message: "Group created successfully!" });
    } catch (err) {
        console.error("Error creating group:", err);
        res.status(500).json({ message: "Failed to create group." });
    }
});

// Create a MySQL connection pool for direct queries
let pool;

app.get("/get-groups", async (req, res) => {
    try {
        // Use the pool to execute query
        const [groups] = await pool.query("SELECT group_name FROM chat_groups");
        res.status(200).json(groups);
    } catch (err) {
        console.error("Error fetching groups:", err);
        res.status(500).json({ message: "Failed to retrieve groups." });
    }
});

const start = async () => {
    try {
        // Connect to database using the connectDB function
        await connectDB();
        
        // Create a pool for direct queries
        pool = mysql.createPool(config);
        
        const server = http.createServer(app);
        const io = new Server(server, { cors: { origin: "*" } });
        
        io.on("connection", (socket) => {
            console.log("User connected");
            
            socket.on("sendMessage", async (message) => {
                try {
                    // Store user message
                    chatHistory.push({ role: "user", text: message });
                    
                    // Get bot response
                    const reply = await getChatbotResponse(message);
                    
                    // Store bot response
                    chatHistory.push({ role: "bot", text: reply });
                    
                    // Emit message to frontend
                    io.emit("receiveMessage", { text: reply, sender: "bot" });
                    console.log(chatHistory);
                } catch (error) {
                    console.error("Error fetching chatbot response:", error);
                    // Send error message to client
                    io.emit("receiveMessage", { 
                        text: "Sorry, I couldn't process your message at this time.", 
                        sender: "bot" 
                    });
                }
            });
            
            socket.on("disconnect", () => {
                console.log("User disconnected");
                chatHistory.length = 0; // Clear chat history when user leaves
            });
        });
        
        server.listen(PORT, HOST, () => {
            console.log(`App listening at http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

// Handle promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});

start();
