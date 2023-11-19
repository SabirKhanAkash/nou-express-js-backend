const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const twilio = require("twilio");
const { createLog } = require("../app/src/modules/appLogs/appLog.service");
const User = require("../app/src/modules/users/user.model");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twillioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const generateOTP = async (phone_no) => {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone_no, "BD");
    if (phoneNumber && phoneNumber.isValid()) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      await User.updateOne(
        {
          phone_no: phone_no,
        },
        {
          $set: {
            otp: otp,
          },
        },
      );
      return new Promise((resolve, reject) => {
        client.messages
          .create({
            body: `Your OTP code is ${otp}`,
            from: twillioPhoneNumber,
            to: "+88" + phone_no,
          })
          .then((message) => {
            resolve("OTP sent successfully!");
          })
          .catch((err) => {
            console.error(err);
            reject("Failed to send OTP");
          });
      });
    }
  } catch (e) {
    createLog(e);
  }
};

module.exports = { generateOTP };
