const mongoose = require("mongoose");
const package = require("../../../../package.json");
const version = package.version;

// create vendor schema
const vendorSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
});

// create allLookUp schema
const allLookUpSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  title_bn: {
    type: String,
  },
  order_value: {
    type: Number,
  },
  vendors: [vendorSchema],
  is_active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Number,
    default: new Date(),
  },
  created_date: {
    type: String,
    default: new Date(),
  },
  created_by: {
    type: String,
    default: "System",
  },
  updated_at: {
    type: Number,
    default: null,
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

//create allLookUp model
const AllLookUp = mongoose.model("AllLookUp", allLookUpSchema);
module.exports = AllLookUp;
