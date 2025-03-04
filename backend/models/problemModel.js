const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Authentication",
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  severityLevel: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    required: true,
  },
  affected: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
  attachments: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "On Hold", "Resolved", "Closed"],
    required: false,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);