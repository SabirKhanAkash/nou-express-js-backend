const mongoose = require("mongoose");
const package = require("../../../../package.json");
const version = package.version;

// create ticket schema
const ticketSchema = new mongoose.Schema({
  seat_category: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  source: {
    type: String,
    default: null,
  },
  destination: {
    type: String,
    default: null,
  },
  journeyDateTime: {
    type: String,
    default: null,
  },
  sold: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_date: {
    type: String,
    default: new Date(),
  },
  created_by: {
    type: String,
    default: "System",
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
    default: "System",
  },
  service_version: {
    type: String,
    default: version,
  },
});

//create ticket model
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
