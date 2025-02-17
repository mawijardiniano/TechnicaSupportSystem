const mongoose = require("mongoose");


const ProblemSchema = new mongoose.Schema({
  problem: {
    type: String,
    enum: ["software issue", "hardware malfunction" , "network connectivity"],
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  severityLevel : {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    require: true,
  },
  affected: {
    type: String,
    required: true,
  },
  location : {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
  attachments : {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);
