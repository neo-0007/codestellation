const dotenv = require("dotenv");
const connectDB = require("./config/mysqlDb");
const app = require("./app.js");
const http = require("http");
const { Server } = require("socket.io");
const { getChatbotResponse } = require("./utils/chatbot");
const { connectMongoDB } = require("./config/mongodb.js");
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
        res.status(200).json({groups, length: groups.length});
    } catch (err) {
        console.error("Error fetching groups:", err);
        res.status(500).json({ message: "Failed to retrieve groups." });
    }
});

const start = async () => {
    try {
        // Connect to database using the connectDB function
        await connectDB();
        connectMongoDB()
        
        // Create a pool for direct queries
        pool = mysql.createPool(config);
        
        const server = http.createServer(app);
        const io = new Server(server, { cors: { origin: "*" } });
        
        io.on("connection", (socket) => {
  console.log("User connected");
  
  // Store the current room/group the socket is in
  let currentRoom = null;
  
  // Handle joining a specific chat room
  socket.on("joinRoom", (groupName) => {
    // Leave previous room if any
    if (currentRoom) {
      socket.leave(currentRoom);
      console.log(`User left room: ${currentRoom}`);
    }
    
    // Join new room
    socket.join(groupName);
    currentRoom = groupName;
    console.log(`User joined room: ${groupName}`);
  });
  
  // Handle leaving a room
  socket.on("leaveRoom", (groupName) => {
    socket.leave(groupName);
    currentRoom = null;
    console.log(`User left room: ${groupName}`);
  });
  
  // Handle messages in group chats
  socket.on("sendMessage", (messageData) => {
    if (messageData.group) {
      // For group messages (from Chatroom.jsx)
      console.log(`Group message to ${messageData.group}: ${messageData.text}`);
      // Broadcast to all users in the group
      io.to(messageData.group).emit("receiveMessage", messageData);
    } else {
      // For chatbot messages (from Chatbox.tsx)
      handleChatbotMessage(socket, messageData);
    }
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Function to handle chatbot messages
async function handleChatbotMessage(socket, message) {
  try {
    // Store user message
    chatHistory.push({ role: "user", text: message });
    
    // Get bot response using Gemini API
    const reply = await getChatbotResponse(message);
    
    // Store bot response
    chatHistory.push({ role: "bot", text: reply });
    
    // Send response only to the requesting client
    socket.emit("receiveMessage", { text: reply, sender: "bot" });
  } catch (error) {
    console.error("Error fetching chatbot response:", error);
    socket.emit("receiveMessage", { 
      text: "Sorry, I couldn't process your message at this time.", 
      sender: "bot" 
    });
  }
}
        
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
