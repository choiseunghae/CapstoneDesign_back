const express = require('express');
const router = express.Router();
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(bottomRouter);

router.get('/', (req, res) => {

    let html = `
    <h1>환경 설정</h1>

    <div class="box">
        <h2></h2>
        <ul>
            <li>테마 변경</li>
            <li>북마크 초기화</li>
            <li>검색 기록 삭제</li>
            <li>맞춤 추천 안내
                <div class="container">
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider"></span>
                    </label>
                </div>
            </li>

            <li>전체 초기화</li>
        </ul>
        </div>

    </div>`
    res.render('setting', { setting: html });
});

module.exports = router;