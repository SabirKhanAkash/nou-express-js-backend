const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();
const { createLog } = require("../app/src/modules/appLogs/appLog.service");

let userData = {};

// Verify acl
const acl = async (req, res, next) => {
  let check;
  const accessToken = req.headers.token;
  const refreshToken = req.headers.refresh;

  if (!accessToken || !refreshToken) {
    check = false;
    return res.send({
      token: false,
      message: "Unauthorized access",
    });
  }
  let info = await getUserData(accessToken);
  userData.infos = info;
  const response = await verification(req, accessToken, refreshToken);
  if (response === true) {
    check = true;
  } else {
    check = false;
  }
  if (check === true) {
    next();
  } else {
    res.send({
      token: false,
      message: "Unauthorised user",
    });
  }
};

const verification = async (req, accessToken, refreshToken) => {
  try {
    if (!accessToken || !refreshToken) {
      return false;
    }

    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    req.decoded = decodedAccessToken;

    return true;
  } catch (accessTokenError) {
    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      req.decoded = decodedRefreshToken;

      return true;
    } catch (refreshTokenError) {
      console.log(refreshTokenError);
      return false;
    }
  }
};

const getUserData = async (token) => {
  try {
    const payloads = jwt.decode(token);
    return payloads;
  } catch (error) {
    await createLog(error);
  }
};

module.exports = { acl, userData };
