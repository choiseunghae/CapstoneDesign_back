const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const headerRouter = require('./headernav_bar');
const navitemRouter = require('./navitem_bar');
const bottomRouter = require('./bottomnav_bar'); 


router.use(headerRouter);
router.use(bottomRouter); 
router.use(navitemRouter); 


router.use((req, res, next) => {
    let html=`<div class="my-2 p-3">      
    <div class="bookmark d-flex justify-content-between">
      <div class="bookmark__word">북마크 단어</div>
     </div>
    `;
    
    var listItems = $('.list-group-item');

    for (var i = 0; i < listItems.length; i++) {
      var listItem = listItems[i];
      var link = $(listItem).children('a');
      console.log(link.text());

      html +=`<ul class="list-group border-2">
      <li class="list-group-item d-flex" style="border-color:#D0E450"><a href="word">
      ${row.itemName}</a>
        <div><i class="bi bi-bookmark-fill" onclick="toggleIcon(this)"></i></div>
      </li>
      `;
    }

//** 북마크 설정 및 해제 **//
function toggleIcon(icon) {
  if (icon.classList.contains('bi-bookmark-fill')) {
    // 북마크가 설정되었을 경우 해제하기
    icon.classList.remove('bi-bookmark-fill');
    icon.classList.add('bi-bookmark');
  } else {
    // 북마크가 해제되었을 경우 설정하기
    icon.classList.remove('bi-bookmark');
    icon.classList.add('bi-bookmark-fill');
  }
}

module.exports = router;


  
            
            

              














    res.render('bookmark', { bookmark: html });
    next();
  });
  

module.exports = router;

