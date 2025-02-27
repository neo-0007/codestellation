// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require("dotenv");

// dotenv.config();

// const structuredMoodOutput = async (chats) => {
//     try {
//         const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);

//         const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//         const response = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text: `Analyze the mood based on these chats: ${JSON.stringify(chats)}` }] }]
//         });

//         // Debugging: Log the full response structure
//         console.log("Full Response from Gemini:", JSON.stringify(response, null, 2));

//         if (!response || !response.candidates || response.candidates.length === 0) {
//             throw new Error("Invalid or empty response from AI.");
//         }

//         // Extracting mood from the first candidate's output
//         const mood = response.candidates[0]?.content?.parts?.[0]?.text?.trim();

//         if (!mood) {
//             throw new Error("Mood could not be extracted from the response.");
//         }

//         return mood;

//     } catch (error) {
//         console.error("Error in structuredMoodOutput:", error);
//         throw new Error(`Failed to determine mood: ${error.message}`);
//     }
// };

// const determineMoodUsingChats = async (req, res, next) => {
//     try {
//         // Dummy chat data for testing
//         const chats = [
//             { "sender": "user", "message": "I'm feeling great today!" },
//             { "sender": "user", "message": "Had a productive day at work." },
//             { "sender": "user", "message": "Looking forward to the weekend." },
//             { "sender": "user", "message": "Sometimes, I feel a little overwhelmed, but overall I'm good." }
//         ];

//         if (!chats || !Array.isArray(chats) || chats.length === 0) {
//             return res.status(400).json({ success: false, message: "Invalid chat input." });
//         }

//         const mood = await structuredMoodOutput(chats);
//         res.status(200).json({ success: true, message: "Mood determined successfully.", mood, chats });

//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

// module.exports = { determineMoodUsingChats };


const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const determineMoodUsingChats = async (req, res, next) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Dummy chat data for testing
        const chats = [
            { "sender": "user", "message": "I'm feeling great today!" },
            { "sender": "user", "message": "Had a productive day at work." },
            { "sender": "user", "message": "Looking forward to the weekend." },
            { "sender": "user", "message": "Sometimes, I feel a little overwhelmed, but overall I'm good." }
        ];

        if (!chats || !Array.isArray(chats) || chats.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid chat input." });
        }

        const prompt = `Analyze the mood based on these chats: ${JSON.stringify(chats)} 
        and return only JSON output in the following format:
        {
            "mood": "happy",
            "stressLevel": "20%"
        }`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        console.log("Full Response from Gemini:", JSON.stringify(response, null, 2));

        if (!response?.candidates?.length) {
            throw new Error("Invalid or empty response from AI.");
        }

        // Extract AI response and parse JSON
        const rawMoodResponse = response.candidates[0]?.content?.parts?.[0]?.text?.trim();
        let moodData;
        
        try {
            moodData = JSON.parse(rawMoodResponse);
        } catch (parseError) {
            throw new Error("Failed to parse AI response as JSON.");
        }

        res.status(200).json({ success: true, message: "Mood determined successfully.", moodData, chats });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { determineMoodUsingChats };
