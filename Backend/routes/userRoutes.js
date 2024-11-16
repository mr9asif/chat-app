const express = require('express');
const {registerUser, authUser, AllUser} = require('../controller/userControllers')

const router = express.Router();


router.route("/register").post(registerUser);
router.post("/login", authUser);
router.get("/", AllUser)


module.exports = router;