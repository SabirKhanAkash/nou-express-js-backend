const express = require("express");
const jwt = require("jsonwebtoken");
const { createJwtToken } = require("./createJWT");
const router = express.Router();

router.post("/", createJwtToken);
module.exports = router;
