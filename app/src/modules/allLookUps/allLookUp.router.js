const express = require("express");
const { index, view, create, edit } = require("./allLookUp.controller");
const router = express.Router();

// All AllLookUp route here
router.get("/index", index);
router.get("/view/:type", view);
router.post("/create", create);
router.patch("/edit/:id", edit);

module.exports = router;
