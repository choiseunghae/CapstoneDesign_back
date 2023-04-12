const express = require('express');
const router = express.Router();
const connection = require('../mysql'); // mysql 모듈을 가져옴
const searchboxRouter = require('./search_box');
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(searchboxRouter);
router.use(bottomRouter); // bottom 미들웨어를 사용합니다.

router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM detailpage WHERE itemIndex = '${id}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    const { itemName, itemDescription, itemDescription2 } = rows[0];

    // HTML 응답 보내기
    res.render('word', { itemName, itemDescription, itemDescription2 });
  });
});

module.exports = router;