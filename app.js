const express = require("express");
require("dotenv").config();
const app = express();
var cors = require("cors");
const userRouter = require("./app/src/modules/users/user.router");
const regenerateToken = require("./auth/otpVerify.router");
const otpVerifyRouter = require("./auth/otpVerify.router");
const loginRouter = require("./auth/login.router");
const ticketRouter = require("./app/src/modules/ticket/ticket.router");
const allLookUpRouter = require("./app/src/modules/allLookUps/allLookUp.router");
const { acl } = require("./auth/permission");

app.use(express.json());
app.use(cors());

app.use("/internal/users", userRouter);
app.use("/login", loginRouter);
app.use("/verify-otp", otpVerifyRouter);
app.use("/internal/ticket", ticketRouter);

require("./queueTasks/bullmq.js");
require("./queueTasks/generateTicket.js");
require("./queueTasks/invalidateTicket.js");
require("./queueTasks/worker.js");

// ACL verification
app.use(acl);

app.use("/users", userRouter);
app.use("/ticket", ticketRouter);
app.use("/all-lookup", allLookUpRouter);

module.exports = app;
