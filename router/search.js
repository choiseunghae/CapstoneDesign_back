const express = require('express');
const router = express.Router();
const connection = require('../mysql');


router.post('/search', (req, res) => {
  const searchValue = req.body.searchValue;

  connection.query(`SELECT * FROM detailpage WHERE itemName LIKE '%${searchValue}%'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }

    if (rows.length === 0) { // 검색 결과가 없는 경우
      console.log('404');
      res.send('404');
      return;
    }

    const itemIndex = rows[0].itemIndex; // 검색된 첫 번째 행의 itemIndex를 가져옵니다.
    console.log(itemIndex);
    res.send(itemIndex);
    return;
  });
});

module.exports = router;
