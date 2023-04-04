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
        <div id="profile-photo" class="profile-photo" onclick="onProfilePhotoClick()">
          <!-- 기존 프로필 사진 -->
          <!-- <img src="profile-photo.jpg" alt="프로필 사진"> -->
        </div>
        <div class="loginloginform">
        <form class="hidden" id="login-form">
          <input required maxlength="15" type="text" placeholder="닉네임을 입력하세요" />
        </form>
        <h1 id="username-display">{username}님</h1>
        <input
          id="username-input"
          type="text"
          placeholder="닉네임을 입력하세요"
          maxlength="15"
          class="hidden"

          required
        />
        <button id="edit-btn" onclick="onEditClick()">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <button id="save-btn" class="hidden" onclick="onSaveClick()">
          <i class="bi bi-check-lg"></i>
        </button>
        <!-- 파일 업로드 input 태그 추가 -->
        <input
          id="photo-input"
          type="file"
          accept="image/*"
          class="hidden"
          onchange="onFileSelected(event)"
        />
        </div>
      </div>

    `;

    res.render('mypage', { mypage: html });
  });

});


module.exports = router;

