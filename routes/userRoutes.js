const express = require("express");
const router = express.Router();
const { updateProfile } = require("../controller/user");
const { verifyToken } = require("../middleware/authMiddleware");

router.put("/profile", verifyToken, updateProfile);

module.exports = router;
