const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const fs = require('fs').promises;
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const STORAGE_FILE = path.join(__dirname, 'prompts.json');

let promptIndex = 0;
let currentPrompt = "";
const prompts = [
  "Draw your current mood as a quirky animal with a job",

  "If your thoughts were plants, what would they be growing into today",

  "Sketch your energy level as a type of vehicle stuck in traffic",

  "What does your stress look like as a misunderstood cartoon villain",

  "Illustrate the background image inside your brain today",

  "If your emotions were an ice cream sundae, what toppings would they have",

  "Draw your ideal mental space as a cozy room you'd love to live in",

  "What would your emotional support creature look like today",

  "Sketch your focus as a shape-shifting object",

  "If your motivation were a snack, what would it be and why",

  "Design the album cover for the soundtrack of your day",

  "What would your self-doubt wear if it were walking down a runway",

  "Draw your go-to recharge activity—real or imaginary—in superhero mode",

  "If your inner critic had a silly disguise, what would it be",

  "Sketch the shoes your feelings are wearing today",

  "What would your emotional baggage look like if it came in a designer suitcase",

  "Turn your mood into a fashion look for the day",

  "If you could picture 'hope' as a landscape, what would it look like",

  "Create a mental state sticker you'd send to a friend today",

  "What's your heart doing right now—draw it like it's living a secret life",

  "Invent three custom emojis that sum up your mood today",

  "Draw what peace looks like in your mind as a dreamlike scene",

  "If your brain was a café, what's on the emotional menu today",

  "Create a magical creature that guards your personal boundaries",

  "Illustrate your joy as a floating island you'd like to visit",

  "What would your inner child put on their to-do list today",

  "If your day was a meme, how would it look in picture form",

  "Turn your resilience into a superhero sidekick",

  "What does burnout look like when it's just trying its best",

  "Draw your comfort zone as a tiny, lovable room",

  "Sketch your mental clutter as a messy workspace",

  "If your feelings could play an instrument, what would it sound like",

  "Draw your social battery as a phone—what's its current charge",

  "Design a plant that only grows when you practice self-kindness",

  "Forecast your week with five mini weather icons based on your feelings",

  "What would your procrastination monster look like if it just wanted to be loved",

  "If your mind was a vending machine, what's inside today",

  "Draw what emotional balance looks like in your world",

  "What kind of hat is your mood wearing today",

  "Map out your week as a roller coaster of highs and dips",

  "What would your anxiety look like if it starred in a dance video",

  "Create a recipe that captures your self-care ingredients",

  "If your thoughts could pack a suitcase, what would they take along",

  "Draw an illustrated version of your go-to daily affirmation"
];

async function loadStorage() {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf8');
    const storage = JSON.parse(data);
    promptIndex = storage.index || 0;
    currentPrompt = prompts[promptIndex];
    console.log('Loaded from storage:', { currentPrompt, index: promptIndex });
  } catch (err) {
    promptIndex = 0;
    currentPrompt = prompts[0];
    await saveStorage();
  }
}

async function saveStorage() {
  const storage = {
    index: promptIndex
  };
  await fs.writeFile(STORAGE_FILE, JSON.stringify(storage, null, 2));
}

function getNextPrompt() {
  promptIndex = (promptIndex + 1) % prompts.length;
  currentPrompt = prompts[promptIndex];
  saveStorage();
  return currentPrompt;
}

async function initialize() {
  await loadStorage();
  console.log("\n=== Current Prompt ===");
  console.log(`Prompt: ${currentPrompt}`);
  console.log("=====================\n");
}

initialize();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/daily-prompt", (req, res) => {
  res.json({ prompt: currentPrompt });
});

app.post("/next-prompt", (req, res) => {
  const nextPrompt = getNextPrompt();
  res.json({ prompt: nextPrompt });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Update prompt at 9 AM EST every day
cron.schedule("0 9 * * *", () => {
  getNextPrompt();
}, { timezone: "America/New_York" });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
