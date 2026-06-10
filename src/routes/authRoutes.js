const express = require("express");
const router = express.Router()
const protect = require("../middleware/authMiddleware");

const { register, login, sentOtp, verifyOtp, createPin, loginWithPin } = require("../controllers/authController")

router.post("/register", register)
router.post("/login", login);
router.post("/send-otp", sentOtp)
router.post("/verify-otp", verifyOtp)
router.post("/create-pin", protect, createPin)
router.post("/login-pin", loginWithPin)

module.exports = router;