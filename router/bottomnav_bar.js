const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <ul class="nav__form">
                <a href="/bookmark"><li class="nav__list nav__box"><i class="bi bi-bookmark-fill" style="font-size: 2rem; color: black;"></i></li></a>
                <a href="#"><li class="nav__list nav__box"><i class="bi bi-chat-dots-fill" style="font-size: 2rem; color: black;"></i></li></a>
                <a href="/mainpage"><li class="nav__list nav__box"><i class="bi bi-house-door-fill" style="font-size: 2rem; color: black;"></i></li></a>
                <a href="/dictionary"><li class="nav__list nav__box"><i class="bi bi-search" style="font-size: 2rem; color: black;"></i></li></a>
                <a href="/mypage"><li class="nav__list nav__box"><i class="bi bi-person-fill" style="font-size: 2rem; color: black;"></i></li></a>
            </ul>
            
            `;
  
    res.locals.bottom = html;
    next();
  });
  

module.exports = router;