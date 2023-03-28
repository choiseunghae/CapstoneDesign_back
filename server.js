const express = require('express');
const path = require('path');
const app = express();
const mainpageRouter = require('./router/categorypoint');
const listpageRouter = require('./router/dictionary');
const detailpageRouter = require('./router/detailpage');
const categoryRouter = require('./router/category');
const settingRouter = require('./router/settingpage')
const searchboxRouter = require('./router/search_box');
const bottomRouter = require('./router/bottomnav_bar');
const QuizRouter = require('./router/quiz');
const port = 3000;

app.set('views', path.join(__dirname, 'views')); // 뷰 디렉토리 설정
app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 사용

app.use(searchboxRouter);
app.use(bottomRouter);

app.use(express.static(__dirname + '/css'));
app.use('/detail', express.static(__dirname + '/css'));

app.use('/mainpage', [mainpageRouter, bottomRouter, searchboxRouter]); // mainpageRouter, bottomnav_bar, searchbox 모듈을 사용
app.use('/category', [categoryRouter, bottomRouter, searchboxRouter]); // categoryRouter, bottomnav_bar, searchbox 모듈을 사용
app.use('/dictionary', [listpageRouter, bottomRouter, searchboxRouter]); // listpageRouter, bottomnav_bar, searchbox 모듈을 사용
app.use('/detail', [detailpageRouter, bottomRouter, searchboxRouter]); // detailpageRouter bottomnav_bar 모듈을 사용
app.use('/setting', [settingRouter, bottomRouter]); // settingRouter bottomnav_bar 모듈을 사용
app.use('/quiz', [QuizRouter]);

app.use((req, res) => {
  res.sendFile(__dirname+"/404.html");
});


app.listen(3000,(err) => {
  if(err) return console.log(err);
  console.log("The server is listening on port 3000")
});
