const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(bottomRouter);

router.get('/', (req, res) => {
  var nickname = req.session.usernickname;
  const userId = req.session.userIndex;

  if (!req.session.userIndex) {
    return res.redirect('/login');
  }

  if (nickname == null) {
    nickname = 'Guest';
  }

    res.render('setting', { nickname });
});

router.post('/bookmarkalldelete', (req, res) => {
  const userId = req.session.userId; // userId 세션에서 가져오기

  // userId에 해당하는 모든 북마크 삭제 쿼리
  const deleteQuery = `DELETE FROM mybookmarkpage WHERE userIndex = '${userId}'`;

  // MySQL 쿼리 실행
  connection.query(deleteQuery, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }

    // 삭제된 북마크가 없으면 오류 메시지를 전송
    if (results.affectedRows === 0) {
      return res.status(404).send('Bookmark not found');
    }

    // 삭제 완료 메시지 전송
    res.send('All bookmarks deleted');
  });
});

module.exports = router;