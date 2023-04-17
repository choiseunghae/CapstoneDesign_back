const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const headerRouter = require('./headernav_bar');
const bottomRouter = require('./bottomnav_bar');

router.use(headerRouter);
router.use(bottomRouter);

router.get('/', (req, res) => {
  const userId = req.session.userIndex;

  if (!req.session.userIndex) {
    return res.redirect('/login');
  }

  connection.query(`SELECT * FROM detailpage WHERE itemIndex IN (SELECT itemIndex FROM mybookmarkpage WHERE userIndex = ${userId})`, (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let html = `<div class="bookmark__word">북마크 단어</div>
    `;


    for (let i = 0; i < rows.length; i++) {

      const row = rows[i];
      const description = row.itemDescription.length > 50 ? row.itemDescription.substring(0, 50) + "..." : row.itemDescription;

      html += `
      <body>
      <div class="list-group rounded-4">
        <div class="list-group-content">
            <div class="list-group__title" style="border-color:var(—color-blue)"><a class="list_name" href="detail/${row.itemIndex}">${row.itemName}</a></div>
            <div class="list-group__icon"><i id="itemIcon" class="bi bi-bookmark-fill" onclick="toggleIcon(this)"></i></div>
        </div>
        <div class="list-group__info">${description}</div>
    </div> 
    </body>
      `;
    }

    html += `</ul>`;
    res.render('bookmark', { bookmark: html });
  });
});


module.exports = router;



