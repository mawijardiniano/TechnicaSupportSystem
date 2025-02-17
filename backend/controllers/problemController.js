
const Problem = require("../models/problemModel");

const reportProblem = async (req, res) => {
  try {
    const {
      problem,
      problemDescription,
      severityLevel,
      affected,
      location,
      contactInformation,
      attachments,
    } = req.body;

    if (
      !problem ||
      !problemDescription ||
      !severityLevel ||
      !affected ||
      !location ||
      !contactInformation
    ) {
      return res.status(400).json({ message: "Fill up" });
    }

    const problemReport  = new Problem({
        problem,
      problemDescription,
      severityLevel,
      affected,
      location,
      contactInformation,
      attachments,
    });

    await problemReport .save();
    res
      .status(201)
      .json({ message: "User created successfully"});
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getReports = async (req,res) => {
    try {
        const reports = await Problem.find();
        res.json(reports)
    } catch (error) {
        
    }
}

module.exports = { reportProblem,getReports };
