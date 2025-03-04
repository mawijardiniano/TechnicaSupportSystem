const mongoose = require("mongoose");

const ProblemListSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("ProblemList", ProblemListSchema);