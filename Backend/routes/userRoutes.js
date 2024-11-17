const express = require('express');
const {registerUser, authUser, AllUser, getCurrentChatters, logOut, getUserBySearch} = require('../controller/userControllers');
const isLogin = require('../MiddleWare/Islogin');

const router = express.Router();


router.route("/register").post(registerUser);
router.post("/login", authUser);
router.get("/search",isLogin, getUserBySearch);
router.get('/currentchattes',isLogin, getCurrentChatters)
router.post("/", logOut)


module.exports = router;