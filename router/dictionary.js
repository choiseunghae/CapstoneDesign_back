const express = require('express');
const router = express.Router();
const connection = require('../mysql'); // mysql 모듈을 가져옴
const searchboxRouter = require('./search_box');
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

router.use(bottomRouter); // bottom 미들웨어를 사용합니다.
router.use(searchboxRouter);

router.get('/', (req, res) => {
  connection.query('SELECT * FROM detailpage', (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let html = `
    <ul class="nav">
  <li class="nav-item">
  <a href="#">신조어</a>
  <span class="txt-bar">|</span>
  <a href="#">줄임말</a>
  <span class="txt-bar">|</span>
  <a href="#">합성어</a>
  <span class="txt-bar">|</span>
  <a href="#">유행어</a>
  <span class="txt-bar">|</span>
  <a href="#">초성</a>
  <span class="txt-bar">|</span>
  <a href="#">이모티콘</a>
  <span class="txt-bar">|</span>
  <a href="#">전체</a>
  </li>
</ul>

                  <div class="box">
                  `;

    //데이터를 ㄱ~ㅎ 순으로 정렬
    rows.sort((a, b) => (a.itemName > b.itemName) ? 1 : -1);

    // 데이터를 HTML 형식으로 변환
    for (let row of rows) {
      html += `
                  <ul>
                        <li class="list"><a href="/detail/${row.itemIndex}">${row.itemName}</a>
                        <i class="bi bi-chevron-right"></i>
                        </li>
                  </ul>
                `;


    }

    html += ` </div>
  
          `;

    // HTML 응답 보내기
    res.render('listpage', { list_page: html });
  });
});

module.exports = router;