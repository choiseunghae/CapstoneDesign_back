const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <div class="my-4 nav-item-bar">
    <div class="nav-item active" onclick="changeColor(this)"><a href="bookmark"><i class="bi bi-bookmark-fill"></i></a></div>
    <div class="nav-item" onclick="changeColor(this)"><a href="thumbs"><i class="bi bi-hand-thumbs-up-fill"></i></a></div>
    </div> 
            `;
    
    //* 북마크&추천 nav바 *//
      function changeColor(navItem) {
        // 모든 Nav 아이템의 active 클래스 제거
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
          
        // 클릭한 Nav 아이템에 active 클래스 추가
        navItem.classList.add('active');
        }
  
    res.locals.navitem = html;
    next();
  });
  

module.exports = router;