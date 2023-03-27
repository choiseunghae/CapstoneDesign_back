const express = require('express');
const router = express.Router();
const connection = require('../mysql'); // mysql 모듈을 가져옴
const searchboxRouter = require('./search_box');
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(searchboxRouter);
router.use(bottomRouter); // bottom 미들웨어를 사용합니다.

router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM detailpage WHERE itemIndex = '${id}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }

    let html = ``

    // 데이터를 HTML 형식으로 변환
    for (let row of rows) {
      html += `
      <div class="wordbox">
              <h1>${row.itemName}</h1>
              <ul>
              <h2>뜻</h2>
                <li>
                ${row.itemDescription}</li>
              <div class="line"></div>
              <h2>예</h2>
                <li>
                ${row.itemDescription2}</li>
              </ul>
            </div>

            <nav class="nav_form">
            <a class="btn__link" href="#"><i class="bi bi-hand-thumbs-up" style="font-size: 2rem;"></i></a>
            <a class="btn__link" href="#"><i class="bi bi-box-arrow-up" style="font-size: 2rem;"></i></a>
        </nav>


          `;
    }

    html += `
      `;

    // HTML 응답 보내기
    res.render('word', { word: html });
  });
});

module.exports = router;