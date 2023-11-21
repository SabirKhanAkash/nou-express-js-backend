const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./app/src/modules/users/user.router");
const otpVerifyRouter = require("./auth/otpVerify.router");
const loginRouter = require("./auth/login.router");
const ticketRouter = require("./app/src/modules/ticket/ticket.router");
const generateTicket = require("./scheduledCalls/generateTicket.js");
const { acl } = require("./auth/permission");

app.use(express.json());
app.use(cors());

app.use("/internal/users", userRouter);
app.use("/login", loginRouter);
app.use("/otp-verify", otpVerifyRouter);
app.use("/internal/ticket", ticketRouter);

generateTicket;

// ACL verification
app.use(acl);

app.use("/users", userRouter);
app.use("/ticket", ticketRouter);

module.exports = app;
