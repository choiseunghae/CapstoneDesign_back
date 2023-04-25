const express = require('express');
const router = express.Router();
const multer = require('multer');
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');
const upload = multer({ dest: 'uploads/' });

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

      // users 테이블에서 해당 유저의 프로필 이미지 경로 가져오기
      connection.query(`SELECT userImage FROM users WHERE userIndex = ${userId}`, (err, imageResult) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }
        const profile_image_path = imageResult[0].userImage;

        res.render('mypage', { nickname, bookmarkCount, thumbsCount, profile_image_path });
      });
    });
  });
});

router.post('/upload', upload.single('profileImage'), (req, res) => {
  const userId = req.session.userIndex;
  const filePath = req.file.path;

  // TODO: 데이터베이스에 이미지 경로를 저장합니다.
  connection.query(`UPDATE users SET userImage = ? WHERE userIndex = ?`, [filePath, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred');
      return;
    }

    // 이미지를 업로드하고 데이터베이스에 저장했으면 화면에 이미지를 띄웁니다.
    res.send(`<img src="${filePath}" style="width: 100%; height: 100%; border-radius: 100%;">`);
  });
});

router.post('/nickname', (req, res) => {
  const userId = req.session.userIndex;
  const newNickname = req.body.nickname;

  // 세션에 저장된 유저 닉네임 변경
  req.session.userNickname = newNickname;

  // 데이터베이스 users 테이블에서 유저 닉네임 변경
  const sql = `UPDATE users SET usernickname = '${newNickname}' WHERE userIndex = '${userId}'`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
  });

  res.send('Nickname changed successfully');
});


module.exports = router;

