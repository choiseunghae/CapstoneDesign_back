const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const bottomRouter = require('./bottomnav_bar');

router.use(bottomRouter);

router.get('/', (req, res) => {
  connection.query('SELECT * FROM detailpage', (err, rows) => {
    if (err) {
      console.log(err);
      res.send('Error occurred');
      return;
    }
    let html = `

    <div class="status-bar">
        <div class="status-bar__coulumn"><i class="bi bi-arrow-left" onclick="goBack()" style="font-size: 25px;"></i>
        </div>
        <div class="status-bar__coulumn"><i class="bi bi-person-circle" style="font-size: 25px;"></i></div>
        <div class="status-bar__coulumn"><a href="setting" class="status-bar__link"><i class="bi bi-gear-fill" style="font-size: 25px;"></i></a></div>
    </div>
    <div class="mypage-profile">
        <div id="profile-photo" class="profile-photo">
        </div>
        <div id="profile-nickname" class="profile-nickname"><h2>Guest님</h2>
        </div>  
    </div>
    
    <div class="mypage_btn">
    <div class="mypage_like_btn"><a href="bookmark"><i class="bi bi-bookmark-fill"></i><span>( )개</span></a></div>
    <div class="mypage_like_btn"><a href="thumbs"><i class="bi bi-hand-thumbs-up-fill"></i><span>( )개</span></a></div>
</div>

<div class="mypage_btn_list">
<a href="" class="changenickname"><input type="button" value="닉네임 변경" class="nicknamechange"></a>
<a href="" class="changepassword"><input type="button" value="비밀번호 변경" class="passwordchange"></a>
</div>
    `;

    res.render('mypage', { mypage: html });
  });

});


module.exports = router;

