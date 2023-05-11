const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.get("/", (req, res) => {
  res.render("chat");
});

router.post("/", async (req, res) => {
  const userInput = req.body.userInput; // Client's user input

  // OpenAI API request
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userInput }],
  });

  const response = completion.data.choices[0].message;

  // Send the response to the client
  res.json({ response });
});

module.exports = router;