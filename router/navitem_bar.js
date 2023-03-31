const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    let html = `
    <div class="my-4 nav-item-bar">
    <div class="nav-item active" onclick="changeColor(this)"><a href="bookmark"><i class="bi bi-bookmark-fill"></i></a></div>
    <div class="nav-item" onclick="changeColor(this)"><a href="thumbs"><i class="bi bi-hand-thumbs-up-fill"></i></a></div>
    </div> 
            `;
  
    res.locals.navitem = html;
    next();
  });
  

module.exports = router;