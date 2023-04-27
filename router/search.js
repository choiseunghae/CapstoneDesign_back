const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');
const quizRouter = require('./quiz');

router.use(quizRouter);
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  var nickname = req.session.usernickname;

  if (nickname == null) {
    nickname = '로그인';
  }
  res.render('mainpage', { nickname });
});

router.get('/search', (req, res) => {
  const searchWord = req.query.searchWord;

  const query = `SELECT *,
    CASE 
      WHEN itemName LIKE ? THEN 1 
      ELSE 0 
    END AS nameMatch,
    CASE 
      WHEN itemDescription LIKE ? THEN 1 
      ELSE 0 
    END AS descriptionMatch
    FROM detailpage 
    WHERE itemName LIKE ? OR itemDescription LIKE ? 
    ORDER BY (nameMatch + descriptionMatch) DESC`;

  const values = [`%${searchWord}%`, `%${searchWord}%`, `%${searchWord}%`, `%${searchWord}%`];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.render('search', { searchWord, message: '검색 결과를 찾을 수 없습니다.', groups: {} });
    }

    // 검색 결과를 연관성 순으로 그룹화
    const groups = {
      단어명: [],
      뜻: []
    };

    results.forEach(result => {
      const { itemIndex, itemName, itemDescription } = result;
      const matchScores = [result.nameMatch, result.descriptionMatch];
      const maxScore = Math.max(...matchScores);
      if (maxScore === 1) {
        if (result.nameMatch === 1) {
          groups.단어명.push({ itemIndex, itemName, itemDescription });
        } else if (result.descriptionMatch === 1) {
          groups.뜻.push({ itemIndex, itemName, itemDescription });
        }
      }
    });

    // 검색어 리스트를 검색 페이지에 표시
    res.render('search', { searchWord, groups });
  });
});








module.exports = router;

