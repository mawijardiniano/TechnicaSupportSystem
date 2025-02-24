
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
      status: "Pending"
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
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params; // ✅ Extract ID from URL
    const { status } = req.body; // ✅ Extract status from body

    if (!id || !status) {
      return res.status(400).json({ message: "Report ID and status are required" });
    }

    const updatedReport = await Problem.findByIdAndUpdate(
      id, // ✅ Use `id` from URL
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Status updated successfully", updatedReport });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



module.exports = { reportProblem,getReports, updateStatus };
