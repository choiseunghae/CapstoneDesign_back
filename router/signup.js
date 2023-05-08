const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  const usernickname = req.body.usernickname;
  const password = req.body.password;
  const createdAt = new Date(); 
  const image = null;

  connection.query("INSERT INTO users (usernickname, password, createdAt, userImage) VALUES (?, ?, ?, ?)", [usernickname, password, createdAt, image], (error, result) => {
    if (error) throw error;
    res.redirect("/login");
  });
});

module.exports = router;
