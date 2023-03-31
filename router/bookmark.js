const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const headerRouter = require('./headernav_bar');
const navitemRouter = require('./navitem_bar');
const bottomRouter = require('./bottomnav_bar'); 


router.use(headerRouter);
router.use(bottomRouter); 
router.use(navitemRouter); 

router.get('/', (req, res) => {
    let html=`<div class="my-2 p-3">      
    <div class="bookmark d-flex justify-content-between">
      <div class="bookmark__word">북마크 단어</div>
     </div>
    `;

    
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      html +=`<ul class="list-group border-2">
      <li class="list-group-item d-flex" style="border-color:#D0E450"><a href="word">
      ${row.itemName}</a>
        <div><i class="bi bi-bookmark-fill" onclick="toggleIcon(this)"></i></div>
      </li>
      `;
    }

    res.render('bookmark', { bookmark: html });

  });
  

module.exports = router;

