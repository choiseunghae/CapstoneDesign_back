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
            `;
    
     //** 이전 페이지로 돌아가기 **//
      function goBack() {
        window.history.back();
      } 
  
    res.locals.header = html;
    next();
  });

module.exports = router;