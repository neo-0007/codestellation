const dotenv = require("dotenv");
const connectDB = require("./config/mysqlDb");
const app = require("./app.js");
const http = require("http");
const { Server } = require("socket.io");
const { getChatbotResponse } = require("./utils/chatbot");
const { analyzeMood } = require("./utils/moodAnalyzer"); // Import mood analysis function

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


app.post('/create-group', async (req, res) => {
  const { groupName } = req.body;

  if (!groupName.trim()) {
    return res.status(400).json({ message: "Group name is required." });
  }

  try {
    const query = "INSERT INTO chat_group (group_name) VALUES (?)";
    const values = [groupName];

    const [result] = await db.execute(query, values);
    
    res.status(201).json({ 
      message: "Group created successfully!", 
      groupId: result.insertId 
    });

  } catch (err) {
    console.error("Error creating group:", err);
    res.status(500).json({ message: "Failed to create group." });
  }
});


const start = () => {
    connectDB();

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

                console.log(chatHistory); // console log kori disu

            } catch (error) {
                console.error("Error fetching chatbot response:", error);
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

    process.on("unhandledRejection", (err) => {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    });
};

start();
