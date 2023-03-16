const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `<nav class="nav_form">
      <ul class="nav__list">
        <li class="nav__btn"><a class="nav__link" href="/bookmark"><i class="bi bi-bookmark-fill" style="font-size: 2rem;"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="/mainpage"><i class="bi bi-house-door-fill" style="font-size: 2rem;"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="/word"><i class="bi bi-search" style="font-size: 2rem;"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="/mypage"><i class="bi bi-person-fill" style="font-size: 2rem;"></i></a></li>
      </ul>
    </nav>`;
  
    res.locals.bottom = html;
    next();
  });
  

module.exports = router;