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
  const createdAt = new Date(); 

  connection.query("INSERT INTO users (usernickname, createdAt) VALUES (?, ?)", [usernickname, createdAt], (error, result) => {
    if (error) throw error;
    console.log("New user registered:", usernickname, "at", createdAt);
    res.redirect("/mainpage");
  });
});

module.exports = router;
