import express from 'express';
import {
    authUser,
    getCurrentChatters,
    getUserBySearch,
    logOut,
    registerUser
} from '../controller/userControllers.js';
import isLogin from '../MiddleWare/Islogin.js';

const router = express.Router();


router.route("/register").post(registerUser);
router.post("/login", authUser);
router.get("/search",isLogin, getUserBySearch);
router.get('/currentchattes',isLogin, getCurrentChatters)
router.post("/", logOut)

export default router;