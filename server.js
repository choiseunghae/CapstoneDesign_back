const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');
const app = express();

const listpageRouter = require('./router/dictionary');
const detailpageRouter = require('./router/detailpage');
const categoryRouter = require('./router/category');
const settingRouter = require('./router/settingpage')
const searchboxRouter = require('./router/search_box');
const QuizRouter = require('./router/quiz');
const bookmarkRouter = require('./router/bookmark');
const headerRouter = require('./router/headernav_bar');
const signupRouter = require('./router/signup');
const loginRouter = require('./router/login');
const mypageRouter = require('./router/mypage');
const searchRouter = require('./router/search');
const themeRouter = require('./router/theme');
const thumbsRouter = require('./router/thumbs');
const thumbsnavRouter = require('./router/thumbsnav_bar');
const bottomRouter = require('./router/bottomnav_bar');
const chatRouter = require("./router/openAi"); // Import the chat router

const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views')); // 뷰 디렉토리 설정
app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 사용

app.use(bottomRouter); //bottom 미들웨어로 등록. 따로 아래 라우터로 지정해줄 필요 없습니다.

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(__dirname + '/css'));

app.use('/detail', express.static(__dirname + '/css'));
app.use('/category', express.static(__dirname + '/css'));
app.use('/dictionary', express.static(__dirname + '/css'));

app.use('/', [searchboxRouter, QuizRouter, searchRouter]); // searchbox, QuizRouter 모듈을 사용
app.use('/category', [categoryRouter, searchboxRouter]); // categoryRouter, searchbox 모듈을 사용
app.use('/dictionary', [listpageRouter, searchboxRouter]); // listpageRouter, searchbox 모듈을 사용
app.use('/detail', [detailpageRouter]); // detailpageRouter,  searchboxRouter모듈을 사용
app.use('/setting', [settingRouter]); // settingRouter 모듈을 사용
app.use('/bookmark', [bookmarkRouter, headerRouter]); // bookmarkRouter, headernav_bar, navitem_bar 모듈을 사용
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use('/mypage', [mypageRouter]);
app.use('/thumbs', [thumbsRouter, thumbsnavRouter]);
app.use('/theme', [themeRouter] );
app.use("/chatbot", chatRouter); // Register the chat router

// 정적 파일을 제공하는 미들웨어 추가
app.use(express.static('CapstoneDesign_back'));

// 파비콘 경로 설정
app.get('/favicon.ico', (req, res) => {
  res.sendFile('views/logo.png', { root: __dirname + '/CapstoneDesign_back' });
});


app.get('/logout', (req, res) => {
  req.session.destroy(); // 세션 제거
  res.clearCookie('authToken'); // 쿠키 제거
  res.redirect('/'); // 메인 페이지로 리다이렉트
});

app.use(express.static(path.join(__dirname, 'router')));

app.listen(port,(err) => {
  if(err) return console.log(err);
  console.log("The server is listening on port")
});

