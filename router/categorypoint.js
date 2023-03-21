const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(bottomRouter); // bottom 미들웨어를 사용합니다.

router.get('/', (req, res) => {
    let html = `
    <div class="mx-auto" style="text-decoration: none;">
    <button type="button" onclick="show01()" class="btn btn-light">신조어</button>
    <button type="button" onclick="show02()" class="btn btn-light">줄임말</button>
    <button type="button" onclick="show03()" class="btn btn-light">합성어</button>
    <button type="button" onclick="show04()" class="btn btn-light">유행어</button>
    <button type="button" onclick="show05()" class="btn btn-light">초성</button>
    <button type="button" onclick="show06()" class="btn btn-light">이모티콘</button>
    <button type="button" class="btn btn-light"><a href="category">전체</a></button>
</div>`

function showword(){
    console.log("버튼 검색 뜸");
}
function show01(){
    console.log("01카테고리고 가욤");
}
function show02(){
    console.log("02카테고리고 가욤");
}

    res.render('mainpage', { category_point : html });
});

module.exports = router;