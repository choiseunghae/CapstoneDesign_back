const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const app = express();
const path = require('path'); // path 모듈 추가

var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : '963472',
database : 'dictionary'
});

app.use(express.static(path.join(__dirname, 'css')));

app.get('/list', (req, res) => {
    connection.query('SELECT * FROM detailpage', (err, rows) => {
      if (err) throw err;
  
      let html = `
        <html>
          <head>
            <title>사전 검색</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
              }
              h1 {
                font-size: 24px;
              }
              p {
                margin: 0;
                padding: 10px;
                background-color: #D0E450;
              }
            </style>
          </head>
          <body>
            <h1>사전 검색</h1>
      `;
  
      // 데이터를 HTML 형식으로 변환
      for (let row of rows) {
        html += `<p><a href="/detail/${row.itemIndex}">${row.itemName} - ${row.itemDescription} - ${row.itemDescription2}</a></p>`;
      }
      
  
      html += `
          </body>
        </html>
      `;
  
      // HTML 응답 보내기
      res.send(html);
    });
  });

  app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
  
    // 데이터베이스에서 검색어를 포함하는 아이템 조회
    connection.query(`SELECT * FROM detailpage WHERE itemName LIKE '%${searchQuery}%'`, (err, rows) => {
      if (err) throw err;
  
      let html = '<h1 style="font-size: 40px;">검색 결과</h1>';
  
      // 검색 결과를 HTML 형식으로 변환
      for (let row of rows) {
        html += `
          <div class="box" style="border: 4px solid #D0E450; margin-top: 30px;">
            <h1 style="font-size: 40px;">${row.itemName}</h1>
            <p style="font-size: 25px; margin-top: 20px;">${row.itemDescription}</p>
            <p style="font-size: 25px; margin-top: 20px;">${row.itemDescription2}</p>
          </div>
        `;
      }
  
      // HTML 응답 보내기
      res.send(html);
    });
  });
  
  app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM detailpage WHERE itemIndex = '${id}'`, (err, rows) => {
      if (err) throw err;
  
      let html = `` 

  
      // 데이터를 HTML 형식으로 변환
      for (let row of rows) {
        html += `
          <div class="box" style="border: 4px margin-top: 30px;">
            <h1 style="font-size: 40px;">${row.itemName}</h1>
            <ul>
            <h2>뜻</h2>
              <li style="font-size: 25px; margin-top: 20px;">
              ${row.itemDescription}</li>
            <div class="line" style=" border: 4px solid #D0E450; margin: 30px 0px 30px 0px;"></div>
            <h2>예시</h2>
              <li style="font-size: 25px; margin-top: 20px;">
              ${row.itemDescription2}</li>
            </ul>
          </div>
        `;
      }
  
      // HTML 응답 보내기
      res.send(html);
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
