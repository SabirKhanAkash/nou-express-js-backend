const express = require("express");
const router = express.Router();
const { isUserAuthorized } = require("./userAuthorizationCheck");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");

router.post("/", async (req, res) => {
  try {
    const realLoginAttempt = await isUserAuthorized(req?.body);
    if (realLoginAttempt?.isAuthorized) {
      res.status(200).send({
        status: "Success",
        message: "OTP sent successfully",
      });
    } else {
      res.status(401).send({
        status: "Failed",
        message: "Unauthorised Access",
      });
    }
  } catch (e) {
    await createLog(e);
  }
});

module.exports = router;
