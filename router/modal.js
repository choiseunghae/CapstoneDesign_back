const express = require('express');
const router = express.Router();
const connection = require('../mysql');



<div class="container"> 
  <div class="popup-wrap" id="popup">
    <div class="popup">	
      <div class="popup-head">	
          <span class="head-title">BYTHEM</span>
      </div>
      <div class="popup-body">	
        <div class="body-content">
          <div class="body-titlebox">
            <h1>Confirm Modal</h1>
          </div>
          <div class="body-contentbox">
            <p> 모달 내용칸 </p>
          </div>
        </div>
      </div>
      <div class="popup-foot"> 
        <span class="pop-btn confirm" id="confirm">확인</span>
        <span class="pop-btn close" id="close">창 닫기</span>
      </div>
    </div>
   </div>
</div>