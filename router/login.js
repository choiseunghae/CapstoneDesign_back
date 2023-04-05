const express = require('express');
const router = express.Router();
const connection = require('../mysql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const usernickname = req.body.usernickname;

    // 데이터베이스에서 회원 정보 조회
    connection.query("SELECT * FROM users WHERE usernickname = ?", [usernickname], (error, result) => {
        if (error) throw error;
        if (result.length === 1) {
            // 로그인 성공
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
            req.session.usernickname = usernickname; // 세션에 유저 정보 저장
            res.redirect("/mainpage");
        } else {
            res.redirect('/signup-prompt');
            res.render('signup-prompt', { message: '회원가입을 하시겠습니까?' });
        }
    });
});

router.post('/signup-prompt', (req, res) => {
    const answer = req.body.answer;
    if (answer === '네') {
        res.redirect('/signup');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
