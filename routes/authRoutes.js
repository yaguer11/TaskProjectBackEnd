const express = require("express");
const { register, login, loginInfo } = require("../controller/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", loginInfo);

module.exports = router;
