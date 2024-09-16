const express = require("express");
const { index, view, create, edit, search } = require("./ticket.controller");
const router = express.Router();

// All Ticket route here
router.get("/index", index);
router.get("/view/:id", view);
router.post("/create", create);
router.patch("/edit/:id", edit);
router.get("/search", search);

module.exports = router;
