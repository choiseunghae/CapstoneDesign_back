const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <header class="status-bookmark">
    <div class="status-bar">
      <div onclick="goBack()"><i class="bi bi-arrow-left " style="color: black; font-size:25px;"></i></div>
      <div class="status-bar__coulumn">북마크</div>
      <div class="status-bar__coulumn"><a href="setting" class="status-bar__link"><i class="bi bi-gear-fill fs-4"></i></a></div>
  </div>
  </header>

  <div class="my-4 nav-item-bar">
    <div class="nav-item active" onclick="changeColor(this)"><a href="bookmark"><i class="bi bi-bookmark-fill"></i></a></div>
    <div class="nav-item" onclick="changeColor(this)"><a href="thumbs"><i class="bi bi-hand-thumbs-up-fill"></i></a></div>
    </div> 
            `;
    
    res.locals.header = html;
    next();
  });

module.exports = router;