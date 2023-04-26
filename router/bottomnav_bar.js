const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <ul class="nav__form">
                <a href="/bookmark">
                <li class="nav__list">
                <div><i class="bi bi-bookmark-fill"></i></div>
                <span class="text">북마크</span></li></a>

                <a href="/chat">
                <li class="nav__list">
                <div><i class="bi bi-chat-dots-fill"></i></div>
                <span class="text">채팅</span></li></a>

                <a href="/">
                <li class="nav__list">
                <div><i class="bi bi-house-door-fill"></i></div>
                <span class="text">홈</span></li></a>

                <a href="/dictionary">
                <li class="nav__list">
                <div><i class="bi bi-search"></i></div>
                <span class="text">검색</span></li></a>

                <a href="/mypage">
                <li class="nav__list">
                <div><i class="bi bi-person-fill"></i></div>
                <span class="text">마이페이지</span></li></a>
            </ul>
            
            `;
  
    res.locals.bottom = html;
    next();
  });
  

module.exports = router;