const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

// router.get('/', (req, res) => {
//   res.render('signup');
// });

router.post('/', (req, res) => {
  const usernickname = req.body.usernickname;
  const password = req.body.password;
  const createdAt = new Date(); 
  const image = null;
  
  connection.query("SELECT * FROM users WHERE usernickname = ?", [usernickname], (error, result) => {
    if (error) throw error;
    if (!usernickname) {
      res.redirect("/signup");
      return;
    }
    if (result.length > 0) {
      // 이미 존재하는 usernickname인 경우
      res.locals.duplication = true; // 중복 메시지 보내는 변수 생성
      res.redirect("/login");
    } else {
      // 새로운 usernickname인 경우 쿼리 실행
      connection.query("INSERT INTO users (usernickname, password, createdAt, userImage) VALUES (?, ?, ?, ?)", [usernickname, password, createdAt, image], (error, result) => {
        if (error) throw error;
        res.redirect("/login");
      });
    }
  });
});

module.exports = router;
