const mongoose = require("mongoose");

// create schema
const appLogSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
  },
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  filepath: {
    type: String,
  },
});

//create AppLog model
const AppLog = mongoose.model("applog", appLogSchema);
module.exports = AppLog;
