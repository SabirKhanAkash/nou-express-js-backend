const express = require("express");
const { index, view, create, edit } = require("./user.controller");
const router = express.Router();

// All user route here
router.get("/index", index);
router.get("/view/:id", view);
router.post("/create", create);
router.patch("/edit/:id", edit);

module.exports = router;
