const express = require('express');
const router = express.Router();
const connection = require('../mysql');

router.use((req, res) => {
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
                  <div> Quiz </div>
                  <h1>${result[0].itemDescription}</h1>
                  <ul>
                    ${options.map((option) => `<li>${option}</li>`).join('')}
                  </ul>
                `;

                res.render('quiz', { quiz : html });
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
