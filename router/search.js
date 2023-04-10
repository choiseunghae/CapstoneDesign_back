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

router.get('/search', (req, res) => {
  const searchWord = req.query.searchWord;

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
    const itemIds = results.map(result => result.itemIndex);

    // 검색어 리스트를 검색 페이지에 표시
    res.render('search', { searchWord, itemIds });
  });
});



module.exports = router;

