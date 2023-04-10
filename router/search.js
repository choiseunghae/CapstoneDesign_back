const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');
const quizRouter = require('./quiz');

router.use(quizRouter);
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('mainpage');
});

router.post('/search', (req, res) => {
  const searchWord = req.body.searchWord;

  connection.query(`SELECT * FROM detailpage WHERE itemName LIKE '%${searchWord}%'`, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }

    // 검색 결과가 없는 경우
    if (results.length === 0) {
      return res.status(404).send('Not Found');
    }

    // 검색 결과가 있는 경우
    const itemId = results[0].itemIndex;

    // 해당 itemId에 해당하는 페이지로 이동시키기
    res.redirect(`/detail/${itemId}`);
  });
});
module.exports = router;

