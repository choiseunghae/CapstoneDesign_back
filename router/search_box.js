const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  let html = `
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  
    <form action="/search" method="GET" class="search_box-form">
            <div class="search_box">
                <input id="searchWord" name="searchWord" class="search_box-input" type="text" maxlength="225" tabindex="1" />
                <button id="searchBtn" class="search_box-button" type="submit" tabindex="2">
                    <i class="bi bi-search"></i>
                </button>
            </div>
    </form>
      `;

  res.locals.searchbox = html;
  next();
});


module.exports = router;