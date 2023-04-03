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
  connection.query('SELECT * FROM detailpage', (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let html = `<div class="bookmark__word">북마크 단어</div>
    `;


    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      html += `<ul class="list-group border-2">
      <li class="list-group-item d-flex" style="border-color:#D0E450"><a href="detail/${row.itemIndex}">${row.itemName}</a>
        <div><i class="bi bi-bookmark-fill" onclick="toggleIcon(this)"></i></div>
      </li>
      </ul>
      `;
    }

    res.render('bookmark', { bookmark: html });
  });

});


module.exports = router;

