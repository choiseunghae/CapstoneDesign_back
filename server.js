const express = require('express');
const dictionaryRouter = require('./dictionary'); // dictionary 모듈을 가져옴
const detailpageRouter = require('./detailpage'); // detailpage 모듈을 가져옴
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/css"));

app.use('/dictionary', dictionaryRouter); // dictionary 모듈을 사용

app.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  listpagerouter.query(`SELECT * FROM detailpage WHERE itemIndex = '${id}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }

    let html = `<html>
    <head>
      <style>
      
      .h1 {
        font-size: 40px;
      }

      .box{
        border: 4px;
        margin-top: 30px;
      }

      li {
        ont-size: 25px;
        margin-top: 20px;
        list-style: none;
      }

      .line {
        border: 4px solid #D0E450;
        margin: 30px 0px 30px 0px;
      }

      </style>
    </head>
      `


    // 데이터를 HTML 형식으로 변환
    for (let row of rows) {
      html += `
          <div class="box">
            <h1 style=>${row.itemName}</h1>
            <ul>
            <h2>뜻</h2>
              <li>
              ${row.itemDescription}</li>
            <div class="line"></div>
            <h2>예시</h2>
              <li>
              ${row.itemDescription2}</li>
            </ul>
          </div>
        `;
    }

    // HTML 응답 보내기
    res.send(html);
  });
});

app.use((req, res) => {
  res.sendFile(__dirname+"/404.html");
});

app.listen(3000,(err) => {
  if(err) return console.log(err);
  console.log("The server is listening on port 3000")
});