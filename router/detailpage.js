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
    if (userId) {
      connection.query(`SELECT * FROM mybookmarkpage WHERE itemIndex = '${id}' AND userIndex = '${userId}'`, (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }
        isBookmarked = rows.length > 0;
        res.render('word', { itemIndex, itemName, itemDescription, itemDescription2, isBookmarked });
      });
    } else {
      res.render('word', { itemIndex, itemName, itemDescription, itemDescription2, isBookmarked });
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
    res.sendStatus(200);
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
    res.sendStatus(200);
  });
});

module.exports = router;
