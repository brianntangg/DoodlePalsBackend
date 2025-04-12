const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

let prompt = "";

function updatePrompt() {
  // call gpt to update the prompt variable with a new prompt
}

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
