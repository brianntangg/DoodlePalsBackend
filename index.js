const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let prompt = "";

async function updatePrompt() {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative art therapist who gives imaginative drawing prompts that help people express " +
              "their emotions and relieve stress.",
        },
        {
          role: "user",
          content: "Give me 3 unique, daily drawing prompts that could be used in art therapy. " +
              "Format them as a numbered list.",
        },
      ],
      model: "gpt-4",
    });

    prompt = response.choices[0].message.content.trim();
    console.log("🆕 New prompts generated!");
  } catch (err) {
    console.error("Error fetching prompt:", err);
  }
}


updatePrompt()
app.use(cors());
app.use(express.json());

app.get("/daily-prompt", (req, res) => {
  res.json({ prompt });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

cron.schedule("0 9 * * *", updatePrompt, { timezone: "America/New_York" });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
