const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `<nav class="nav_form">
      <ul class="nav__list">
        <li class="nav__btn"><a class="nav__link" href="/"><i class="bi bi-bookmark-fill"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="#"><i class="bi bi-chat-dots-fill"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="/mainpage"><i class="bi bi-house-door-fill"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="/dictionary"><i class="bi bi-search"></i></a></li>
        <li class="nav__btn"><a class="nav__link" href="/"><i class="bi bi-person-fill"></i></a></li>
      </ul>
      </nav>`;
  
    res.locals.bottom = html;
    next();
  });
  

module.exports = router;