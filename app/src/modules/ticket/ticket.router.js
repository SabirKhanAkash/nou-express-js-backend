const express = require("express");
const { index, view, create, edit, search } = require("./ticket.controller");
const router = express.Router();

// All user route here
router.post("/index", index);
router.post("/view/:id", view);
router.post("/create", create);
router.put("/edit/:id", edit);
router.post("/search", search);

module.exports = router;
