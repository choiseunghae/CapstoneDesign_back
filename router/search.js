const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/search', (req, res) => {
  const searchWord = req.body.searchWord;
  connection.query(`SELECT itemIndex FROM words WHERE itemName LIKE '%${searchWord}%'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred');
      return;
    }

    if (rows.length === 0) {
      res.status(404).send('Not found');
      return;
    }

    res.send(rows[0].itemIndex);
  });
});

module.exports = router;