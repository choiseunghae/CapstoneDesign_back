const express = require('express');
const router = express.Router();
const bottomRouter = require('./bottomnav_bar'); // bottomnav_bar.js 파일을 불러옵니다.

router.use(bottomRouter);

router.get('/', (req, res) => {

    let html = `

    <header class="status-setting">
    <div class="status-bar">
      <div onclick="goBack()"><i class="bi bi-arrow-left" style="color: black; font-size:25px;"></i></div>
      <div class="status-bar__coulumn">설정</div>
      <div class="status-bar_coulumn">.</div>
    </div>
    </header>

    <div class="account">계정</div>
    <ul class="userlist">
    <li class="mypage-profile">
    <div class="profile-photo" onclick="onProfilePhotoClick()"></div>
    </li>

    <li class="user">
    <div class="nickname"><a>username 님</a></div>
    <div class="information"><a href="/mypage">내 정보 보기</a>
    <i class="bi bi-chevron-right"></i></div>
    </li>

    </ul>

    <div class="customer">고객지원</div>

    <div class="box">
        <ul>

        <a href="/theme">
        <li class="settinglist">
        <div class="list_icon"><i class="bi bi-pencil-square"></i>
        테마변경</div>
        <i class="bi bi-chevron-right"></i></li></a>

        <a href="#">
        <li class="settinglist">
        <div class="list_icon"><i class="bi bi-trash-fill"></i>
        검색기록삭제</div>
        <i class="bi bi-chevron-right"></i></li></a>

        <a href="#"><li class="settinglist">
        <div class="list_icon"><i class="bi bi-share-fill"></i>
        공유하기</div>
        <i class="bi bi-chevron-right"></i></li></a>

        <a href="#"><li class="settinglist">
        <div class="list_icon"><i class="bi bi-chat-square-text"></i>
        공지사항</div>
        <i class="bi bi-chevron-right"></i></li></a>

        <a href="#"><li class="settinglist">
        <div class="list_icon"><i class="bi bi-arrow-repeat"></i>
        초기화</div>
        <i class="bi bi-chevron-right"></i></li></a>

        <a href="#"><li class="settinglist_last">
        <div class="list_icon"><i class="bi bi-display"></i>
        PC버전</div>
        <i class="bi bi-chevron-right"></i></li></a>

        </ul>
        </div>
        `
    res.render('setting', { setting: html });
});

module.exports = router;