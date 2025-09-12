const express = require("express");
const router = express.Router();
const { createLog } = require("../app/src/modules/appLogs/appLog.service");

router.post("/", async (req, res) => {
  try {
    res.status(200).send({
      status: "Success",
      message: "Access Token Refreshed",
    });
  } catch (e) {
    await createLog(e);
    return res
      .status(500)
      .send({ status: "Failed", message: "Internal server error" });
  }
});

module.exports = router;
