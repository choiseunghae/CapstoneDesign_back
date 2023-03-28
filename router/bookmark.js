const express = require('express');
const router = express.Router();
const bottomRouter = require('./bottomnav_bar');

router.use(bottomRouter);

router.use((req, res, next) => {
    let html=`
    <header class="status-bookmark">
    <div class="status-bar">
      <div onclick="goBack()"><i class="bi bi-arrow-left " style="color: black; font-size:25px;"></i></div>
      <div class="status-bar__coulumn">북마크</div>
      <div class="status-bar__coulumn"><a href="setting" class="status-bar__link"><i class="bi bi-gear-fill fs-4" style="color: black; font-size:25px;"></i></a></div>
  </div>
  </header>`




    const words = ['북마크단어1', '북마크단어2', '북마크단어3', '북마크단어4', '북마크단어5', '북마크단어6', '북마크단어7', '북마크단어8', '북마크단어9', '북마크단어10'];

const ul = document.createElement('ul');
ul.classList.add('list-group', 'border-2');

for (let i = 0; i < words.length; i++) {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  li.style.borderColor = '#D0E450';

  const a = document.createElement('a');
  a.href = 'word';
  a.style.fontSize = '14px';
  a.textContent = words[i];

  const div = document.createElement('div');

  const iElem = document.createElement('i');
  iElem.classList.add('bi', 'bi-bookmark-fill');
  iElem.addEventListener('click', toggleIcon);

  div.appendChild(iElem);
  li.appendChild(a);
  li.appendChild(div);
  ul.appendChild(li);
}

document.querySelector('.d-flex').appendChild(ul);











    res.render('bookmark', { bookmark: html });
    next();
  });
  

module.exports = router;

