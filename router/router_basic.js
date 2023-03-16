/* 

1번. 새 파일에 아래 코드를 복사해서 붙여넣습니다. 

const express = require('express');
const router = express.Router();
const connection = require('../mysql'); (이건 데이터베이스를 불러오는 모듈입니다. 데이터베이스가 필요없는 페이지라면 굳이 안 넣어도 됩니다.)
const bottomRouter = require('./bottomnav_bar'); 

router.use(bottomRouter); 


2번. 아래 코드를 작성합니다. '/' 링크에 따라 주소값이 달라집니다. ':id' 같은 것을 쓰면 번호에 따라 주소값을 달리 줄 수 있습니다.
router.get('/', (req, res) => {
}

3번. ejs 파일을 작성합니다. 
HTML 구문과 똑같지만 <%= (변수명) %> 을 통해 해당 위치에 js 코드를 입력할 수 있습니다.
<%= %> 는 결과값을 그대로 출력합니다. (만약 HTML 구문이 들어간 코드를 작성하고 이 값으로 출력하면 HTML이 그대로 출력됩니다.)
<%- %> 는 HTML 형태의 값을 렌더링합니다.

4번. 코드 작성 후 마지막에 렌더링 해줍니다.
res.render('(.ejs 파일명)', { (.ejs 파일 안에 들어간 변수 명): html });

5번. server.js 에서 자신이 만든 모듈을 불러옵니다.
const (자신이 만든 모듈명)Router = require('./router/(자신이 만든 모듈 파일명)');


6번. app.use('/(주소값)', (모듈명1), (모듈명2), ...); 을 추가합니다.

*/