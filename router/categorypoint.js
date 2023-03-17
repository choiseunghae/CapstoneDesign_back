const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(bottomRouter); // bottom 미들웨어를 사용합니다.

router.get('/', (req, res) => {
    let html = `
    <div class="mx-auto">
    <button type="button">신조어</button>
    <button type="button">줄임말</button>
    <button type="button">합성어</button>
    <button type="button">유행어</button>
    <button type="button">접미사</button>
    <button type="button">자음</button>
    <button type="button">전체</button>
</div>`

    res.render('mainpage', { category_point : html });
});

module.exports = router;