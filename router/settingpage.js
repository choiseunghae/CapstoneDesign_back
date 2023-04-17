const express = require('express');
const router = express.Router();
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

module.exports = router;