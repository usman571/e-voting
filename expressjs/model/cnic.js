const mongoose = require("mongoose");

const cnicSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const CNIC = mongoose.model("CNIC", cnicSchema);

module.exports = CNIC;
