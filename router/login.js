const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/', (req, res) => {
    if (req.session.usernickname) {
        return res.redirect('/mypage');
    }
    res.render('login');
});

router.post('/', (req, res) => {
    const usernickname = req.body.usernickname;
    const password = req.body.password;

    // 닉네임과 비밀번호가 입력되었는지 확인합니다.
    if (!usernickname || !password) {
        return res.json({ success: false, message: '닉네임과 비밀번호를 입력해주세요.' });
    }

    connection.query("SELECT * FROM users WHERE usernickname = ? AND password = ?", [usernickname, password], (error, result) => {
        if (error) throw error;
        if (result.length === 1) {
            // 로그인 성공
            const userIndex = result[0].userIndex; // userIndex 추출
            const authToken = generateAuthToken(); // 인증 토큰 생성

            function generateAuthToken() {
                let authToken = '';
                const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                // 랜덤한 문자열을 32자 생성
                for (let i = 0; i < 32; i++) {
                    authToken += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
                }

                return authToken;
            }

            res.cookie('authToken', authToken, { maxAge: 86400000, httpOnly: true }); // 쿠키에 인증 토큰 저장
            req.session.userIndex = userIndex; // 세션에 userIndex 저장
            req.session.usernickname = usernickname; // 세션에 usernickname 저장
            res.json({ success: true });
        } else {
            res.json({ success: false, message: '회원 정보가 다릅니다.' });
        }
    });
});

module.exports = router;
