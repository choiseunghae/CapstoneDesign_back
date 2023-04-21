const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// OpenAI API 키 설정
openai.apiKey = API_KEY;

router.get('/', (req, res) => {
  res.render('example');
});

router.post('/ask', (req, res) => {
  const { question } = req.body; // 클라이언트로부터 전달받은 질문

  try {
    // OpenAI API 호출
    const response = openai.Completion.create({
      engine: 'davinci',
      prompt: `Q: ${question}\nA:`,
      maxTokens: 100,
      n: 1,
      stop: '\n',
    });
    
    const answer = response.choices[0].text.trim(); // 응답에서 답변 추출
    res.json({ answer }); // 클라이언트에게 답변 반환
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: '서버 에러' }); // 에러 발생 시 500 에러 반환
  }
});

module.exports = router;
