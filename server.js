const express = require('express');
const path = require('path');
const app = express();
const listpageRouter = require('./router/dictionary');
const detailpageRouter = require('./router/detailpage');
const bottomnav_barRouter = require('./router/bottomnav_bar');
const port = 3000;

app.use(express.static(__dirname + "/css"));
app.set('views', path.join(__dirname, 'views')); // 뷰 디렉토리 설정
app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 사용

app.use('/dictionary', listpageRouter, bottomnav_barRouter); // listpageRouter, bottomnav_bar 모듈을 사용
app.use('/detail', detailpageRouter, bottomnav_barRouter); // detailpageRouter bottomnav_bar 모듈을 사용

app.use((req, res) => {
  res.sendFile(__dirname+"/404.html");
});

app.listen(3000,(err) => {
  if(err) return console.log(err);
  console.log("The server is listening on port 3000")
});