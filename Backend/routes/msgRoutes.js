const {sendMsg, getMsg} = require("../controller/massege");
const isLogin = require("../MiddleWare/Islogin");

const express = require("express");

const router = express.Router();

router.post('/send/:id', sendMsg)
router.get('/:id', getMsg)

module.exports = router;

