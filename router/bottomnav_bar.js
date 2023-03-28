const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <ul class="nav__form">
                <li class="nav__list"><a href="bookmark"><i class="bi bi-bookmark-fill" style="font-size: 2rem; color: black;"></i></a></li>
                <li class="nav__list"><a href="#"><i class="bi bi-chat-dots-fill" style="font-size: 2rem; color: black;"></i></a></li>
                <li class="nav__list"><a href="mainpage"><i class="bi bi-house-door-fill" style="font-size: 2rem; color: black;"></i></a></li>
                <li class="nav__list"><a href="word"><i class="bi bi-search" style="font-size: 2rem; color: black;"></i></a></li>
                <li class="nav__list"><a href="mypage"><i class="bi bi-person-fill" style="font-size: 2rem; color: black;"></i></a></li>
            </ul>
            
            `;
  
    res.locals.bottom = html;
    next();
  });
  

module.exports = router;