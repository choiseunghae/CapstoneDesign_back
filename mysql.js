var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '963472',
  database: 'dictionary'
});

connection.connect();

connection.query('SELECT * FROM detailpage', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});


module.exports = connection;


/* const mysql = require('promise-mysql');
const fs = require('fs');

// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of MySQL.
const createTcpPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const dbConfig = {
    host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
    port: process.env.DB_PORT, // e.g. '3306'
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    // ... Specify additional properties here.
    ...config,
  };
  // Establish a connection to the database.
  return mysql.createPool(dbConfig);
};  */
/* server.get('/dictionary', (req, res) => {
  connection.query('SELECT * FROM detailpage', (err, rows) => {
    if (err) throw err;

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
*/

// detailpage를 구성해 id 값을 기준으로 단어를 보여줌.
/* app.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM detailpage WHERE itemIndex = '${id}'`, (err, rows) => {
    if (err) throw err;

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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

*/


// search.js를 따로 만들 예정입니다.
/*
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

*/