const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');

router.use(bottomRouter);

router.get('/', (req, res) => {
  const userId = req.session.userIndex;
  let nickname = req.session.usernickname || 'Guest';

  if (!userId) {
    return res.redirect('/login');
  }

  // mybookmarkpage에서 userIndex에 해당하는 데이터 개수 가져오기
  connection.query(`SELECT COUNT(*) as bookmarkCount FROM mybookmarkpage WHERE userIndex = ${userId}`, (err, bookmarkResult) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    const bookmarkCount = bookmarkResult[0].bookmarkCount;

    // mythumbspage에서 userIndex에 해당하는 데이터 개수 가져오기
    connection.query(`SELECT COUNT(*) as thumbsCount FROM mythumbspage WHERE userIndex = ${userId} AND thumbsBool = 1`, (err, thumbsResult) => {
      if (err) {
        console.log(err);
        res.send('Error occurred');
        return;
      }
      const thumbsCount = thumbsResult[0].thumbsCount;

      res.render('mypage', { nickname, bookmarkCount, thumbsCount });
    });
  });
});

module.exports = router;

