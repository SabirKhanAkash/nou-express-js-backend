const mongoose = require("mongoose");
const package = require("../../../../package.json");
const version = package.version;

// create user schema
const userSchema = new mongoose.Schema({
  phone_no: {
    type: String,
  },
  otp: {
    type: String,
    default: null,
  },
  username: {
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
  village: {
    type: String,
  },
  dob: {
    type: String,
  },
  created_date: {
    type: String,
    default: new Date(),
  },
  created_by: {
    type: String,
  },
  updated_date: {
    type: String,
    default: null,
  },
  updated_by: {
    type: String,
    default: null,
  },
  data_source: {
    type: String,
    default: "Nou-App",
  },
  device_id: {
    type: String,
  },
  approval_status: {
    type: String,
    default: "Approved",
  },
  app_version: {
    type: String,
    default: "1.0.0",
  },
  service_version: {
    type: String,
    default: version,
  },
});

//create user model
const User = mongoose.model("User", userSchema);
module.exports = User;
