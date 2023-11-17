const express = require("express");
const { index, view, create, edit } = require("./user.controller");
const router = express.Router();

// All user route here
router.post("/index", index);
router.post("/view/:id", view);
router.post("/create", create);
router.put("/edit/:id", edit);

module.exports = router;
