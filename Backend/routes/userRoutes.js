const express = require('express');
const {registerUser, authUser, AllUser, getCurrentChatters} = require('../controller/userControllers');
const isLogin = require('../MiddleWare/Islogin');

const router = express.Router();


router.route("/register").post(registerUser);
router.post("/login", authUser);
router.get("/search", AllUser);
router.get('/currentchattes',isLogin, getCurrentChatters)


module.exports = router;