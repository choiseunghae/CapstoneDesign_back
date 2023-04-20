const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');

router.use(bottomRouter);

router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM detailpage WHERE itemIndex = '${id}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    const { itemIndex, itemName, itemDescription, itemDescription2 } = rows[0];
    const userId = req.session.userIndex;
    let isBookmarked = false;
    let isThumbs = false;
    if (userId) {
      connection.query(`SELECT * FROM mybookmarkpage WHERE itemIndex = '${id}' AND userIndex = '${userId}'`, (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }
        isBookmarked = rows.length > 0;
        connection.query(`SELECT * FROM mythumbspage WHERE userIndex = '${userId}' AND thumbsBool = '1' AND itemIndex = '${id}'`, (err, rows) => {
          if (err) {
            console.log(err);
            res.send('Error occurred');
            return;
          }
          if (rows.length > 0) {
            isThumbs = true;
          }
          res.render('word', { itemIndex, itemName, itemDescription, itemDescription2, isBookmarked, isThumbs });
        });
      });
    } else {
      res.render('word', { itemIndex, itemName, itemDescription, itemDescription2, isBookmarked, isThumbs });
    }
    
  });
});



// 북마크 추가 요청 처리
router.post('/:id/bookmark', (req, res) => {
  const itemIndex = req.params.id;
  var userId = req.session.userIndex;
  connection.query(`INSERT INTO mybookmarkpage (itemIndex, userIndex) VALUES ('${itemIndex}', '${userId}')`, (err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let isBookmarked = true; // 북마크 추가 성공 시 true 값을 전달
    res.json({ isBookmarked }); // JSON 형식으로 값을 반환
  });
});

// 북마크 삭제 요청 처리
router.post('/:id/bookmark/delete', (req, res) => {
  const itemIndex = req.params.id;
  var userId = req.session.userIndex;
  connection.query(`DELETE FROM mybookmarkpage WHERE itemIndex = '${itemIndex}' AND userIndex = '${userId}'`, (err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let isBookmarked = false; // 북마크 삭제 성공 시 false 값을 전달
    res.json({ isBookmarked }); // JSON 형식으로 값을 반환
  });
});

// 좋아요 추가 요청 처리
router.post('/:id/thumbs', (req, res) => {
  const itemIndex = req.params.id;
  var userId = req.session.userIndex;
  connection.query(`INSERT INTO mythumbspage (userIndex, itemIndex) VALUES ('${userId}', '${itemIndex}')`, (err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let isThumbs = true; // 좋아요 추가 성공 시 true 값을 전달
    res.json({ isThumbs }); // JSON 형식으로 값을 반환
  });
});

// 좋아요 삭제 요청 처리
router.post('/:id/thumbs/delete', (req, res) => {
  const itemIndex = req.params.id;
  var userId = req.session.userIndex;
  connection.query(`DELETE FROM mythumbspage WHERE userIndex = '${userId}' AND itemIndex  = '${itemIndex}'`, (err) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let isThumbs = false; // 좋아요 삭제 성공 시 false 값을 전달
    res.json({ isThumbs }); // JSON 형식으로 값을 반환
  });
});

module.exports = router;
