const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <header class="status-thumbs">
    <div class="status-bar">
      <div onclick="goBack()"><i class="bi bi-arrow-left " style="color: black; font-size:25px;"></i></div>
      <div class="status-bar__coulumn">추천</div>
      <div class="status-bar__coulumn"><a href="setting" class="status-bar__link"><i class="bi bi-gear-fill fs-4" style="color: black; font-size:25px;"></i></a></div>
  </div>
  </header>

  <div class="my-4 nav-item-bar">
    <div class="nav-item" onclick="changeColor(this)"><a href="/bookmark"><i class="bi bi-bookmark-fill"></i></a></div>
    <div class="nav-item active" onclick="changeColor(this)"><a href="/thumbs"><i class="bi bi-hand-thumbs-up-fill"></i></a></div>
  </div>
            `;
    
    res.locals.thumbsnav = html;
    next();
  });

module.exports = router;