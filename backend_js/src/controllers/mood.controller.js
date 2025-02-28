const dotenv = require("dotenv");
dotenv.config();
const { Groq } = require("groq-sdk");

const groq = new Groq({ apiKey: "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" });

const analyzeSentiment = async (req, res) => {
  try {
    const { conversation } = req.body;
    if (!conversation) {
      return res.status(400).json({ error: "Conversation is required" });
    }

    const finalPrompt = `
    You are a Sentiment Analysis AI. Your task is to analyze the given conversation and determine the user's emotional state based on predefined categories. 
    Respond strictly in JSON format.

    Categories:
    - Mood: One of [sad, neutral, angry, happy, excited, lazy, sleepy]
    - Stress Level: A number between 0 and 100

    Conversation:
    ${conversation}`;

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "system", content: finalPrompt }],
      response_format: { type: "json" },
    });

    let result;
    try {
      result = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error("Error parsing response:", error);
      return res.status(500).json({ error: "Invalid response format from AI" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const determineMoodUsingChats = async (req, res) => {
  try {
    const { conversation } = req.body;
    if (!conversation) {
      return res.status(400).json({ error: "Conversation is required" });
    }

    const finalPrompt = `
    Based on the user's conversation, determine their emotional state.
    Respond strictly in JSON format.

    Categories:
    - Mood: One of [sad, neutral, angry, happy, excited, lazy, sleepy]

    Conversation:
    ${conversation}`;

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "system", content: finalPrompt }],
      response_format: { type: "json" },
    });

    let result;
    try {
      result = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error("Error parsing response:", error);
      return res.status(500).json({ error: "Invalid response format from AI" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error determining mood:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { analyzeSentiment, determineMoodUsingChats };
