const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
  connection.query(`SELECT MAX(itemIndex) FROM detailpage`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }

    const maxItemIndex = rows[0]['MAX(itemIndex)'];
    const question = Math.floor(Math.random() * maxItemIndex) + 1;

    connection.query(`SELECT * FROM detailpage WHERE itemIndex = ${question}`, (err, result) => {
      if (err) {
        console.log(err);
        res.send('Error occurred');
        return;
      }

      const correctAnswer = result[0].itemName;

      const wrongAnswersQuery = `
              SELECT itemName
              FROM detailpage
              WHERE itemIndex != ${question}
              ORDER BY RAND()
              LIMIT 3
            `;

      connection.query(wrongAnswersQuery, (err, wrongAnswers) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }

        const options = wrongAnswers.map((item) => item.itemName);
        options.push(correctAnswer);
        shuffleArray(options);

        const html = `
                  <div class="quizbox">
                  <h1>${result[0].itemDescription}</h1>
                  <ul>
                    ${options.map((option) => `<li button class="gradient-btn" onclick="checkAnswer('${option}', '${correctAnswer}')">${option}</li>`).join('')}
                  </ul>
                  </div>
                `;

        res.locals.quiz = html;
        next();
      });
    });
  });
});

// Shuffle array in place
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

module.exports = router;


/*
<script>
  function checkAnswer(selectedAnswer, correctAnswer) {
      if (selectedAnswer === correctAnswer) {
          alert('정답입니다.');
      } else {
          alert('님뭐함');
      }
  }
  </script>
  */