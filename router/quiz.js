const express = require('express');
const router = express.Router();
const connection = require('../mysql'); // mysql 모듈을 가져옴

router.use((req, res) => {
    connection.query(`SELECT * FROM detailpage`, (err, rows) => {
        if (err) {
          console.log(err);
          res.send('Error occurred');
          return;
        }

    let html = `
    <div> Quiz </div>
      `;

      var quiz = Math.floor((Math.random()*rows.itemIndex)+1);

      html += `
      <h1>${row.itemName}</h1>
      `
  
    });
      res.render('quiz', { quiz: html });
  });
  

module.exports = router;