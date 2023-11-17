const jwt = require("jsonwebtoken");
const { isUserAuthorized } = require("./userAuthorizationCheck");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");

// Create new jwt
const createJwtToken = async (req, res) => {
  try {
    const realLoginAttempt = await isUserAuthorized(req.headers.phone_no);
    if (realLoginAttempt.isAuthorized) {
      res.send({
        status: "Success",
        message: "OTP sent successfully",
      });
    } else {
      res.send({
        status: "Failed",
        message: "Unauthorised User",
      });
    }
  } catch (e) {
    await createLog(e);
  }
};

module.exports = { createJwtToken };
