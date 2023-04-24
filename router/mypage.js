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

      // users 테이블에서 해당 유저의 프로필 이미지 blob 데이터 가져오기
      connection.query(`SELECT userImage FROM users WHERE userIndex = ${userId}`, (err, imageResult) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }

        // 프로필 이미지 blob 데이터를 base64로 디코딩하여 화면에 띄우기
        const imageBase64 = Buffer.from(imageResult[0].userImage, 'binary').toString('base64');
        const imageUrl = `data:image/png;base64,${imageBase64}`;

        res.render('mypage', { nickname, bookmarkCount, thumbsCount, profile_image_path: imageUrl });
      });
    });
  });
});


router.post('/upload', (req, res) => {
  const userId = req.session.userIndex;
  const base64Image = req.body.profileImage;

  // base64로 인코딩된 이미지 데이터를 디코딩하여 파일로 저장합니다.
  const buffer = Buffer.from(base64Image, 'base64');
  const fileName = `user_${userId}.png`;
  const filePath = path.join(__dirname, '..', 'public', 'uploads', fileName);
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred');
      return;
    }

    // 데이터베이스에 이미지 경로를 저장합니다.
    connection.query(`UPDATE users SET userImage = ? WHERE userIndex = ?`, [`/uploads/${fileName}`, userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error occurred');
        return;
      }

      // 이미지를 업로드하고 데이터베이스에 저장했으면 화면에 이미지를 띄웁니다.
      res.send(`<img src="/uploads/${fileName}" style="width: 100%; height: 100%; border-radius: 100%;">`);
    });
  });
});


module.exports = router;

