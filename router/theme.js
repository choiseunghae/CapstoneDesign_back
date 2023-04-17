const express = require('express');
const router = express.Router();
const bottomRouter = require('./bottomnav_bar'); 

router.use(bottomRouter); 

router.get('/', (req, res) => {
  res.render('theme');
});

module.exports = router;