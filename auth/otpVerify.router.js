const express = require("express");
const jwt = require("jsonwebtoken");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");
const User = require("../app/src/modules/users/user.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      phone_no: req?.body?.phoneNo,
      is_active: true,
    })
      .select(
        "-_id approval_status app_version dob otp phone_no role username village",
      )
      .lean();

    if (user?.otp === req?.body?.otp) {
      const authToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({
        authToken: authToken,
        refreshToken: refreshToken,
        user: user,
        status: "Success",
        message: "OTP matched & login successful",
      });
    } else {
      res.status(403).send({ status: "Failed", message: "otp not matched" });
    }
  } catch (e) {
    await createLog(e);
    res
      .status(500)
      .send({ status: "Failed", message: "An internal server error occurred" });
  }
});

module.exports = router;
