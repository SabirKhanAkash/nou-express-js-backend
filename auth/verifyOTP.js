const jwt = require("jsonwebtoken");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");
const User = require("../app/src/modules/users/user.model");

// Create new jwt
const otpVerify = async (req, res) => {
  try {
    const userData = {
      phone_no: req.headers.phone_no,
      otp: req.headers.otp,
    };
    const user = await User.findOne({ phone_no: userData.phone_no });

    if (user.otp === userData.otp) {
      const authToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "744h",
      });
      const refreshToken = jwt.sign(
        userData,
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "744h",
        },
      );
      res.send({
        authToken: authToken,
        refreshToken: refreshToken,
        user: user,
        status: "Success",
        message: "OTP matched & login successful",
      });
    } else {
      res.send({ status: "Failed", message: "otp not matched" });
    }
  } catch (e) {
    await createLog(e);
  }
};

module.exports = { otpVerify };
