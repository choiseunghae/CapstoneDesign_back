const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');

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

  connection.query(`SELECT COUNT(*) as count FROM mybookmarkpage WHERE userIndex = ${userId}`, (err, result) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    const bookmarkCount = result[0].count;
    var bookmark = bookmarkCount;
    res.render('mypage', { nickname , bookmark });
  });


});


module.exports = router;

