const express = require('express');
const {registerUser, authUser} = require('../controller/userControllers')

const router = express.Router();


router.route("/register").post(registerUser);
router.post("/login", authUser);


module.exports = router;