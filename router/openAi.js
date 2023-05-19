const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const router = express.Router();
const path = require('path');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.use(express.json());
router.use(express.static(path.join(__dirname, "public")));

// Chat route
router.post("/chat", async (req, res) => {
  const userInput = req.body.userInput; // 클라이언트에서 전송한 사용자 입력 값

  try {
    const completion = await openai.api_completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    });

    const response = completion.data.choices[0].message.content;

    // 클라이언트에 응답 전송
    res.json({ response });
  } catch (error) {
    console.error("Failed to communicate with the GPT API:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

module.exports = router;
