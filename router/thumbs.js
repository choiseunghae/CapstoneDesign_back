const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const thumbsnavRouter = require('./thumbsnav_bar');
const bottomRouter = require('./bottomnav_bar');

router.use(thumbsnavRouter);
router.use(bottomRouter);

router.get('/', (req, res) => {
  connection.query('SELECT * FROM detailpage', (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let html = `<div class="thumbs__word">추천 단어</div>
    `;


    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      html += `<ul class="list-group border-2">
      <li class="list-group-item d-flex" style="border-color:var(--color-blue)"><a href="detail/${row.itemIndex}">${row.itemName}</a>
        <div><i class="bi bi-hand-thumbs-up-fill" onclick="toggleIcon(this)"></i></div>
      </li>
      </ul>
      `;
    }

    html += `</ul>`;
    res.render('thumbs', { thumbs: html });
  });
});


module.exports = router;


