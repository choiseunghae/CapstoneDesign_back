const express = require('express');
const listpagerouter = require('./listpagerouter'); // listpagerouter 모듈을 가져옴
const router = express.Router();

server.get('/dictionary', (req, res) => {
    listpagerouter.query('SELECT * FROM detailpage', (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }
  
      let html = `
          <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                  }
                
                  h1 {
                    font-size: 40px;
                  }
                
                  a {
                    text-decoration: none;
                  }
                
                  a:visited {
                    color: inherit;
                  }
                
                  a:focus {
                    outline: none;
                  }
                  
                
                  p {
                    margin: 0;
                    padding: 0px;
                    background-color: #D0E450;
                  }
                
                  .box {
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    margin: 0 auto;
                    width : 80vh;
                    height: 80vh;
                    overflow: auto;
                  }
                
                  .box ul
                  {
                    position:relative;
                    background: #fff;
                    margin: 0 auto;
                    width : 100vh;
                    justify-content: left;
                  }
                
                  .box ul li {
                    padding: 10px;
                    list-style: none;
                    background: #fff;
                    box-shadow: 0 5px 25px rgba(0,0,0,.1);
                    transition: transform 0.5s;
                  }
                
                  .box ul li:hover
                  {
                    z-index: 100;
                    background: #D0E450;
                    box-shadow: 0 5px 25px rgba(0,0,0,.2);
                    color:#fff;
                  }
                </style>
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
  
          </html>
          `;
  
      // HTML 응답 보내기
      res.send(html);
    });
  });

  module.exports = router;