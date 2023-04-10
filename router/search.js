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
  const searchValue = req.body.searchValue;

  connection.query(`SELECT * FROM detailpage WHERE itemName LIKE '%${searchValue}%'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred');
      return;
    }

    if (rows.length === 0) { // 검색 결과가 없는 경우
      res.send({ itemIndex: null });
      return;
    }

    const itemIndex = rows[0].itemIndex; // 검색된 첫 번째 행의 itemIndex를 가져옵니다.
    res.send({ itemIndex: itemIndex });
  });
});

module.exports = router;

