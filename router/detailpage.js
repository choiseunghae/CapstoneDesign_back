const express = require('express');
const router = express.Router();
const connection = require('../mysql'); // mysql 모듈을 가져옴
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

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

    // 북마크 정보 가져오기
    const userId = req.session.userIndex;
    if (userId) {
      connection.query(`SELECT * FROM mybookmarkpage WHERE itemIndex = '${id}' AND userIndex = '${userId}'`, (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }
        const isBookmarked = rows.length > 0;
        // HTML 응답 보내기
        res.render('word', { itemName, itemDescription, itemDescription2, isBookmarked });
      });
    } else {
      // HTML 응답 보내기
      res.render('word', { itemName, itemDescription, itemDescription2 });
    }
  });
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.session.userIndex;
  
  // 로그인되어 있지 않은 경우
  if (!userId) {
    res.status(401).send('Unauthorized');
    return;
  }
  
  connection.query(`SELECT * FROM mybookmarkpage WHERE itemIndex = '${id}' AND userIndex = '${userId}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred');
      return;
    }

    if (rows.length > 0) {
      // 북마크가 이미 설정되어 있으면 해제
      connection.query(`DELETE FROM mybookmarkpage WHERE itemIndex = '${id}' AND userIndex = '${userId}'`, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error occurred');
          return;
        }
        res.json({ bookmarked: false });
      });
    } else {
      // 북마크가 설정되어 있지 않으면 설정
      connection.query(`INSERT INTO mybookmarkpage (itemIndex, userIndex) VALUES ('${id}', '${userId}')`, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error occurred');
          return;
        }
        res.json({ bookmarked: true });
      })
    }
  })
});


module.exports = router;