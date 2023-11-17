const express = require("express");
const jwt = require("jsonwebtoken");
const { otpVerify } = require("./verifyOTP");
const router = express.Router();

router.post("/", otpVerify);
module.exports = router;
