const express = require('express');
const router = express.Router();
const connection = require('../mysql'); // mysql 모듈을 가져옴
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(bottomRouter); // bottom 미들웨어를 사용합니다.

router.get('/', (req, res) => {
    connection.query('SELECT * FROM detailpage', (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }
      let html = `
              <head>
               </head>
                  <div class="box">
                  `;
  
      //데이터를 ㄱ~ㅎ 순으로 정렬
      for (let row of rows) {
        rows.sort((a, b) => (a.itemName > b.itemName) ? 1 : -1);
      }
      // 데이터를 HTML 형식으로 변환
      for (let row of rows) {
        html += `
                  <ul>
                      <li>
                        <a href="/detail/${row.itemIndex}">${row.itemName}</a>
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