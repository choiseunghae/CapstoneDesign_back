const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

// 중복 체크 엔드포인트
router.post('/', (req, res) => {
  const usernickname = req.body.usernickname;

  connection.query('SELECT * FROM users WHERE usernickname = ?', [usernickname], (error, result) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        // 중복된 닉네임인 경우
        res.json({ duplicated: true });
      } else {
        // 중복되지 않은 닉네임인 경우
        res.json({ duplicated: false });
      }
    }
  });
});

module.exports = router;
